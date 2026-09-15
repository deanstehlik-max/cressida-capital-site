import type { LoanRequestNotification } from './types';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const PIPELINE_ID = 'NQo4sCCwKDAZECy7Kunn';
const PIPELINE_STAGE_ID = '4c1b5924-2b5e-4f4b-baf4-78a8d5ee97e7';
const DEFAULT_SOURCE = 'cressidacapital.com website';

// HighLevel location custom-field ids. These fields must already exist in the
// location; the v2 /contacts/upsert body keys them by field id.
const CUSTOM_FIELD_LOAN_AMOUNT_ID = 'jVwwaLdqvjvDM8OOoClc';
const CUSTOM_FIELD_PROPERTY_TYPE_ID = 'dRHzwzTt0urRF00X3Hvd';

// Path of the dedicated "Start a Loan Request" page/flow. Submissions tagged
// with this source page get their own GHL source label and (optionally) a
// distinct pipeline/stage so the leads can be attributed separately.
export const START_A_LOAN_REQUEST_PATH = '/start-a-loan-request';

// Optional per-flow overrides for the GHL contact source and the opportunity
// pipeline/stage. Anything left undefined falls back to the defaults above,
// preserving today's behavior.
export type GhlPushOverrides = {
  source?: string;
  pipelineId?: string;
  pipelineStageId?: string;
};

// Maps a submission's sourcePage to the GHL overrides it should use. Unknown
// pages return no overrides, so pushToGhl keeps its default behavior.
export function ghlOverridesForSourcePage(
  sourcePage?: string | null
): GhlPushOverrides {
  if (sourcePage === START_A_LOAN_REQUEST_PATH) {
    return {
      source: 'Website - Start A Loan Request',
      // Land these in the "Initial Inquiry" stage when configured. When the
      // env vars are unset we fall back to today's default pipeline/stage.
      pipelineId: process.env.GHL_PIPELINE_ID || undefined,
      pipelineStageId: process.env.GHL_STAGE_INITIAL_INQUIRY || undefined,
    };
  }
  return {};
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function parseMonetaryValue(loanAmount: LoanRequestNotification['loanAmount']): number | undefined {
  if (loanAmount == null || loanAmount === '') return undefined;
  const n = Number(String(loanAmount).replace(/[$,]/g, '').trim());
  return Number.isFinite(n) ? n : undefined;
}

function ghlHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function ghlFetch<T>(path: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(`${GHL_BASE_URL}${path}`, {
    method: 'POST',
    headers: ghlHeaders(token),
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Keep the raw body for logging when GHL returns non-JSON.
  }

  if (!response.ok) {
    throw new Error(
      `GHL ${path} failed (${response.status}): ${typeof parsed === 'string' ? parsed : JSON.stringify(parsed)}`
    );
  }

  return parsed as T;
}

type GhlContactUpsertResponse = {
  contact?: { id?: string };
};

type GhlOpportunityUpsertResponse = {
  opportunity?: { id?: string };
};

export async function pushToGhl(
  data: LoanRequestNotification,
  overrides: GhlPushOverrides = {}
) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  const source = overrides.source || DEFAULT_SOURCE;
  const pipelineId = overrides.pipelineId || PIPELINE_ID;
  const pipelineStageId = overrides.pipelineStageId || PIPELINE_STAGE_ID;

  if (!token) {
    throw new Error('Missing GHL_PRIVATE_TOKEN environment variable.');
  }
  // Official HighLevel v2 docs mark locationId as required on both
  // POST /contacts/upsert and POST /opportunities/upsert. Location-scoped
  // Private Integration tokens still require it in the request body.
  if (!locationId) {
    throw new Error('Missing GHL_LOCATION_ID environment variable.');
  }

  const { firstName, lastName } = splitName(data.fullName);
  const monetaryValue = parseMonetaryValue(data.loanAmount);

  // Populate the location's Loan Amount / Property Type custom fields when we
  // have values. Loan Amount uses the sanitized numeric value (falling back to
  // the raw input) so a numeric/monetary field type isn't rejected.
  const customFields: Array<{ id: string; field_value: string | number }> = [];
  if (monetaryValue !== undefined) {
    customFields.push({ id: CUSTOM_FIELD_LOAN_AMOUNT_ID, field_value: monetaryValue });
  } else if (data.loanAmount != null && data.loanAmount !== '') {
    customFields.push({ id: CUSTOM_FIELD_LOAN_AMOUNT_ID, field_value: String(data.loanAmount) });
  }
  if (data.propertyType) {
    customFields.push({ id: CUSTOM_FIELD_PROPERTY_TYPE_ID, field_value: data.propertyType });
  }

  const contactResult = await ghlFetch<GhlContactUpsertResponse>('/contacts/upsert', token, {
    firstName,
    lastName,
    email: data.email,
    ...(data.phone ? { phone: data.phone } : {}),
    ...(data.company ? { companyName: data.company } : {}),
    source,
    locationId,
    ...(customFields.length ? { customFields } : {}),
  });

  const contactId = contactResult.contact?.id;
  if (!contactId) {
    throw new Error(
      `GHL /contacts/upsert did not return a contactId: ${JSON.stringify(contactResult)}`
    );
  }

  const opportunityName = `${data.fullName} \u2014 ${data.loanProgram || 'General Inquiry'}`;

  const opportunityResult = await ghlFetch<GhlOpportunityUpsertResponse>(
    '/opportunities/upsert',
    token,
    {
      pipelineId,
      pipelineStageId,
      contactId,
      locationId,
      name: opportunityName,
      status: 'open',
      ...(monetaryValue !== undefined ? { monetaryValue } : {}),
    }
  );

  return {
    contactId,
    opportunityId: opportunityResult.opportunity?.id,
  };
}

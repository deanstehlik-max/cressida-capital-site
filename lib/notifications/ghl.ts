import type { LoanRequestNotification } from './types';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const PIPELINE_ID = 'NQo4sCCwKDAZECy7Kunn';
const PIPELINE_STAGE_ID = '4c1b5924-2b5e-4f4b-baf4-78a8d5ee97e7';

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

export async function pushToGhl(data: LoanRequestNotification) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

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

  const contactResult = await ghlFetch<GhlContactUpsertResponse>('/contacts/upsert', token, {
    firstName,
    lastName,
    email: data.email,
    ...(data.phone ? { phone: data.phone } : {}),
    ...(data.company ? { companyName: data.company } : {}),
    source: 'cressidacapital.com website',
    locationId,
  });

  const contactId = contactResult.contact?.id;
  if (!contactId) {
    throw new Error(
      `GHL /contacts/upsert did not return a contactId: ${JSON.stringify(contactResult)}`
    );
  }

  const monetaryValue = parseMonetaryValue(data.loanAmount);
  const opportunityName = `${data.fullName} \u2014 ${data.loanProgram || 'General Inquiry'}`;

  const opportunityResult = await ghlFetch<GhlOpportunityUpsertResponse>(
    '/opportunities/upsert',
    token,
    {
      pipelineId: PIPELINE_ID,
      pipelineStageId: PIPELINE_STAGE_ID,
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

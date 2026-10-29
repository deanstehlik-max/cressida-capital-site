/**
 * Daily benchmark rates for the homepage hero.
 * Keyless public sources, each cached for six hours. A series that fails
 * falls back to the print that used to be hardcoded so the page still renders.
 */

export type BenchmarkRate = {
  label: string;
  value: string;
  up?: boolean;
};

export type BenchmarkRates = {
  rates: BenchmarkRate[];
  asOf: string | null;
};

const REVALIDATE_SECONDS = 21600;
const FETCH_TIMEOUT_MS = 10_000;

/** Previous homepage constants. Used only when that series cannot be fetched. */
const FALLBACK_RATES: readonly BenchmarkRate[] = [
  { label: 'Prime Rate', value: '6.75%' },
  { label: 'SOFR (30-day avg)', value: '3.65%' },
  { label: '5-Year Treasury', value: '4.54%', up: true },
  { label: '10-Year Treasury', value: '4.78%' },
];

const FRED_DPRIME_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DPRIME';
const FRED_SOFR30_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=SOFR30DAYAVG';
const FRED_DGS5_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS5';
const FRED_DGS10_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10';
const NY_FED_LATEST_URL = 'https://markets.newyorkfed.org/api/rates/all/latest.json';
// latest.json publishes one SOFRAI print. The prior observation used for the
// brass highlight comes from the same keyless SOFR Averages feed.
const NY_FED_SOFRAI_RECENT_URL =
  'https://markets.newyorkfed.org/api/rates/secured/sofrai/last/2.json';

type Observation = {
  date: string;
  value: number;
};

type LoadedRate = {
  rate: BenchmarkRate;
  asOf: string | null;
};

function treasuryCsvUrl(year: number): string {
  return `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/${year}/all?type=daily_treasury_yield_curve&field_tdr_date_value=${year}&page&_format=csv`;
}

function yearInNewYork(now = new Date()): number {
  const year = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  }).format(now);
  return Number(year);
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/csv, application/json, text/plain, */*',
      'User-Agent': 'CressidaCapitalSite/1.0',
    },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  const text = await response.text();
  if (!text.trim()) {
    throw new Error(`Empty response for ${url}`);
  }
  return text;
}

function parseCsv(text: string): string[][] {
  const source = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (inQuotes) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && source[i + 1] === '\n') i += 1;
      row.push(cell);
      cell = '';
      if (row.some((value) => value.trim() !== '')) rows.push(row);
      row = [];
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((value) => value.trim() !== '')) rows.push(row);
  }

  return rows;
}

function normalizeDate(raw: string): string | null {
  const text = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
  if (!us) return null;
  return `${us[3]}-${us[1].padStart(2, '0')}-${us[2].padStart(2, '0')}`;
}

function parseRate(raw: string | undefined): number | null {
  if (!raw) return null;
  const text = raw.trim();
  if (!text || text === '.' || text.toUpperCase() === 'N/A' || text === 'NA') return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

function latestPair(points: Observation[]): { latest: Observation; prior: Observation | null } | null {
  const byDate = new Map<string, number>();
  for (const point of points) byDate.set(point.date, point.value);
  const dates = [...byDate.keys()].sort();
  const latestDate = dates[dates.length - 1];
  if (!latestDate) return null;
  const priorDate = dates.length > 1 ? dates[dates.length - 2] : null;
  return {
    latest: { date: latestDate, value: byDate.get(latestDate)! },
    prior: priorDate ? { date: priorDate, value: byDate.get(priorDate)! } : null,
  };
}

function formatRate(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatAsOf(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function toLoaded(label: string, points: Observation[]): LoadedRate {
  const pair = latestPair(points);
  if (!pair) throw new Error(`No observations for ${label}`);
  // Brass marks a higher print than the prior observation, even when both
  // still round to the same two decimals.
  const rose = pair.prior !== null && pair.latest.value > pair.prior.value;
  return {
    rate: {
      label,
      value: formatRate(pair.latest.value),
      ...(rose ? { up: true } : {}),
    },
    asOf: pair.latest.date,
  };
}

function fallback(rate: BenchmarkRate): LoadedRate {
  return { rate: { ...rate }, asOf: null };
}

function observationsFromFred(csv: string): Observation[] {
  const rows = parseCsv(csv);
  const points: Observation[] = [];
  for (const row of rows.slice(1)) {
    const date = normalizeDate(row[0] ?? '');
    const value = parseRate(row[1]);
    if (date && value !== null) points.push({ date, value });
  }
  if (points.length === 0) throw new Error('FRED CSV had no observations');
  return points;
}

async function loadFred(url: string, label: string, fallbackRate: BenchmarkRate): Promise<LoadedRate> {
  try {
    const csv = await fetchText(url);
    return toLoaded(label, observationsFromFred(csv));
  } catch (err) {
    console.error(`${label} fetch failed:`, err);
    return fallback(fallbackRate);
  }
}

type SofraiPoint = Observation;

function sofraiPoints(payload: unknown): SofraiPoint[] {
  if (!payload || typeof payload !== 'object') return [];
  const refRates = (payload as { refRates?: unknown }).refRates;
  if (!Array.isArray(refRates)) return [];

  const points: SofraiPoint[] = [];
  for (const row of refRates) {
    if (!row || typeof row !== 'object') continue;
    const record = row as Record<string, unknown>;
    if (record.type !== 'SOFRAI') continue;
    const date = typeof record.effectiveDate === 'string' ? normalizeDate(record.effectiveDate) : null;
    const raw = record.average30day;
    const value = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : Number.NaN;
    if (date && Number.isFinite(value)) points.push({ date, value });
  }
  return points;
}

async function loadSofrFromNyFed(): Promise<LoadedRate> {
  const [latestText, historyText] = await Promise.all([
    fetchText(NY_FED_LATEST_URL),
    fetchText(NY_FED_SOFRAI_RECENT_URL).catch((err) => {
      console.error('NY Fed SOFRAI history failed:', err);
      return null;
    }),
  ]);

  const latestPoints = sofraiPoints(JSON.parse(latestText));
  const latest = latestPair(latestPoints);
  if (!latest) throw new Error('NY Fed latest.json did not include SOFRAI average30day');

  const points = [latest.latest];
  if (historyText) {
    try {
      const history = sofraiPoints(JSON.parse(historyText)).filter((point) => point.date < latest.latest.date);
      const prior = latestPair(history);
      if (prior) points.push(prior.latest);
    } catch (err) {
      console.error('NY Fed SOFRAI history parse failed:', err);
    }
  } else if (latest.prior) {
    points.push(latest.prior);
  }

  return toLoaded('SOFR (30-day avg)', points);
}

async function loadSofr(): Promise<LoadedRate> {
  try {
    return await loadSofrFromNyFed();
  } catch (err) {
    console.error('SOFR NY Fed failed, trying FRED:', err);
  }
  return loadFred(FRED_SOFR30_URL, 'SOFR (30-day avg)', FALLBACK_RATES[1]);
}

function treasuryColumn(csv: string, header: string): Observation[] {
  const rows = parseCsv(csv);
  if (rows.length === 0) return [];
  const headers = rows[0].map((cell) => cell.trim());
  const dateIndex = headers.findIndex((cell) => cell.toLowerCase() === 'date');
  const valueIndex = headers.findIndex((cell) => cell === header);
  if (dateIndex < 0 || valueIndex < 0) return [];

  const points: Observation[] = [];
  for (const row of rows.slice(1)) {
    const date = normalizeDate(row[dateIndex] ?? '');
    const value = parseRate(row[valueIndex]);
    if (date && value !== null) points.push({ date, value });
  }
  return points;
}

async function loadTreasuries(): Promise<{ five: LoadedRate; ten: LoadedRate }> {
  try {
    const csv = await fetchText(treasuryCsvUrl(yearInNewYork()));
    const fivePoints = treasuryColumn(csv, '5 Yr');
    const tenPoints = treasuryColumn(csv, '10 Yr');
    const [five, ten] = await Promise.all([
      fivePoints.length > 0
        ? Promise.resolve(toLoaded('5-Year Treasury', fivePoints))
        : loadFred(FRED_DGS5_URL, '5-Year Treasury', FALLBACK_RATES[2]),
      tenPoints.length > 0
        ? Promise.resolve(toLoaded('10-Year Treasury', tenPoints))
        : loadFred(FRED_DGS10_URL, '10-Year Treasury', FALLBACK_RATES[3]),
    ]);
    return { five, ten };
  } catch (err) {
    console.error('Treasury yield curve failed, trying FRED:', err);
    const [five, ten] = await Promise.all([
      loadFred(FRED_DGS5_URL, '5-Year Treasury', FALLBACK_RATES[2]),
      loadFred(FRED_DGS10_URL, '10-Year Treasury', FALLBACK_RATES[3]),
    ]);
    return { five, ten };
  }
}

function formatLatestAsOf(dates: Array<string | null>): string | null {
  const latest = dates.filter((date): date is string => Boolean(date)).sort().at(-1);
  return latest ? formatAsOf(latest) : null;
}

export async function getBenchmarkRates(): Promise<BenchmarkRates> {
  try {
    const [prime, sofr, treasuries] = await Promise.all([
      loadFred(FRED_DPRIME_URL, 'Prime Rate', FALLBACK_RATES[0]),
      loadSofr(),
      loadTreasuries(),
    ]);
    const loaded = [prime, sofr, treasuries.five, treasuries.ten];
    return {
      rates: loaded.map((item) => item.rate),
      asOf: formatLatestAsOf(loaded.map((item) => item.asOf)),
    };
  } catch (err) {
    console.error('getBenchmarkRates failed:', err);
    return {
      rates: FALLBACK_RATES.map((rate) => ({ ...rate })),
      asOf: null,
    };
  }
}

# Cressida Capital — Website

Next.js 15 (App Router) + Tailwind. Built for the redesign, with SEO/AEO
structure baked in from the start.

## What's included

- **App Router**, server-rendered by default (required — AI crawlers
  generally can't execute client-side JS, so content must be in the
  initial HTML response).
- **JSON-LD structured data**: `Organization`/`FinancialService` sitewide
  (`components/OrganizationJsonLd.tsx`), `FAQPage` on loan program pages
  (`components/FaqJsonLd.tsx`), `BreadcrumbList` on interior pages.
- **`app/robots.ts`** — explicitly allows GPTBot, ClaudeBot, Google-Extended,
  PerplexityBot, and other AI crawlers by name, not just a wildcard.
- **`app/sitemap.ts`** — auto-generated from the route list.
- **`public/llms.txt`** — machine-readable brand facts file.
- **`lib/brand.ts`** — single source of truth for firm facts (name, phone,
  stats). Update numbers here once; they propagate to every page, the
  JSON-LD, and should be kept in sync with `llms.txt` manually until that's
  also generated from this file.

## Getting started locally

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in server-side secrets.
Never commit `.env.local`. Add the same keys in Railway's Variables tab for
production.

| Variable | Where it is used |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (client + server). Already filled in the example. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/publishable key (insert-only via RLS). Already filled in the example. |
| `RESEND_API_KEY` | Server-only. Sends a notification email to `deans@cressidacapital.com` after a successful loan-request insert. |
| `GHL_PRIVATE_TOKEN` | Server-only GoHighLevel Private Integration token. Used to upsert a contact and Loan Pipeline opportunity. |
| `GHL_LOCATION_ID` | Server-only. HighLevel API v2 requires `locationId` on `/contacts/upsert` and `/opportunities/upsert` even when the token is location-scoped. |

`RESEND_API_KEY` and `GHL_PRIVATE_TOKEN` must not use a `NEXT_PUBLIC_` prefix.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial scaffold"
git branch -M main
git remote add origin <your-new-repo-url>
git push -u origin main
```

## Deploying on Railway

1. In Railway, create a new project from your GitHub repo.
2. Railway auto-detects Next.js — no custom build command needed
   (`next build` / `next start`).
3. Add environment variables (see below) in the Railway project's Variables tab.
4. Once deployed, point your domain (cressidacapital.com) at the Railway
   service and update `NEXT_PUBLIC_SITE_URL` / `lib/brand.ts` `url` field if
   it differs from production.

## Connecting Supabase

**Live and wired up.** A new Supabase project, `cressida-capital`
(project ref `mrlveplsirwppjiisexw`, $10/mo), was created specifically for
this site — separate from the existing `cressida-direct` and `Loan Ready`
projects in your account.

The `loan_requests` table is created and secured with row-level security:
the anon key can only INSERT (never read, update, or delete other
submissions). Staff should review submissions via the Supabase dashboard's
table editor, not through the public site.

To run locally:
1. Copy `.env.local.example` to `.env.local` (already has the correct
   project URL and anon key filled in). Fill in `RESEND_API_KEY`,
   `GHL_PRIVATE_TOKEN`, and `GHL_LOCATION_ID`.
2. `npm install` (now includes `@supabase/supabase-js` and `resend`).
3. `npm run dev` — the Contact page form at `/contact` will insert into
   `loan_requests` on submit, email `deans@cressidacapital.com`, and
   create a GoHighLevel contact + Loan Pipeline opportunity.

Add the same environment variables in Railway's Variables tab for
production. The visitor still sees a success response if email or GHL
fails; the Supabase row is the source of truth.

Tables still to add for the rest of the site:
- `closings` — replaces the hardcoded array in
  `components/ClosingsTable.tsx` so recent transactions update without a
  code deploy.
- `insights_posts` — for the Insights/market-commentary section.

## Still to build out

- A live rate-fetching mechanism for the hero rate panel (currently
  hardcoded — see comment in `components/Hero.tsx`).
- Consider a dedicated `broker_referrals` table if broker submissions need
  to be tracked separately from borrower loan requests — currently both
  post to `loan_requests`, distinguished only by `source_page`.
- A staff-facing way to add closings and insights posts (currently via
  Supabase dashboard's table editor directly, or a future admin form).
- **Real Insights content.** See note below — nothing is published yet.

Done:
- All 7 loan program pages (`app/loan-solutions/*`) plus the Loan
  Solutions landing page, each with FAQPage + BreadcrumbList JSON-LD and
  answer-first content.
- Contact page (`app/contact/page.tsx`) with a working loan request form,
  posting to `app/api/loan-requests/route.ts`, which writes to the
  `loan_requests` table in Supabase.
- Property Types landing page (`app/property-types/page.tsx`) plus a
  dynamic per-type page (`app/property-types/[slug]/page.tsx`, statically
  generated for all 7 types via `generateStaticParams` — fully crawlable,
  same as a static page) with FAQPage schema and cross-links to relevant
  loan programs. Data lives in `lib/propertyTypes.ts`.
- For Brokers page (`app/for-brokers/page.tsx`) with referral program FAQ
  and a submission form (reuses `LoanRequestForm`, tagged
  `source_page: '/for-brokers'`).
- About page (`app/about/page.tsx`) and Team page (`app/about/team/page.tsx`)
  — team is described by role, not named individuals.
- Transactions page (`app/transactions/page.tsx`) and the homepage's
  Recent Closings section both now read from a live `closings` table in
  Supabase (`lib/closings.ts`) instead of a hardcoded array. Seeded with
  the 4 real closings from the original site. Add new deals via the
  Supabase dashboard's table editor — no code deploy required.
- Insights listing (`app/insights/page.tsx`) and post pages
  (`app/insights/[slug]/page.tsx`, revalidated hourly since posts live in
  Supabase, not the codebase) with Article JSON-LD, reading from a new
  `insights_posts` table (`lib/insights.ts`). Markdown body rendered via
  `react-markdown`.

  **Important — nothing is published yet.** One sample post was seeded
  with `is_published = false` purely to prove the template renders
  correctly. I did not write real market/rate commentary and publish it
  live: rate and market claims from a licensed finance company are a
  compliance surface, and that content should come from someone at
  Cressida with actual current market knowledge, reviewed before it goes
  out under the firm's name. To publish: write real posts (or edit the
  draft) in the Supabase table editor, then set `is_published = true`.
- Favicon (`app/icon.tsx`, `app/apple-icon.tsx`) and Open Graph image
  (`app/opengraph-image.tsx`), generated procedurally via Next.js's
  built-in `ImageResponse` from the same brand tokens as the rest of the
  site (`lib/brand.ts`) rather than static exported files — these are
  placeholder wordmark treatments (a stylized "C" on forest green), not a
  real logo. Swap in the actual logo/mark whenever one exists.

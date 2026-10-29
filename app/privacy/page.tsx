import type { Metadata } from 'next';
import Link from 'next/link';
import LegalDocument, { LegalSection } from '@/components/LegalDocument';
import { brand } from '@/lib/brand';

// TEMPLATE — for Dean's compliance review.
// Standard wording for a California commercial loan broker site.
// Do not treat this copy as counsel-approved until that review is done.

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Cressida Capital collects, uses, and shares personal information from the loan request form, including California CCPA/CPRA privacy rights.',
  alternates: { canonical: '/privacy' },
};

const phoneHref = `tel:${brand.phone.replace(/[^\d]/g, '')}`;

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" path="/privacy" updated="October 29, 2026">
      <LegalSection heading="Who this policy covers">
        <p>
          {brand.legalName} (&ldquo;{brand.displayName},&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) is a California commercial real estate and SBA loan
          broker based in {brand.city}, {brand.region}. This policy describes
          how we collect, use, and share personal information when you visit{' '}
          {brand.url.replace('https://', '')} or submit a loan request. It is
          written for a commercial financing website and should be read with
          our <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>When you submit the loan request form, we collect:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name, if you provide it</li>
          <li>
            Loan details: the loan program, property type, loan amount
            requested, property city and state, and the message you write
            about the deal
          </li>
          <li>The page the form was submitted from</li>
          <li>IP address</li>
        </ul>
        <p>
          We also collect technical information your browser sends when you
          visit the site, such as pages viewed, referring URL, and browser or
          device type. The public form does not ask for a Social Security
          number, bank account number, or government identification.
        </p>
      </LegalSection>

      <LegalSection heading="How we use information">
        <p>We use this information to:</p>
        <ul>
          <li>
            Respond to your request and contact you by phone, email, and text
            about that request
          </li>
          <li>
            Review the financing you described and consider which loan programs
            may fit
          </li>
          <li>
            Share the request with lenders and other funding sources we work
            with
          </li>
          <li>
            Record and follow up on the inquiry in our customer relationship
            management system (our CRM)
          </li>
          <li>Operate, secure, and improve the website</li>
          <li>Understand site traffic through analytics</li>
          <li>
            Meet legal, regulatory, and recordkeeping duties that apply to a
            California real estate broker
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Who we share information with">
        <p>We share personal information with:</p>
        <ul>
          <li>
            Lenders, capital sources, and other financing parties when we
            present or discuss your request
          </li>
          <li>
            Our CRM, so a loan officer can track the inquiry and follow up
          </li>
          <li>
            Service providers that host the site, deliver email, and provide
            analytics, including Google Analytics
          </li>
          <li>
            Advisors, regulators, or other parties when the law, a license
            requirement, or legal process requires it
          </li>
        </ul>
        <p>
          We do not sell personal information for money. We do not share
          personal information for cross-context behavioral advertising.
          Sending a loan request to a lender so the lender can consider
          financing is a business disclosure, not a &ldquo;sale&rdquo; or
          &ldquo;share&rdquo; under the California Consumer Privacy Act, as
          amended by the California Privacy Rights Act (CCPA/CPRA).
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          We use Google Analytics to understand how visitors use the site,
          including which pages are viewed and how visitors arrive. Google
          Analytics uses cookies (such as <span className="font-medium text-ink">_ga</span>)
          and may collect an online identifier, pages visited, and an
          approximate location derived from the IP address. Google&rsquo;s own
          policies describe how it handles that data.
        </p>
        <p>
          You can control or delete cookies in your browser, and you can use
          the analytics opt-out tools Google offers. Blocking cookies does not
          stop you from submitting a loan request.
        </p>
      </LegalSection>

      <LegalSection heading="California privacy rights">
        <p>
          If you are a California resident, the CCPA/CPRA gives you the
          following rights, subject to the exceptions in the statute:
        </p>
        <ul>
          <li>
            Know the categories and specific pieces of personal information we
            collected about you, the sources, the business purposes, and the
            categories of third parties we disclosed it to
          </li>
          <li>
            Request deletion of personal information. We may retain
            information we need to complete a request you asked us to handle,
            or to meet a legal or broker recordkeeping duty
          </li>
          <li>Request correction of inaccurate personal information</li>
          <li>
            Opt out of the sale or sharing of personal information. As
            described above, we do not sell or share personal information as
            those terms are defined
          </li>
          <li>
            Limit the use and disclosure of sensitive personal information to
            what is necessary to respond to your request and provide the
            services you asked for
          </li>
          <li>
            Not receive discriminatory treatment for exercising these rights
          </li>
        </ul>
        <p>
          To make a request, email{' '}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> with the subject
          line &ldquo;California privacy request.&rdquo; Include your name and
          the email address or phone number you used on the form so we can
          verify the request. An authorized agent may submit a request for you
          if you give the agent written permission and we can verify your
          identity. We will respond within 45 days, and we will tell you if we
          need up to 45 additional days. If we decline a request, you may
          reply to that email to appeal.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep information">
        <p>
          We keep loan-request information for as long as we need it to
          evaluate and work the request, stay in touch with you about it, and
          meet legal, regulatory, and recordkeeping duties. Analytics data is
          retained according to our Google Analytics settings.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site is for commercial and SBA financing. We do not knowingly
          collect personal information from children under 16.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update this policy by posting a new version on this page and
          changing the date above. The new version applies from the date it is
          posted.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          {brand.legalName}
          <br />
          {brand.city}, {brand.region}
          <br />
          {brand.license}
          <br />
          Email: <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <br />
          Phone: <a href={phoneHref}>{brand.phone}</a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

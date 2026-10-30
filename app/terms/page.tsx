import type { Metadata } from 'next';
import Link from 'next/link';
import LegalDocument, { LegalSection } from '@/components/LegalDocument';
import { brand } from '@/lib/brand';

// TEMPLATE — for Dean's compliance review.
// Standard wording for a California commercial loan broker site.
// Do not treat this copy as counsel-approved until that review is done.

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for the Cressida Capital website. Site information is for reference only and is not a commitment to lend.',
  alternates: { canonical: '/terms' },
};

const phoneHref = `tel:${brand.phone.replace(/[^\d]/g, '')}`;

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Use" path="/terms" updated="October 29, 2026">
      <LegalSection heading="Agreement">
        <p>
          These terms govern your use of the {brand.displayName} website and
          any loan request you submit through it. By using the site or
          submitting the form, you agree to these terms and to our{' '}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree,
          do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="Who we are">
        <p>
          {brand.legalName} is a California-licensed real estate broker
          ({brand.license}) based in {brand.city}, {brand.region}. We arrange
          commercial real estate and SBA financing with banks, credit unions,
          and private capital sources. On some transactions, Cressida Direct
          may lend directly. Unless a separate written commitment says
          otherwise, a submission on this website is a request that we review
          and, where it fits, present to lenders. It does not by itself create
          a lender-borrower relationship.
        </p>
      </LegalSection>

      <LegalSection heading="Information is not a commitment to lend">
        <p>
          Program descriptions, rate commentary, loan ranges, closings, and
          other content on this site are for reference only. They are not a
          commitment to lend, a pre-approval, a rate lock, or an offer of
          credit. Amounts, rates, fees, leverage, and other terms depend on
          the property, the borrower, and the lender, and they change.
        </p>
        <p>
          Loans are subject to lender approval, satisfactory underwriting and
          diligence, and applicable law. Nothing on this site is legal, tax,
          accounting, or investment advice.
        </p>
      </LegalSection>

      <LegalSection heading="Loan requests and consent to be contacted">
        <p>
          When you submit a loan request, you confirm that the information is
          accurate to the best of your knowledge. You agree that we may use it
          and share it with lenders and our CRM as described in the{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          You consent to be contacted by phone, email, and text about that
          request at the phone number and email address you provide. Message
          and data rates may apply. You may ask us to stop those messages by
          emailing <a href={`mailto:${brand.email}`}>{brand.email}</a>. We may
          still need to contact you about a request you have already submitted.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Do not submit information you know is false, interfere with the
          site, attempt to access non-public systems, or use the site for an
          unlawful purpose. We may refuse or discard a submission that looks
          incomplete, inaccurate, or abusive.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The site&rsquo;s text, design, name, and logo belong to{' '}
          {brand.legalName} or its licensors. You may not copy them for a
          commercial purpose without our written permission. You may share a
          link to a public page.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party sites">
        <p>
          Links to other sites, including the California Department of Real
          Estate license lookup and LinkedIn, are provided for convenience. We
          are not responsible for those sites or for their privacy practices.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer">
        <p>
          The site is provided as available. To the fullest extent the law
          allows, we disclaim warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the
          site will be uninterrupted or free of errors, or that any financing
          described on it will be available to you.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, {brand.legalName} and its
          officers, employees, and agents will not be liable for indirect,
          incidental, special, consequential, or punitive damages, or for lost
          profits, arising out of your use of the site or reliance on its
          content. Some jurisdictions do not allow certain limitations, so
          parts of this section may not apply to you.
        </p>
      </LegalSection>

      <LegalSection heading="California law">
        <p>
          California law governs these terms, without regard to conflict-of-law
          rules. The state and federal courts located in Los Angeles County,
          California, are the venue for disputes arising out of these terms or
          the site, except where the law requires a different forum.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms by posting a new version on this page and
          changing the date above. Using the site after an update means you
          accept the revised terms.
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

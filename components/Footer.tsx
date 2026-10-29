import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/lib/brand';

export default function Footer() {
  return (
    <footer className="border-t border-hair py-12 text-[13px] text-slate">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8">
          <div>
            <Image
              src="/cressida-logo.svg"
              alt="Cressida Capital"
              width={336}
              height={79}
              className="h-9 w-auto mb-2.5"
              style={{ width: 'auto', height: 36 }}
            />
            <p className="text-grey max-w-[32ch]">
              Full-service commercial real estate debt advisory. Nationwide
              financing, {brand.city} based.
            </p>
          </div>
          <FooterCol
            heading="Company"
            links={[
              { href: '/about', label: 'About' },
              { href: '/about/team', label: 'Team' },
              { href: '/transactions', label: 'Transactions' },
              { href: '/contact', label: 'Contact' },
            ]}
          />
          <FooterCol
            heading="Loan Solutions"
            links={[
              { href: '/loan-solutions/bridge-hard-money', label: 'Bridge & Hard Money' },
              { href: '/loan-solutions/sba', label: 'SBA' },
              { href: '/loan-solutions/construction', label: 'Construction' },
              { href: '/loan-solutions/multifamily-cmbs', label: 'Multifamily & CMBS' },
            ]}
          />
          <FooterCol
            heading="Connect"
            links={[
              { href: '/cressida-direct', label: 'Cressida Direct' },
              { href: '/insights', label: 'Insights' },
              { href: '/insights/dscr-loan-rates', label: 'DSCR Loan Rates' },
              { href: '/insights/cre-debt-maturity-wall', label: 'CRE Debt Maturity Wall' },
              { href: '/for-brokers', label: 'For Brokers' },
              { href: brand.social.linkedin, label: 'LinkedIn' },
            ]}
          />
        </div>
        <div className="mt-9 border-t border-hair pt-5 text-[11.5px] leading-relaxed text-grey">
          <div className="max-w-[76ch] space-y-1.5">
            <p>
              <a
                href={brand.dreLicenseLookupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-forest"
              >
                {brand.license}
              </a>
              {' '}({brand.legalName}). Confirm this license on the California
              Department of Real Estate public license lookup.
            </p>
            <p>
              Information on this website is for reference only and is not a
              commitment to lend. Loans are subject to lender approval.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              &copy; {new Date().getFullYear()} {brand.legalName}. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/privacy" className="hover:text-forest">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-forest">
                Terms of Use
              </Link>
              <span>
                {brand.city}, {brand.region}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11.5px] text-grey mb-3 font-medium">{heading}</h4>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="block mb-2 hover:text-forest">
          {link.label}
        </Link>
      ))}
    </div>
  );
}

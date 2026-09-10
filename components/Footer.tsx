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
              Full-service commercial real estate debt advisory and direct
              lending. Nationwide financing, {brand.city} based.
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
              { href: '/for-brokers', label: 'For Brokers' },
              { href: brand.social.linkedin, label: 'LinkedIn' },
            ]}
          />
        </div>
        <div className="mt-9 pt-5 border-t border-hair text-[11.5px] text-grey flex justify-between flex-wrap gap-2.5">
          <div>
            &copy; {new Date().getFullYear()} {brand.legalName}. All rights reserved. {brand.license}.
          </div>
          <div>{brand.city}, {brand.region}</div>
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

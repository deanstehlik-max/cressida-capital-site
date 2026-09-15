import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: '/about', label: 'About' },
  { href: '/loan-solutions', label: 'Loan Solutions' },
  { href: '/property-types', label: 'Property Types' },
  { href: '/cressida-direct', label: 'Cressida Direct' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/insights', label: 'Insights' },
  { href: '/for-brokers', label: 'For Brokers' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper">
      <nav className="max-w-[1180px] mx-auto px-8 h-[78px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/cressida-logo.svg"
            alt="Cressida Capital"
            width={336}
            height={79}
            className="h-9 w-auto"
            style={{ width: 'auto', height: 36 }}
            priority
          />
        </Link>
        <div className="hidden lg:flex gap-[22px] text-[13.5px] text-slate">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-forest">
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/start-a-loan-request"
          className="inline-block px-5 py-[11px] text-[13.5px] font-medium bg-brass border border-brass text-white hover:bg-transparent hover:text-brass transition-colors"
        >
          Start a Loan Request
        </Link>
      </nav>
    </header>
  );
}

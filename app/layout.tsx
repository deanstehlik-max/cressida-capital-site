import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import { brand } from '@/lib/brand';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.displayName} | Commercial Real Estate Financing`,
    template: `%s | ${brand.displayName}`,
  },
  description:
    'Cressida Capital arranges bridge, SBA, construction, multifamily, and CMBS financing for commercial real estate nationwide, plus direct lending from $200K to $3M through Cressida Direct.',
  keywords: [
    'commercial real estate financing',
    'CRE loans',
    'commercial mortgage broker',
    'bridge loans',
    'SBA 504 loan',
    'SBA 7(a) loan',
    'construction financing',
    'CMBS loans',
    'multifamily financing',
    'direct lender commercial real estate',
  ],
  openGraph: {
    type: 'website',
    siteName: brand.displayName,
    url: brand.url,
    title: `${brand.displayName} | Commercial Real Estate Financing`,
    description:
      'Debt solutions structured for what banks won\u2019t finance. Nationwide CRE financing and direct lending.',
    // No explicit `images` array — Next.js auto-detects app/opengraph-image.tsx
    // and injects it, so the OG image can never drift out of sync with the
    // site's actual brand tokens.
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plex.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T8DC84JGQC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-T8DC84JGQC');`,
          }}
        />
      </head>
      <body className="bg-paper text-ink font-sans antialiased">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}

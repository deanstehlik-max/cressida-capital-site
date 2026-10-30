import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export default function LegalDocument({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: title, path },
        ]}
      />
      <Nav />
      <article className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium mb-3">{title}</h1>
        <p className="text-[13px] text-grey mb-12">Last updated {updated}</p>
        <div className="max-w-[68ch] space-y-10 text-[15px] leading-relaxed text-slate">
          {children}
        </div>
      </article>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-medium text-ink mb-3">{heading}</h2>
      <div className="space-y-3 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-forest [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

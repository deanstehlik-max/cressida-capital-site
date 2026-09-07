import { brand } from '@/lib/brand';

type Props = {
  headline: string;
  description: string;
  datePublished: string | null;
  url: string;
  authorName?: string | null;
};

export default function ArticleJsonLd({ headline, description, datePublished, url, authorName }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished: datePublished ?? undefined,
    author: {
      '@type': authorName ? 'Person' : 'Organization',
      name: authorName ?? brand.legalName,
    },
    publisher: {
      '@type': 'Organization',
      name: brand.legalName,
      logo: { '@type': 'ImageObject', url: `${brand.url}/logo.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

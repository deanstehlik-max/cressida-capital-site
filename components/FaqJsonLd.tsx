type FaqItem = { question: string; answer: string };

/**
 * FAQPage structured data. Per current AEO guidance this is one of the
 * highest-leverage schema types — AI engines map question/answer pairs
 * almost directly onto user queries. Pass the same Q&A shown visibly on
 * the page; schema should describe real on-page content, not hidden text.
 */
export default function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';

/**
 * The single most common AEO failure is a robots.txt (often inherited from a
 * template or CDN default) that blocks AI crawlers outright. This config
 * explicitly allows the major answer-engine bots by name in addition to the
 * wildcard rule, so an update to any one bot's default behavior can't
 * silently cut Cressida out of AI answers.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot', // OpenAI / ChatGPT
    'ChatGPT-User',
    'ClaudeBot', // Anthropic / Claude
    'anthropic-ai',
    'Google-Extended', // Gemini training/grounding
    'PerplexityBot',
    'CCBot', // Common Crawl (feeds many LLMs)
    'Amazonbot',
    'Applebot-Extended',
    'GrokBot', // xAI / Grok
    'Bytespider',
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiBots.map((agent) => ({ userAgent: agent, allow: '/' })),
    ],
    sitemap: `${brand.url}/sitemap.xml`,
  };
}

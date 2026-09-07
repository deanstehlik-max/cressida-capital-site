import { ImageResponse } from 'next/og';
import { brand } from '@/lib/brand';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated procedurally from the same design tokens as the live site
// (lib/brand.ts, forest/brass palette) rather than a static exported PNG,
// so it can never drift out of sync with a rebrand.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A2C21',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 1,
            color: '#D9A94A',
            marginBottom: 28,
            fontFamily: 'Georgia, serif',
          }}
        >
          {brand.displayName.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 600,
            color: '#FAFAF9',
            maxWidth: 880,
            lineHeight: 1.15,
            fontFamily: 'Georgia, serif',
          }}
        >
          Debt solutions structured for what banks won&rsquo;t finance.
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#C9D3CC',
            marginTop: 36,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {brand.stats.financingArranged} arranged &middot;{' '}
          {brand.stats.lenderRelationships} lender relationships &middot;
          Founded {brand.founded}
        </div>
      </div>
    ),
    { ...size }
  );
}

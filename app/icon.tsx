import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Next.js auto-serves this at /icon and injects the correct <link> tags —
// no separate favicon.ico needed. Generated procedurally (not a real logo)
// since Cressida doesn't have a vector mark yet; swap for the real logo
// file whenever one exists.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F3D2E',
          color: '#D9A94A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from 'next/og'

export const alt = 'Christian Wallace, principal software engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07080c',
          color: '#f7f5f0',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              border: '2px solid rgba(212,175,55,0.5)',
              background: 'rgba(212,175,55,0.12)',
              color: '#d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            CW
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 42, fontWeight: 700 }}>Christian Wallace</div>
            <div style={{ marginTop: 6, fontSize: 20, letterSpacing: 3, color: '#b8b2a8' }}>
              PRINCIPAL SOFTWARE ENGINEER
            </div>
          </div>
        </div>
        <div style={{ fontSize: 46, lineHeight: 1.25, maxWidth: 980 }}>
          Christian Wallace makes complex products feel simple, and he builds the systems that keep
          them that way.
        </div>
      </div>
    ),
    { ...size },
  )
}

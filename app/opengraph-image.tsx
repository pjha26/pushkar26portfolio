import { ImageResponse } from 'next/og'

export const alt = 'Pushkar Raj — Thoughtful code. Useful things.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: '#f5f4ef',
        color: '#252b25',
        padding: '60px 75px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21 }}>
        <span>Pushkar Raj</span>
        <span style={{ color: '#48583d' }}>Software developer / Bengaluru</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 88,
          lineHeight: 1.12,
          letterSpacing: '-5px',
        }}
      >
        <span>Thoughtful code.</span>
        <span style={{ color: '#48583d', fontStyle: 'italic' }}>Useful things.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #dedfd5',
          paddingTop: 25,
          fontSize: 19,
          color: '#686d62',
        }}
      >
        <span>Full-stack development & applied AI</span>
        <span>pushkar26portfolio.vercel.app</span>
      </div>
    </div>,
    { ...size }
  )
}

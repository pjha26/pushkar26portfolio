import { ImageResponse } from 'next/og'

export const alt = 'Pushkar Raj — Full-stack developer & AI builder'
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
        background: '#0c0907',
        color: '#fff5eb',
        padding: '60px 75px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21 }}>
        <span>Pushkar Raj</span>
        <span style={{ color: '#ff934f' }}>Full-stack developer / Bengaluru</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 130,
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-7px',
        }}
      >
        <span>PUSHKAR</span>
        <span style={{ color: '#ff934f' }}>RAJ.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #3b2b20',
          paddingTop: 25,
          fontSize: 19,
          color: '#bdb0a3',
        }}
      >
        <span>Full-stack development & applied AI</span>
        <span>pushkar26portfolio.vercel.app</span>
      </div>
    </div>,
    { ...size }
  )
}

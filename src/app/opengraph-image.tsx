import { ImageResponse } from 'next/og'

export const alt = 'Noah Daën, développeur full stack'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#10382A',
          color: '#F1F5EE',
          padding: 80,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.04em',
        }}
      >
        <div>Noah Daën</div>
        <div style={{ color: '#F0FF7A' }}>Full stack, en production.</div>
        <div
          style={{
            display: 'flex',
            gap: 10,
            fontSize: 28,
            fontWeight: 400,
            color: '#A5C6B2',
            marginTop: 24,
          }}
        >
          <span>Symfony</span>
          <span>·</span>
          <span>React Native</span>
          <span>·</span>
          <span>TypeScript</span>
        </div>
      </div>
    ),
    size
  )
}

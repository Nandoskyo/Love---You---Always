import { useMemo } from 'react'
import { generateFloaters } from '../lib/utils'

/** SVG flower shape */
const FlowerSVG = ({ size, opacity }) => (
  <svg
    viewBox="0 0 44 44"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g transform="translate(22,22)">
      {/* Outer petals */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-9"
          rx="4.5"
          ry="10"
          fill={`rgba(232,127,160,${opacity})`}
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner petals */}
      {[30, 90, 150, 210, 270, 330].map((angle) => (
        <ellipse
          key={`i${angle}`}
          cx="0"
          cy="-6"
          rx="3"
          ry="7"
          fill={`rgba(244,168,192,${opacity * 0.7})`}
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Center */}
      <circle r="5" fill={`rgba(255,210,224,${opacity * 1.1})`} />
    </g>
  </svg>
)

export default function FloatingFlowers() {
  // Memoised so the random values don't re-generate on every render
  const floaters = useMemo(() => generateFloaters(28), [])

  return (
    <div className="floating-flowers" aria-hidden="true">
      {floaters.map((f) => (
        <div
          key={f.id}
          className="floating-element"
          style={{
            left: `${f.x}%`,
            '--duration': `${f.duration}s`,
            '--delay':    `${f.delay}s`,
            '--drift':    `${f.drift}px`,
            '--spin':     `${f.spin}deg`,
          }}
        >
          {f.type === 'flower' ? (
            <FlowerSVG size={f.size} opacity={f.opacity} />
          ) : (
            <div
              className="petal-dot"
              style={{
                width:   f.size * 0.38,
                height:  f.size * 0.38,
                opacity: f.opacity,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

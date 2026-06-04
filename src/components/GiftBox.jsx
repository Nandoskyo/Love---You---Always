import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

/* ─── Bow SVG ─────────────────────────────────────────────────────── */
const BowSVG = () => (
  <svg
    className="bow-svg"
    viewBox="0 0 120 78"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Left loop — outer */}
    <path
      d="M57 40 C50 22 28 8 10 20 C0 30 6 48 22 48 C40 50 56 40 57 40Z"
      fill="#e87fa0"
    />
    {/* Left loop — inner shadow */}
    <path
      d="M57 40 C52 26 34 15 18 25 C10 33 15 46 28 46 C43 48 56 40 57 40Z"
      fill="#c4516e"
      opacity="0.45"
    />
    {/* Right loop — outer */}
    <path
      d="M63 40 C70 22 92 8 110 20 C120 30 114 48 98 48 C80 50 64 40 63 40Z"
      fill="#e87fa0"
    />
    {/* Right loop — inner shadow */}
    <path
      d="M63 40 C68 26 86 15 102 25 C110 33 105 46 92 46 C77 48 64 40 63 40Z"
      fill="#c4516e"
      opacity="0.45"
    />
    {/* Tail left */}
    <path
      d="M54 45 Q46 60 38 72 Q43 76 48 72 Q57 60 62 45"
      fill="#e87fa0"
    />
    {/* Tail right */}
    <path
      d="M66 45 Q74 60 82 72 Q77 76 72 72 Q63 60 58 45"
      fill="#e87fa0"
    />
    {/* Knot */}
    <ellipse cx="60" cy="41" rx="10" ry="9"  fill="#f4b8ce" />
    <ellipse cx="60" cy="41" rx="5.5" ry="5" fill="#e87fa0" />
  </svg>
)

/* ─── Particle config ─────────────────────────────────────────────── */
const PARTICLES = [
  { char: '✿', color: '#f4a8c0' },
  { char: '❤', color: '#e87fa0' },
  { char: '✦', color: '#ffd6e0' },
  { char: '❋', color: '#c4516e' },
  { char: '✿', color: '#f4c0d0' },
  { char: '✦', color: '#e87fa0' },
  { char: '❀', color: '#ffc0d0' },
  { char: '❤', color: '#d97090' },
  { char: '✾', color: '#f4a8c0' },
  { char: '✦', color: '#e8a0b8' },
  { char: '❋', color: '#e87fa0' },
  { char: '✿', color: '#ffd6e0' },
]

/* ─── Component ───────────────────────────────────────────────────── */
export default function GiftBox({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const containerRef  = useRef(null)
  const lidRef        = useRef(null)
  const particlesRef  = useRef([])

  const handleClick = () => {
    if (isOpening) return
    setIsOpening(true)

    const tl = gsap.timeline({ onComplete: onOpen })

    // 1. Rapid shake
    tl.to(containerRef.current, {
      x: -6, duration: 0.055, ease: 'power1.inOut',
    })
    .to(containerRef.current, { x: 6, duration: 0.055, ease: 'power1.inOut', repeat: 4, yoyo: true })
    .to(containerRef.current, { x: 0, duration: 0.055 })

    // 2. Lid lifts open
    .to(lidRef.current, {
      rotateX: -125,
      y: -18,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.05')

    // 3. Particle burst
    .add(() => {
      particlesRef.current.forEach((el, i) => {
        if (!el) return
        const angle   = (i / PARTICLES.length) * Math.PI * 2
        const dist    = gsap.utils.random(70, 160)
        const tx      = Math.cos(angle) * dist
        const ty      = Math.sin(angle) * dist - 40
        gsap.fromTo(
          el,
          { opacity: 1, scale: 1, x: 0, y: 0 },
          {
            x: tx, y: ty,
            opacity: 0,
            scale: gsap.utils.random(0.3, 0.7),
            rotation: gsap.utils.random(-180, 180),
            duration: gsap.utils.random(0.7, 1.2),
            ease: 'power2.out',
          },
        )
      })
    }, '-=0.4')

    // 4. Brief pause before calling onOpen (handled by onComplete above)
    .add(() => {}, '+=0.55')
  }

  return (
    <div className="gift-container" onClick={handleClick} role="button" aria-label="Open your gift">
      {/* Pulse rings (ambient glow) */}
      {!isOpening && (
        <>
          <div className="gift-pulse-ring" />
          <div className="gift-pulse-ring" />
        </>
      )}

      {/* Burst particles */}
      <div className="particles-wrap" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="particle"
            style={{ color: p.color }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* 3D scene */}
      <div ref={containerRef} className="gift-scene">
        {/* Lid */}
        <div ref={lidRef} className="gift-lid">
          <div className="lid-ribbon-v" />
          <div className="lid-ribbon-h" />
          <BowSVG />
        </div>

        {/* Body */}
        <div className="gift-body">
          <div className="body-ribbon-v" />
          <div className="body-ribbon-h" />
          <div className="body-shine" />
        </div>
      </div>

      {/* Click hint */}
      {!isOpening && (
        <p className="gift-prompt">tap to open</p>
      )}
    </div>
  )
}

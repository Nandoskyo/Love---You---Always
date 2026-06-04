import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/** Inline SVG flower for the hero centre piece */
const HeroFlowerSVG = () => (
  <svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ width: '100%', height: '100%' }}
  >
    <g transform="translate(40,40)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse
          key={a}
          cx="0" cy="-14"
          rx="7" ry="15"
          fill="rgba(232,127,160,0.9)"
          transform={`rotate(${a})`}
        />
      ))}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => (
        <ellipse
          key={`i${a}`}
          cx="0" cy="-9"
          rx="4.5" ry="10"
          fill="rgba(244,168,192,0.65)"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="9" fill="rgba(255,218,232,1)" />
      <circle r="4" fill="rgba(232,127,160,0.8)" />
    </g>
  </svg>
)

export default function Hero() {
  const sectionRef  = useRef(null)
  const tagRef      = useRef(null)
  const title1Ref   = useRef(null)
  const title2Ref   = useRef(null)
  const subtitleRef = useRef(null)
  const flowerRef   = useRef(null)
  const scrollRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
      .to(title1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.55')
      .to(title2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.65')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .to(flowerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.45')
      .to(scrollRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.out',
      }, '-=0.2')
    }, sectionRef)

    // Set initial GSAP starting states
    gsap.set(
      [tagRef.current, title1Ref.current, title2Ref.current, subtitleRef.current],
      { y: 30 }
    )
    gsap.set(flowerRef.current, { scale: 0.7 })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-content">
        <span className="hero-tag" ref={tagRef}>
         
        </span>

        <h1>
          <span className="hero-title-1" ref={title1Ref}>For You,</span>
          <span className="hero-title-2" ref={title2Ref}>My Everything</span>
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Every petal holds a whisper of how much you mean to me
        </p>

        <div className="hero-flower" ref={flowerRef}>
          <HeroFlowerSVG />
        </div>

        <div className="hero-scroll" ref={scrollRef}>
          <span>scroll to discover</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  )
}

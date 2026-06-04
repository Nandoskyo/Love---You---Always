import { useState, useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

import FloatingFlowers from '../components/FloatingFlowers'
import GiftBox         from '../components/GiftBox'
import Hero            from '../components/Hero'
import MusicPlayer     from '../components/MusicPlayer'
import LoveLetter      from '../components/LoveLetter'
import Footer          from '../components/Footer'

/**
 * Home — controls the global reveal sequence:
 *
 *  Phase 0 (gift)   → full-screen gift splash, everything else hidden
 *  Phase 1 (reveal) → gift fades out, hero + letter + player animate in sequentially
 */
export default function Home() {
  const [phase, setPhase] = useState('gift')   // 'gift' | 'revealed'

  const giftSectionRef = useRef(null)
  const mainContentRef = useRef(null)

  // When the gift is opened → orchestrate the cross-fade reveal
  const handleGiftOpen = () => {
    const tl = gsap.timeline({
      onComplete: () => setPhase('revealed'),
    })

    // Fade the gift section out
    tl.to(giftSectionRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })

    // Reveal the main content container
    .set(mainContentRef.current, { display: 'block' })
    .fromTo(
      mainContentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.25'
    )
  }

  return (
    <>
      {/* ── Floating petals — always present ── */}
      <FloatingFlowers />

      {/* ── Phase 0: Gift splash ── */}
      {phase === 'gift' && (
        <div className="gift-section" ref={giftSectionRef}>
          <div className="gift-intro-text">
            <p>something special is waiting for you…</p>
          </div>
          <GiftBox onOpen={handleGiftOpen} />
        </div>
      )}

      {/* ── Phase 1: Main content (hidden until gift opened) ── */}
      <div
        ref={mainContentRef}
        style={{ display: phase === 'gift' ? 'none' : 'block' }}
      >
        <Hero />
        <LoveLetter />
        <Footer />
      </div>

      {/* ── Music player (fixed, slides in after gift) ── */}
      <MusicPlayer visible={phase === 'revealed'} />
    </>
  )
}

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/* ─── Content ──────────────────────────────────────────────────────── */
const LETTER_ITEMS = [
  {
    id: 'salutation',
    type: 'salutation',
    text: 'My Dearest,',
  },
  {
    id: 'p1',
    type: 'body',
    text: 'There are moments when words feel too small for everything I want to say — when the quiet between us carries more meaning than any sentence I could write. But I want to try, because you deserve to know.',
  },
  {
    id: 'divider1',
    type: 'divider',
  },
  {
    id: 'p2',
    type: 'body',
    text: 'Every morning I wake up grateful that the universe somehow bent itself into a shape where our paths could cross. You are the person I look for in every crowded room, and the voice I want to hear at the end of every long day.',
  },
  {
    id: 'photo',
    type: 'photo',
  },
  {
    id: 'quote1',
    type: 'quote',
    text: '"In you, I have found the love I was searching for — and the home I never knew I needed."',
  },
  {
    id: 'p3',
    type: 'body',
    text: 'You make ordinary moments feel like the ones I will remember forever. The way you laugh. The way your eyes soften when you talk about the things you love. All of it. I want to carry all of it with me.',
  },
  {
    id: 'divider2',
    type: 'divider',
  },
  {
    id: 'p4',
    type: 'body',
    text: 'So here is my promise, tucked inside every petal that has ever floated between us: I choose you — endlessly, softly, completely.',
  },
  {
    id: 'closing',
    type: 'closing',
    closing: 'Always and always,',
    signature: 'Yours ✿',
  },
]

/* ─── Divider element ──────────────────────────────────────────────── */
const FlowerDivider = () => (
  <div className="flower-divider">
    <div className="divider-line" />
    <span className="divider-flower">✿</span>
    <div className="divider-line" />
  </div>
)

/* ─── Component ────────────────────────────────────────────────────── */
export default function LoveLetter() {
  const sectionRef = useRef(null)
  const itemsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="love-letter-section" ref={sectionRef}>
      <div className="letter-container">
        {LETTER_ITEMS.map((item, i) => {
          const ref = (el) => (itemsRef.current[i] = el)

          if (item.type === 'salutation') {
            return (
              <div key={item.id} className="letter-item" ref={ref}>
                <p className="letter-salutation">{item.text}</p>
              </div>
            )
          }

          if (item.type === 'body') {
            return (
              <div key={item.id} className="letter-item" ref={ref}>
                <p className="letter-body">{item.text}</p>
              </div>
            )
          }

          if (item.type === 'quote') {
            return (
              <div key={item.id} className="letter-item" ref={ref}>
                <blockquote className="letter-quote">{item.text}</blockquote>
              </div>
            )
          }

          if (item.type === 'divider') {
            return (
              <div key={item.id} className="letter-item" ref={ref}>
                <FlowerDivider />
              </div>
            )
          }

          if (item.type === 'photo') {
            return (
              <div key={item.id} className="letter-item letter-photo-frame" ref={ref}>
                {/* Replace with <img src="/images/hero.jpg" alt="us" /> when you have the image */}
                <img src="/Photo/Dina.jpeg" alt="us" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <p className="photo-caption">a moment worth keeping</p>
              </div>
            )
          }

          if (item.type === 'closing') {
            return (
              <div key={item.id} className="letter-item" ref={ref}>
                <p className="letter-closing">{item.closing}</p>
                <p className="letter-signature">{item.signature}</p>
              </div>
            )
          }

          return null
        })}
      </div>
    </section>
  )
}

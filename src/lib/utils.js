/**
 * Random float between min and max (inclusive)
 */
export const random = (min, max) => Math.random() * (max - min) + min

/**
 * Random integer between min and max (inclusive)
 */
export const randomInt = (min, max) => Math.floor(random(min, max + 1))

/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/**
 * Format seconds to m:ss string
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Generate an array of floating flower/petal data
 */
export const generateFloaters = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x:        random(0, 100),          // % from left
    size:     random(7, 20),           // px
    duration: random(14, 28),          // animation seconds
    delay:    random(0, 18),           // start delay
    opacity:  random(0.12, 0.48),
    drift:    random(-50, 50),         // px horizontal drift
    spin:     random(150, 540),        // deg rotation
    type:     Math.random() > 0.6 ? 'flower' : 'dot',
  }))

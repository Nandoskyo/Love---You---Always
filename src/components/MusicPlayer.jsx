import { useRef, useEffect } from 'react'
import { useMusic } from '../hooks/useMusic'
import { gsap } from '../lib/gsap'
import { formatTime } from '../lib/utils'

/* ─── Icon SVGs ────────────────────────────────────────────────────── */
const IconPrev = () => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2h1.5v12H2zm2.5 6 8-5v10z" />
  </svg>
)

const IconNext = () => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2H14v12h-1.5zM11 8 3 3v10z" />
  </svg>
)

const IconPlay = () => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2.5v11l10-5.5z" />
  </svg>
)

const IconPause = () => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="4" height="12" rx="1" />
    <rect x="9" y="2" width="4" height="12" rx="1" />
  </svg>
)

/* ─── Component ────────────────────────────────────────────────────── */
export default function MusicPlayer({ visible }) {
  const { isPlaying, currentTime, duration, toggle, seek } = useMusic('/music/Bao.mp3')

  const playerRef = useRef(null)
  const hasAnimated = useRef(false)

  // Slide in once the gift is opened
  useEffect(() => {
    if (visible && !hasAnimated.current) {
      hasAnimated.current = true
      gsap.to(playerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.5,
      })
    }
  }, [visible])

  if (!visible) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    seek(ratio * duration)
  }

  return (
    <aside
      className="music-player"
      ref={playerRef}
      style={{ transform: 'translateY(20px)' }}
      aria-label="Music player"
    >
      {/* Album art */}
      <div className="player-art">
        <div className="player-art-placeholder" aria-hidden="true">
          🎵
        </div>
      </div>

      {/* Info + controls */}
      <div className="player-info">
        <p className="song-title">Back at One</p>
        <p className="song-artist">Brian McKnight</p>

        {/* Progress bar */}
        <div
          className="progress-bar"
          role="slider"
          aria-label="Song progress"
          aria-valuenow={Math.round(currentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          onClick={handleProgressClick}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-thumb" style={{ left: `${progress}%` }} />
        </div>

        {/* Time stamps */}
        <div className="player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <button className="ctrl-btn" aria-label="Previous" onClick={() => seek(0)}>
            <IconPrev />
          </button>
          <button
            className="ctrl-btn ctrl-btn-play"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={toggle}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
          <button className="ctrl-btn" aria-label="Next" disabled>
            <IconNext />
          </button>
        </div>
      </div>
    </aside>
  )
}

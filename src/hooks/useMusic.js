import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * useMusic — manages an HTML Audio element with play/pause, seek, and progress state.
 *
 * @param {string} src  - Path to the audio file, e.g. '/music/song.mp3'
 */
export const useMusic = (src) => {
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]   = useState(0)
  const [isLoaded, setIsLoaded]   = useState(false)

  // Create / destroy the Audio element when src changes
  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTimeUpdate    = () => setCurrentTime(audio.currentTime)
    const onMetadata      = () => { setDuration(audio.duration); setIsLoaded(true) }
    const onEnded         = () => setIsPlaying(false)
    const onError         = (e) => console.warn('[useMusic] Audio error:', e)

    audio.addEventListener('timeupdate',     onTimeUpdate)
    audio.addEventListener('loadedmetadata', onMetadata)
    audio.addEventListener('ended',          onEnded)
    audio.addEventListener('error',          onError)

    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onMetadata)
      audio.removeEventListener('ended',          onEnded)
      audio.removeEventListener('error',          onError)
      audio.pause()
      audio.src = ''
    }
  }, [src])

  /** Toggle play / pause */
  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.warn('[useMusic] Playback blocked:', err)
    }
  }, [isPlaying])

  /** Seek to a specific time in seconds */
  const seek = useCallback((time) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    isLoaded,
    toggle,
    seek,
  }
}

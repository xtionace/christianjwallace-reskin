'use client'

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function prefersReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches
}

export function CardLoop({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const reduceMotion = useSyncExternalStore(subscribe, prefersReducedMotion, () => true)
  const frame = 'absolute inset-0 size-full object-contain object-center'

  const videoRef = useRef<HTMLVideoElement>(null)
  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return
    // React sets the muted property and omits the attribute. iOS needs the attribute.
    video.defaultMuted = true
    video.muted = true
    video.setAttribute('muted', '')
  }, [reduceMotion])

  if (reduceMotion) {
    return <img src={poster} alt={alt} className={frame} />
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      className={frame}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

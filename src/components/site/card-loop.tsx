'use client'

import { useSyncExternalStore } from 'react'

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
  const frame =
    'absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none'

  if (reduceMotion) {
    return <img src={poster} alt={alt} className={frame} />
  }

  return (
    <video
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

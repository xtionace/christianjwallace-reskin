export function InkWash({ id }: { id: string }) {
  const filterId = `${id}-filter`
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="4" seed="7" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.97  0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 2.2 -1.1"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  )
}

"use client"

/* Decorative bottom waves per design, non-interactive */
export function WaveBg({ className = "" }) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[60px] md:h-[180px] lg:h-[220px]">
        <path fill="#0a3a43" d="M0,96 C240,168 480,168 720,112 C960,56 1200,56 1440,112 L1440,220 L0,220 Z" />
        <path
          fill="#0b4a55"
          opacity="0.55"
          d="M0,132 C240,200 480,176 720,148 C960,120 1200,144 1440,176 L1440,220 L0,220 Z"
        />
        <path
          fill="#0c2f37"
          opacity="0.7"
          d="M0,176 C240,200 480,176 720,164 C960,152 1200,168 1440,192 L1440,220 L0,220 Z"
        />
      </svg>
    </div>
  )
}

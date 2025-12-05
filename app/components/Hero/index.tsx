import React from 'react'

export default function HeroSection() {
  return (
    <section>
      <div className="@container">
        <div className="p-0 sm:p-4">
          <div className="relative flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4 overflow-hidden" data-alt="Warm and rustic restaurant interior with wooden furniture and traditional Vietnamese decorations.">
            {/* Decorative background video: muted + autoplay + loop + playsInline to allow autoplay on mobile */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/background-dong.mp4" type="video/mp4" />
              {/* Fallback image/text for browsers that don't support video */}
              Your browser does not support the video tag.
            </video>

            {/* Overlay to improve contrast for text */}
            <div className="absolute inset-0 bg-black/40 z-1" aria-hidden="true" />

            
          </div>
        </div>
      </div>
    </section>
  )
}

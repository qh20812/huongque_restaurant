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

            <div className="relative z-10 flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">Hương Vị Miền Tây, Tình Quê Đậm Đà</h1>
              <h2 className="text-gray-200 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">Khám phá tinh hoa ẩm thực sông nước trong không gian mộc mạc và ấm cúng.</h2>
            </div>
            <div className="relative z-10 flex-wrap gap-3 flex justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-90 transition-all">
                <span className="truncate">Đặt Bàn Ngay</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-90 transition-all">
                <span className="truncate">Khám Phá Thực Đơn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export default function HeroSection() {
  return (
    <section>
      <div className="@container">
        <div className="p-0 sm:p-4">
          <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4" data-alt="Warm and rustic restaurant interior with wooden furniture and traditional Vietnamese decorations." style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRMJZzpQWXE_Z5H2ZHL-pvYsRuW1rTbGZwhNrf8VVVfTKPBFp6iwgohGMk4pAMBZlL2ZNZ00JRlQN2UjfDRhtoDE3AJ-VXiga1pjqFwAB0KEBgo04AbEKDvJDzbPgGeX3Y_UAbEMYqWokktJVvJfd5Orcj7kux1rkMseChAMzO5HcK5Motbi509oUxmiYnVA0wQTe06IbPkrjNL6aJCLiI9gZThqPlpmJI8H4l1_fBhdbeMmFHjCGQPJFvaDKdBB5xhVxrIm19Nnk")' }}>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">Hương Vị Miền Tây, Tình Quê Đậm Đà</h1>
              <h2 className="text-gray-200 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">Khám phá tinh hoa ẩm thực sông nước trong không gian mộc mạc và ấm cúng.</h2>
            </div>
            <div className="flex-wrap gap-3 flex justify-center">
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

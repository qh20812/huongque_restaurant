import React from 'react'

export default function IntroductionSection() {
  return (
    <section className="px-4 py-16 sm:px-10" id="gioi-thieu">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[32px] font-bold leading-tight tracking-tight">Câu chuyện Hương Quê</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-relaxed">Hương Quê ra đời từ tình yêu với những món ăn dân dã, đậm đà hương vị miền Tây sông nước. Chúng tôi mong muốn mang đến một không gian ấm cúng, nơi thực khách có thể tìm về với những ký ức tuổi thơ và thưởng thức những món ăn được chế biến từ nguyên liệu tươi ngon nhất, giữ trọn vẹn tinh hoa ẩm thực Việt.</p>
        </div>
        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" data-alt="A beautifully decorated corner of the restaurant, featuring bamboo walls and traditional lanterns." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUSEHrqUPlbtII5KWNyQ_z1acMYe_r0j7l4oKl6o2LUJYy-Z8WO1o9aRbfzsSWVtVrBQF0EKifF4TbQ7dHvqq7iB4aS6YjQL5UHU7KqSZmU7NgieY92eBo2KhpiyoWFI8G8bvIpFBsCEBMeeGAA_larYduxKhcTiOVD00MXhl--LdScVc-_6kRF2PCIsdytUwHNmS7IVRo1PbyGmv7YQDrkkV1jo-rVhq6Y1t1VcubZLd2h8YjrrCPAeB8JF8nwH2bLRs0ZQxhwz8")' }}></div>
      </div>
    </section>
  )
}

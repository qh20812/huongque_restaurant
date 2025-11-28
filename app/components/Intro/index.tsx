import React from 'react'

export default function IntroductionSection() {
  return (
    <section className="px-4 py-16 sm:px-10" id="gioi-thieu">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[32px] font-bold leading-tight tracking-tight">Câu chuyện Hương Quê</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-relaxed">Hương Quê ra đời từ tình yêu với những món ăn dân dã, đậm đà hương vị miền Tây sông nước. Chúng tôi mong muốn mang đến một không gian ấm cúng, nơi thực khách có thể tìm về với những ký ức tuổi thơ và thưởng thức những món ăn được chế biến từ nguyên liệu tươi ngon nhất, giữ trọn vẹn tinh hoa ẩm thực Việt.</p>
        </div>
        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" data-alt="A beautifully decorated corner of the restaurant, featuring bamboo walls and traditional lanterns." style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%), url("/goc-ruou.jpg")' }}></div>
      </div>
    </section>
  )
}

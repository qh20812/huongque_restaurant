import React from 'react'

export default function TeamSection() {
  return (
    <section className="px-4 py-16 sm:px-10" id="doi-ngu">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-tight mb-2">Đội Ngũ Sáng Lập</h2>
        <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal mb-12 max-w-2xl mx-auto">Những con người tâm huyết, mang trong mình tình yêu với ẩm thực quê hương và mong muốn lan tỏa giá trị văn hóa Việt.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a smiling Vietnamese man in his 40s, a co-founder." style={{ backgroundImage: 'url("/anh-thu.jpg")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Lê Lâm Anh Thư</h4>
              <p className="text-primary text-sm font-medium">Quản Lý Nhà Hàng</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Mỗi món ăn là một câu chuyện, một ký ức về quê hương.”</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a Vietnamese woman in her 30s, the head chef." style={{ backgroundImage: 'url("/thanh-huy.jpg")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Lê Thanh Huy</h4>
              <p className="text-primary text-sm font-medium">Quản Lý Bếp</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Tôi nấu ăn bằng cả trái tim, bằng tình yêu dành cho miền Tây sông nước.”</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a young Vietnamese man, the restaurant manager." style={{ backgroundImage: 'url("/ngoc-tram.jpg")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Lê Thị Ngọc Trâm</h4>
              <p className="text-primary text-sm font-medium">Quản Lý Tiền Sảnh</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Sự hài lòng của bạn là niềm vinh hạnh lớn nhất của chúng tôi.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

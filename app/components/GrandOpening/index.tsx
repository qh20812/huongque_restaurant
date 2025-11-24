import React from 'react'

export default function GrandOpening() {
  return (
    <section className="px-4 py-16 sm:px-10" id="thuc-don">
      <div className="bg-cover bg-center rounded-xl py-20 px-4 text-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuALuMb-NZsvAllqrbmFL1e8n7ANnLB6H32ehWRA-xclKkw3iMlZJTgrbrOwwZPoydEeNxGpwhllhEP8X__XPORRWJu0b-8-hIYxoAvlGgKKb4MYRcPFEt6YRLI5r9s8Gq-47QSKFo35qNDx-RMKZ3OeZJDDb5nvMrLBs5X0uCRVUc0RZbwDjqZAm6804n6uRSmmQIEBmDaDsJ0k6kqsPOBj54c4GpYo4eL4f2sjKyFpC6jaxhy9GPtaDg_X7huUM6lXaozuO-H4oGI")' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Sắp Khai Trương</h2>
          <p className="text-gray-200 mt-4 text-lg">Hương Quê sẽ chính thức mở cửa chào đón quý thực khách. Hãy cùng chúng tôi đếm ngược đến ngày đặc biệt này!</p>
          <div className="mt-8 flex justify-center gap-4 sm:gap-8 text-white">
            <div><span className="block text-4xl font-bold">15</span><span className="text-sm">Ngày</span></div>
            <div><span className="block text-4xl font-bold">10</span><span className="text-sm">Giờ</span></div>
            <div><span className="block text-4xl font-bold">30</span><span className="text-sm">Phút</span></div>
            <div><span className="block text-4xl font-bold">55</span><span className="text-sm">Giây</span></div>
          </div>
          <p className="text-gray-200 mt-8 font-semibold">Ngày 30 tháng 12, 2024</p>
          <p className="text-gray-300">Tại 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
        </div>
      </div>
    </section>
  )
}

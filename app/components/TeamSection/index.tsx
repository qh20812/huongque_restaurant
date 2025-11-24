import React from 'react'

export default function TeamSection() {
  return (
    <section className="px-4 py-16 sm:px-10" id="doi-ngu">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-tight mb-2">Đội Ngũ Sáng Lập</h2>
        <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal mb-12 max-w-2xl mx-auto">Những con người tâm huyết, mang trong mình tình yêu với ẩm thực quê hương và mong muốn lan tỏa giá trị văn hóa Việt.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a smiling Vietnamese man in his 40s, a co-founder." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJeXN3se30ShWXVWLGUkqrB3A9swIUii_WE7Wpp-tL70qNIp5VgYI5ytf5gCvwuu_qCq07DhApVYxmJ0mEOJcje1Fx81IhHqSqqBKeT-BC_oU_1o8ZxYuhezXJjLGFHE5wL4iBYhxT_oPIaoRhpTBPxRcLcN4Zrw8byjt1IqcVK3vwNWhQhe80z8Hq9oDAFqIyaqUgOGwkL8JfZc8uSYVOMe-2kBJJzl8qJFa5dZud2d1v3ylevTazu6ldTWcHNJW0LBsC8TGCYX8")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Trần Văn An</h4>
              <p className="text-primary text-sm font-medium">Người Sáng Lập</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Mỗi món ăn là một câu chuyện, một ký ức về quê hương.”</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a Vietnamese woman in her 30s, the head chef." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQGu2VqeJSZe7da876RScwzFWGrL-CKHc13_I3FOmjfFwVeY-VH-b83Qk7ZIx6OA_GZ1lPXWBcpaP1xaPSyGozMD7b-QzsFwZxe1jZ3BAhRni-2P4t-LjtLcdUhw87ppyk8NemBQmOUru6clIl1bxj8BG15yeV-_kWl5P8uj2-61opyeRtCy7GcQ9Pqh5H_F3uUchezmOPj-aRzwlzBnSTK7GKiztBRjdRWdWWjMIXYOHsnY53F-pkh0pNL5JtbcU6lpG8XcPNYOI")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Lê Thị Bình</h4>
              <p className="text-primary text-sm font-medium">Bếp Trưởng</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Tôi nấu ăn bằng cả trái tim, bằng tình yêu dành cho miền Tây sông nước.”</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full bg-cover bg-center" data-alt="Portrait of a young Vietnamese man, the restaurant manager." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7-p-UPUQ_qjIrSv-YWdmJrYcFH2CjXZf9jqnuAO3XSIewJGXNwxXo9G9kL0C0EdKTlqY4bmRwPma5YkZU1m8o6L0jkAOjczRzmgBqnA-TQXgLo6G_4Lc1Yv4FELaGlHHz7Bfr1AZXZr02XQPkWQzG1cFG4--Qs1g7l6eBJRyBHPaVzSpHfH-yFLgSgiegC8BvgvUqZPMMsks0WFgGr6hwInDgHh5bO3LHmv2jrECTyof51z8MnpMrduRhXCp-lkrK4nXmxfrL6xw")' }}></div>
            <div className="text-center">
              <h4 className="text-text-light dark:text-text-dark text-lg font-bold">Nguyễn Minh Cường</h4>
              <p className="text-primary text-sm font-medium">Quản Lý Nhà Hàng</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-2 italic">“Sự hài lòng của bạn là niềm vinh hạnh lớn nhất của chúng tôi.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

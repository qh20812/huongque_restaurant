import TopNavBar from './components/TopNavBar'
import HeroSection from './components/Hero'
import IntroductionSection from './components/Intro'

export default function Home() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full">
              {/* TopNavBar */}
              <TopNavBar />
              <main className="flex-grow">
                {/* HeroSection */}
                <HeroSection />
                {/* Introduction Section */}
                <IntroductionSection />
                {/* Core Values Section */}
                <section className="px-4 py-16 sm:px-10 bg-primary/5 dark:bg-primary/10">
                  <div className="max-w-5xl mx-auto">
                    <h2 className="text-text-light dark:text-text-dark text-center text-[22px] font-bold leading-tight tracking-[-0.015em] pb-8">Giá trị cốt lõi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-1 gap-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                        <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">Nguyên Liệu Tươi</h3>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">Chúng tôi lựa chọn những nguyên liệu tươi ngon nhất từ các nhà cung cấp địa phương.</p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                        <span className="material-symbols-outlined text-primary text-4xl">menu_book</span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">Công Thức Truyền Thống</h3>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">Mỗi món ăn đều được chế biến theo công thức gia truyền để giữ trọn hương vị nguyên bản.</p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                        <span className="material-symbols-outlined text-primary text-4xl">cottage</span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">Không Gian Ấm Cúng</h3>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">Không gian được thiết kế để mang lại cảm giác thân thuộc, gần gũi như ở nhà.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Grand Opening */}
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
                {/* Team Section */}
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
              </main>
              {/* Footer */}
              <footer className="bg-background-dark text-text-dark" id="lien-he">
                <div className="max-w-5xl mx-auto px-4 sm:px-10 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-6 text-primary">
                          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                          </svg>
                        </div>
                        <h2 className="text-lg font-bold">Hương Quê</h2>
                      </div>
                      <p className="text-sm text-text-muted-dark">Nơi hội tụ tinh hoa ẩm thực miền Tây sông nước, mang đến cho thực khách những trải nghiệm ấm cúng và đáng nhớ.</p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold mb-4">Thông tin liên hệ</h4>
                          <ul className="space-y-2 text-sm text-text-muted-dark">
                            <li className="flex items-start gap-2">
                              <span className="material-symbols-outlined text-base mt-1">location_on</span>
                              <span>123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">call</span>
                              <a className="hover:text-primary" href="tel:0987654321">098-765-4321</a>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">mail</span>
                              <a className="hover:text-primary" href="mailto:info@huongque.vn">info@huongque.vn</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
                          <div className="flex space-x-4">
                            <a className="text-text-muted-dark hover:text-primary transition-colors" data-alt="Facebook icon" href="#">
                              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
                            </a>
                            <a className="text-text-muted-dark hover:text-primary transition-colors" data-alt="Instagram icon" href="#">
                              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.363a4.92 4.92 0 11-3.483 8.484 4.92 4.92 0 013.483-8.484zM12 14.85a2.85 2.85 0 100-5.7 2.85 2.85 0 000 5.7z" fillRule="evenodd"></path></svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border-dark mt-8 pt-6 text-center text-sm text-text-muted-dark">
                    <p>© 2024 Hương Quê. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
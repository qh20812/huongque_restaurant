import React from 'react'

export default function Footer() {
  return (
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
                    <span>Số 8, Nguyễn Văn Tráng, Phường Bến Thành, Quận 1, TP.HCM</span>
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
  )
}

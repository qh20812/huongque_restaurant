import React from 'react'
import SquareImage from '../UI/SquareImage'
import { prisma } from '@/app/lib/prisma'

async function getSetMenus() {
  const menus = await prisma.setMenu.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
    include: {
      sections: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { order: 'asc' },
            include: { dish: true },
          },
        },
      },
    },
  })
  return menus
}

export default async function SetMenuSection() {
  const menus = await getSetMenus()
  
  return (
    <section id="thuc-don" className="px-4 py-16 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
            Thực đơn Đa dạng Set Menu Miền Tây
          </h1>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark text-lg max-w-3xl mx-auto">
            Mỗi set menu là một hành trình khám phá ẩm thực miền Tây sông nước, được đầu bếp tài hoa của Hương Quê sáng tạo và gửi gắm trọn vẹn tinh hoa đất trời phương Nam.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8">
          {menus.map((menu) => (
            <div key={menu.id} className="relative bg-background-light dark:bg-background-dark/70 rounded-xl shadow-lg border border-border-light dark:border-border-dark p-6 sm:p-8 flex flex-col h-full">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-6 py-2 rounded-full shadow-md">{menu.name.toUpperCase()}</div>
              <div className="text-center mt-6 mb-8">
                <h2 className="text-primary text-3xl font-bold tracking-tight">{Intl.NumberFormat('vi-VN').format(menu.price)} VNĐ</h2>
                {menu.servesMin || menu.servesMax ? (
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">/ dành cho {menu.servesMin ?? ''}{menu.servesMin && menu.servesMax ? '-' : ''}{menu.servesMax ?? ''} người</p>
                ) : null}
              </div>
              <div className="space-y-6 grow">
                {menu.sections.map((section) => (
                  <div key={section.id}>
                    <h3 className="font-bold text-text-light dark:text-text-dark mb-4 text-center pb-2 border-b-2 border-primary/30">{section.name}</h3>
                    <ul className="space-y-4">
                      {section.items.map((item) => (
                        <li key={item.id} className="flex items-start gap-4">
                          <SquareImage src={item.dish.imageUrl || ''} alt={item.dish.name} size={64} />
                          <div className="min-w-0">
                            <span>{item.dish.name}</span>
                            {item.dish.description ? (
                              <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1 wrap-break-word">{item.dish.description}</p>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

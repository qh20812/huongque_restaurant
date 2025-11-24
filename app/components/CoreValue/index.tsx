import React from 'react'

export default function CoreValuesSection() {
  return (
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
  )
}

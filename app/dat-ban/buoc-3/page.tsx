"use client";
import React from 'react';
import Image from 'next/image';
import TopNavBar from '@/app/components/TopNavBar';
import Footer from '@/app/components/Footer';

export default function Buoc3() {
  // Sample reservation data - would come from previous steps in real app
  const reservationData = {
    date: 'Thứ Sáu, 26/07/2024',
    time: '19:00',
    guests: 4,
    name: 'Nguyễn Văn An',
    phone: '090xxxxxxx',
    specialRequest: 'Cho tôi một ghế trẻ em.',
    table: 'Bàn T04 - Gần cửa sổ',
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <TopNavBar />
          <main className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10 md:py-16">
            <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
              <div className="flex flex-col gap-8 w-full">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex flex-col gap-3">
                    <p className="text-text-light dark:text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                      Xác nhận thông tin đặt bàn
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">
                      Vui lòng kiểm tra lại thông tin của bạn trước khi xác nhận.
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 justify-between">
                    <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                      Bước 3/4: Xác nhận
                    </p>
                  </div>
                  <div className="rounded-full bg-border-light dark:bg-border-dark h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '75%' }} />
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left Column: Reservation Details */}
                  <div className="lg:col-span-2 dark:bg-surface-dark/50 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                      Chi tiết đặt bàn
                    </h3>
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5">
                      {/* Date */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">calendar_month</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Ngày
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.date}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Thời gian
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.time}
                        </p>
                      </div>

                      {/* Guests */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">group</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Số lượng khách
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.guests} người
                        </p>
                      </div>

                      {/* Name */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Họ và tên
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.name}
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">phone</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Số điện thoại
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.phone}
                        </p>
                      </div>

                      {/* Special Request */}
                      <div className="text-primary flex items-center pt-1">
                        <span className="material-symbols-outlined">edit_note</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                          Yêu cầu đặc biệt
                        </p>
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          {reservationData.specialRequest}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Table Info */}
                  <div className="flex flex-col gap-4 dark:bg-surface-dark/50 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                      Vị trí bàn đã chọn
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">table_restaurant</span>
                      <p className="text-text-light dark:text-text-dark font-bold">
                        {reservationData.table}
                      </p>
                    </div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                      <Image
                        src="https://via.placeholder.com/400x400/f3ede7/9a734c?text=Table+Layout"
                        alt="A floor plan of the restaurant highlighting the selected table near the window"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 p-4">
                  <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] border-2 border-border-light dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <span className="truncate">Quay lại</span>
                  </button>
                  <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                    <span className="truncate">Xác nhận đặt bàn</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

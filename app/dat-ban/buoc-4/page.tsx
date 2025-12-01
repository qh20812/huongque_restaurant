"use client";
import React from 'react';
import TopNavBar from '@/app/components/TopNavBar';
import Footer from '@/app/components/Footer';

type ReservationStatus = 'success' | 'error';

export default function Buoc4() {
  // This would come from server response or query params in real app
  const status: ReservationStatus = 'success';
  const reservationCode = 'HQ17195';
  
  const reservationData = {
    name: 'Nguyễn Văn An',
    phone: '090xxxxxxx',
    date: 'Thứ Sáu, 26/07/2024',
    time: '19:00',
    guests: 4,
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
                {/* Progress Bar */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 justify-between">
                    <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                      Bước 4/4: Hoàn tất
                    </p>
                  </div>
                  <div className="rounded-full bg-border-light dark:bg-border-dark h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Success/Error Card */}
                <div className=" dark:bg-surface-dark/50 p-6 md:p-10 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
                  {status === 'success' ? (
                    <>
                      {/* Success Icon */}
                      <div className="flex items-center justify-center size-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                          check_circle
                        </span>
                      </div>
                      <h2 className="text-text-light dark:text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        Đặt bàn thành công!
                      </h2>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal mt-3 max-w-lg">
                        Cảm ơn quý khách đã đặt bàn tại Hương Quê. Chúng tôi đã gửi thông tin xác nhận đến email của bạn. Vui lòng kiểm tra hộp thư đến.
                      </p>

                      {/* Reservation Code */}
                      <div className="my-8 w-full max-w-md">
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">
                          Mã đặt bàn của bạn:
                        </p>
                        <div className="bg-background-light dark:bg-background-dark/60 border-2 border-dashed border-border-light dark:border-white/20 rounded-lg px-4 py-3">
                          <p className="text-primary text-2xl font-bold tracking-widest">
                            {reservationCode}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Error Icon */}
                      <div className="flex items-center justify-center size-16 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-4xl">
                          error
                        </span>
                      </div>
                      <h2 className="text-text-light dark:text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        Đặt bàn không thành công
                      </h2>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal mt-3 max-w-lg">
                        Rất tiếc, đã có lỗi xảy ra trong quá trình đặt bàn. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi để được hỗ trợ.
                      </p>
                    </>
                  )}

                  {/* Divider */}
                  {status === 'success' && (
                    <>
                      <div className="w-full border-t border-gray-200 dark:border-white/10 my-8" />

                      {/* Reservation Summary */}
                      <div className="w-full max-w-xl text-left">
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 text-center">
                          Tóm tắt thông tin đặt bàn
                        </h3>
                        <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_1fr] gap-x-6 gap-y-5">
                          {/* Name */}
                          <div className="text-primary flex items-center pt-1">
                            <span className="material-symbols-outlined text-2xl">person</span>
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
                            <span className="material-symbols-outlined text-2xl">phone</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                              Số điện thoại
                            </p>
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                              {reservationData.phone}
                            </p>
                          </div>

                          {/* Date */}
                          <div className="text-primary flex items-center pt-1">
                            <span className="material-symbols-outlined text-2xl">calendar_month</span>
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
                            <span className="material-symbols-outlined text-2xl">schedule</span>
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
                            <span className="material-symbols-outlined text-2xl">group</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                              Số lượng khách
                            </p>
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                              {reservationData.guests} người
                            </p>
                          </div>

                          {/* Table */}
                          <div className="text-primary flex items-center pt-1">
                            <span className="material-symbols-outlined text-2xl">table_restaurant</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                              Bàn đã chọn
                            </p>
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                              {reservationData.table}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    {status === 'success' ? (
                      <>
                        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                          <span className="truncate">Quay về trang chủ</span>
                        </button>
                        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] border-2 border-border-light dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <span className="truncate">Xem thực đơn</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                          <span className="truncate">Thử lại</span>
                        </button>
                        <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] border-2 border-border-light dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <span className="truncate">Liên hệ hỗ trợ</span>
                        </button>
                      </>
                    )}
                  </div>
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

"use client";
import React, { useState } from "react";
import Image from "next/image";
import TopNavBar from "@/app/components/TopNavBar";
import Footer from "@/app/components/Footer";

export default function Buoc1() {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState("18:30");
  const [guestCount, setGuestCount] = useState(2);
  const [currentMonth] = useState("Tháng 10 2024");

  const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  const handleGuestChange = (delta: number) => {
    setGuestCount(Math.max(1, guestCount + delta));
  };

  return (
    <>
      <TopNavBar />
      <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="flex flex-1 justify-center px-4 py-10 md:px-10 lg:px-20">
              <div className="layout-content-container flex flex-col w-full max-w-6xl">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
                      Đặt Bàn Tại Hương Quê
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">
                      Trải nghiệm không gian ấm cúng và hương vị ẩm thực miền
                      Tây sông nước đích thực.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-3 flex flex-col gap-6">
                    {/* Progress Bar */}
                    <div className="flex flex-col gap-3 p-4">
                      <div className="flex gap-6 justify-between">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          Bước 1/4: Chọn thời gian
                        </p>
                      </div>
                      <div className="rounded-full bg-border-light dark:bg-border-dark h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "25%" }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 px-4">
                      {/* Calendar Picker */}
                      <div className="flex flex-1 flex-col gap-0.5 min-w-[280px]">
                        <div className="flex items-center p-1 justify-between">
                          <button
                            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/20 transition-colors"
                            onClick={() => {
                              /* Previous month logic */
                            }}
                          >
                            <span className="material-symbols-outlined text-lg">
                              chevron_left
                            </span>
                          </button>
                          <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight flex-1 text-center">
                            {currentMonth}
                          </p>
                          <button
                            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/20 transition-colors"
                            onClick={() => {
                              /* Next month logic */
                            }}
                          >
                            <span className="material-symbols-outlined text-lg">
                              chevron_right
                            </span>
                          </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7">
                          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(
                            (day, idx) => (
                              <p
                                key={day}
                                className={`${
                                  idx === 0
                                    ? "text-text-muted-light dark:text-text-muted-dark"
                                    : "text-text-light dark:text-text-dark"
                                } text-[13px] font-bold leading-normal flex h-12 w-full items-center justify-center pb-0.5`}
                              >
                                {day}
                              </p>
                            )
                          )}

                          {/* Days - simplified example */}
                          {[...Array(2)].map((_, i) => (
                            <button
                              key={`empty-${i}`}
                              className="h-12 w-full text-gray-400 dark:text-gray-600 text-sm font-medium leading-normal cursor-not-allowed"
                              disabled
                            >
                              <div className="flex size-full items-center justify-center rounded-full" />
                            </button>
                          ))}

                          {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isPast = day < 3;
                            const isSelected = day === selectedDate;

                            return (
                              <button
                                key={day}
                                disabled={isPast}
                                onClick={() => !isPast && setSelectedDate(day)}
                                className={`h-12 w-full text-sm ${
                                  isPast
                                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                    : "text-text-light dark:text-text-dark"
                                } ${
                                  isSelected ? "font-bold" : "font-medium"
                                } leading-normal`}
                              >
                                <div
                                  className={`flex size-full items-center justify-center rounded-full ${
                                    isSelected
                                      ? "bg-primary text-white"
                                      : !isPast
                                      ? "hover:bg-primary/20 transition-colors"
                                      : ""
                                  }`}
                                >
                                  {day}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time and Guest Selector */}
                      <div className="flex flex-1 flex-col gap-6">
                        <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pt-4">
                          Chọn giờ
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`rounded-lg border px-4 py-2 text-center text-sm font-medium transition-colors ${
                                selectedTime === time
                                  ? "bg-primary/20 border-primary"
                                  : "border-border-light dark:border-border-dark hover:bg-primary/20"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>

                        <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pt-4">
                          Số lượng khách
                        </h3>
                        <div className="flex items-center justify-between border border-border-light dark:border-border-dark rounded-lg p-2">
                          <button
                            onClick={() => handleGuestChange(-1)}
                            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              remove
                            </span>
                          </button>
                          <span className="text-base font-bold">
                            {guestCount} người
                          </span>
                          <button
                            onClick={() => handleGuestChange(1)}
                            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              add
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 mt-6">
                      <button className="w-full flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
                        <span className="truncate">Tiếp tục</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual & Summary */}
                  <div className="lg:col-span-2 flex flex-col gap-6 p-4">
                    <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image
                        className="object-cover"
                        alt="Warm and inviting restaurant interior"
                        src="/ban-ghe.jpg"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>

                    <div className="bg-surface-light/50 dark:bg-surface-dark/50 p-6 rounded-xl border border-border-light dark:border-border-dark flex flex-col gap-4">
                      <h4 className="text-lg font-bold text-text-light dark:text-text-dark">
                        Thông tin đặt bàn
                      </h4>
                      <div className="flex flex-col gap-3 text-sm border-t border-border-light dark:border-border-dark pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted-light dark:text-text-muted-dark font-medium">
                            Ngày
                          </span>
                          <span className="font-bold">Thứ Bảy, 05/10/2024</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted-light dark:text-text-muted-dark font-medium">
                            Giờ
                          </span>
                          <span className="font-bold">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted-light dark:text-text-muted-dark font-medium">
                            Số khách
                          </span>
                          <span className="font-bold">{guestCount} người</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-center text-text-muted-light dark:text-text-muted-dark">
                        <p>
                          Vui lòng hoàn tất các bước để xác nhận đặt bàn của
                          bạn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

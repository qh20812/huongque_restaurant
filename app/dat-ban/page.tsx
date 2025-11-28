"use client";
import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";

export default function DatBan() {
  const [time, setTime] = useState("19:00");
  const [people, setPeople] = useState<number | "">(2);
  const [area, setArea] = useState("Chọn khu vực bạn muốn");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, just console.log the payload — we can wire this to an API later
    console.info({ time, people, area, name, phone, note });
    // future: fetch('/api/dat-ban', { method: 'POST', body: JSON.stringify({ ... }) })
  }
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <TopNavBar />
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <main className="flex-1 mt-5 md:mt-10">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 text-center"
                    data-alt="A large, delicious-looking Vietnamese meal served in a rustic restaurant setting."
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAonuw0J78ppjSX-aHxrY5S9b6EjSszfreEA2tg3D_mPmqURJ_XugXo0dOFID-xWzqOB-PRKf_q7l4FJN86F8tnIG8O2M5E3Hmtv0V2n1A83-Cf9n31-xGTWgcB2TOTrnwW_Ks5UQf3jc2lNw-IA4Jbg-7gqS-KfcIEyRFbuHpiAFhNgwzvzxgGC7Yc3grOI4XSOZqv70n66Fhc2VCM83Pl7ULCLggNncc8dn-TSwYn-vYeSBruF-6BXEPlrSp33j604h2oOkWQZjY')",
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Đặt Bàn Tại Hương Quê
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal max-w-lg mx-auto">
                        Chọn một góc nhỏ yên bình và thưởng thức những món ngon miền Tây sông nước cùng người thân.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-4 md:p-8 lg:p-12 mt-8 bg-white dark:bg-[#2c2115] rounded-xl shadow-lg border border-border-light dark:border-border-dark">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Form */}
                  <div className="flex flex-col gap-6">
                    <h3 className="text-2xl font-bold text-text-light dark:text-background-light">Thông tin đặt bàn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Chọn giờ</p>
                        <InputField
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          placeholder="19:00"
                          type="time"
                          name="time"
                          inputClassName="h-12"
                          hideLabel
                        />
                      </label>
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Số lượng khách</p>
                        <InputField
                          value={String(people)}
                          onChange={(e) => setPeople(Number(e.target.value) || "")}
                          placeholder="2 người"
                          type="number"
                          name="people"
                          inputClassName="h-12"
                          hideLabel
                        />
                      </label>
                    </div>
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Khu vực (không bắt buộc)</p>
                      <div className="relative flex w-full flex-1 items-stretch">
                        <select className="form-select appearance-none w-full min-w-0 flex-1 rounded-lg text-text-light dark:text-background-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 p-3 text-base font-normal leading-normal" value={area} onChange={(e) => setArea(e.target.value)} name="area">
                          <option>Chọn khu vực bạn muốn</option>
                          <option>Trong nhà</option>
                          <option>Sân vườn</option>
                          <option>Gần cửa sổ</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="material-symbols-outlined text-text-muted-light dark:text-gray-400">unfold_more</span>
                        </div>
                      </div>
                    </label>
                    <h3 className="text-2xl font-bold text-text-light dark:text-background-light pt-4">Thông tin liên hệ</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <label className="flex flex-col">
                        <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Họ và Tên</p>
                        <InputField
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nhập họ và tên của bạn"
                          name="name"
                          inputClassName="h-12"
                          hideLabel
                        />
                      </label>
                      <label className="flex flex-col">
                        <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Số điện thoại</p>
                        <InputField
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Nhập số điện thoại"
                          type="tel"
                          name="phone"
                          inputClassName="h-12"
                          hideLabel
                        />
                      </label>
                      <label className="flex flex-col">
                        <p className="text-text-light dark:text-gray-300 text-sm font-medium leading-normal pb-2">Ghi chú (không bắt buộc)</p>
                        <textarea className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-light dark:text-background-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-24 placeholder:text-text-muted-light p-3 text-base font-normal leading-normal"
                          placeholder="Yêu cầu đặc biệt (ghế trẻ em, trang trí sinh nhật...)" name="note" value={note} onChange={(e) => setNote(e.target.value)} />
                      </label>
                    </div>
                    <Button type="submit">
                      <span className="truncate">XÁC NHẬN ĐẶT BÀN</span>
                    </Button>
                  </div>
                  {/* Right: Calendar */}
                  <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-2xl font-bold text-text-light dark:text-background-light text-center lg:text-left w-full">Chọn ngày</h3>
                    <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5 w-full">
                      <div className="flex items-center p-1 justify-between">
                        <button className="text-text-light dark:text-background-light rounded-full hover:bg-gray-100 dark:hover:bg-white/10 p-2">
                          <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <p className="text-text-light dark:text-background-light text-base font-bold leading-tight flex-1 text-center">Tháng 12 2024</p>
                        <button className="text-text-light dark:text-background-light rounded-full hover:bg-gray-100 dark:hover:bg-white/10 p-2">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-7">
                        {['S','M','T','W','T','F','S'].map((d)=> (
                          <p key={d} className="text-text-light dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">{d}</p>
                        ))}
                        {/* Calendar days: render a simple static calendar cells */}
                        {Array.from({length:31}).map((_, idx)=> (
                          <button key={idx} className="h-12 w-full text-text-light dark:text-background-light text-sm font-medium leading-normal">
                            <div className="flex size-full items-center justify-center rounded-full hover:bg-primary/20">{idx+1}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

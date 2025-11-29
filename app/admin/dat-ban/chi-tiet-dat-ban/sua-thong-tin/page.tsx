"use client";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumb";
import PageTitle from "../../../components/PageTitle";
import Button from "../../../components/Button";
import DescriptionField from "../../../components/DescriptionField";

interface ReservationForm {
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: string;
  specialRequest: string;
}

export default function SuaThongTin() {
  // Demo data - in real app, fetch by ID from URL params
  const [formData, setFormData] = useState<ReservationForm>({
    customerName: "Nguyễn Thị Bích",
    phone: "0987654321",
    email: "ntbich@email.com",
    date: "2024-09-15",
    time: "18:30",
    guestCount: "4",
    specialRequest:
      "Vui lòng sắp xếp bàn gần cửa sổ, view đẹp. Có một bé 2 tuổi, cần ghế trẻ em.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating reservation:", formData);
    alert("Cập nhật đặt bàn thành công!");
    // Navigate back or show success message
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý đặt bàn", href: "/admin/dat-ban" },
          { label: "Sửa thông tin đặt bàn", current: true },
        ]}
      />

      <PageTitle
        title="Sửa thông tin đặt bàn"
        subtitle="Chỉnh sửa thông tin chi tiết cho một đặt bàn đã có."
      />

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-background-dark/50 border border-border-light dark:border-primary/20 rounded-xl p-8">
          <div className="flex flex-col gap-6">
            {/* Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                  Tên khách hàng
                </p>
                <input
                  className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                  Số điện thoại
                </p>
                <input
                  className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Ví dụ: 0905123456"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* Email */}
            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                Email
              </p>
              <input
                className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="Ví dụ: nguyenvana@email.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            {/* Date, Time, Guest Count */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                  Ngày đặt
                </p>
                <div className="relative w-full">
                  <input
                    className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50 w-full"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-primary/70 pointer-events-none">
                    calendar_month
                  </span>
                </div>
              </label>
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                  Giờ đặt
                </p>
                <div className="relative w-full">
                  <input
                    className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50 w-full"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-primary/70 pointer-events-none">
                    schedule
                  </span>
                </div>
              </label>
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium leading-normal pb-2">
                  Số lượng khách
                </p>
                <input
                  className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Ví dụ: 4"
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </label>
            </div>

            {/* Special Request */}
            <DescriptionField
              label="Yêu cầu đặc biệt"
              placeholder="Nhập yêu cầu đặc biệt (nếu có)..."
              value={formData.specialRequest}
              onChange={(value) => setFormData((prev) => ({ ...prev, specialRequest: value }))}
              name="specialRequest"
              rows={5}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-primary/20">
            <Button variant="secondary" onClick={handleCancel} type="button">
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

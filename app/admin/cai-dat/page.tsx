"use client";
import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumb";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";

export default function CaiDat() {
  // Restaurant info
  const [restaurantName, setRestaurantName] = useState("Hương Quê");
  const [restaurantAddress, setRestaurantAddress] = useState(
    "123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh"
  );
  const [restaurantPhone, setRestaurantPhone] = useState("0123 456 789");
  const [restaurantEmail, setRestaurantEmail] = useState("lienhe@huongque.vn");

  // Reservation settings
  const [operatingHours, setOperatingHours] = useState("10:00 - 22:00");
  const [maxTables, setMaxTables] = useState<number>(20);
  const [bookingLeadTime, setBookingLeadTime] = useState<number>(2);

  // Admin account settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Theme settings
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const breadcrumbs = [{ label: "Cài đặt", current: true }];

  const saveRestaurantInfo = () => {
    console.log({ restaurantName, restaurantAddress, restaurantPhone, restaurantEmail });
    alert("Đã lưu thông tin nhà hàng (demo)");
  };

  const saveReservationSettings = () => {
    console.log({ operatingHours, maxTables, bookingLeadTime });
    alert("Đã lưu cài đặt đặt bàn (demo)");
  };

  const changeAdminPassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ các trường mật khẩu.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp.");
      return;
    }
    console.log({ currentPassword, newPassword });
    alert("Đã đổi mật khẩu (demo)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const saveTheme = () => {
    console.log({ theme });
    alert("Đã lưu cài đặt giao diện (demo)");
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <Breadcrumbs items={breadcrumbs} />
      <PageTitle title="Cài đặt" subtitle="Quản lý thông tin và cấu hình hệ thống." />

      {/* Restaurant Info */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Thông tin nhà hàng</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">
            Cập nhật thông tin hiển thị cho nhà hàng của bạn.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="restaurant-name">
              Tên nhà hàng
            </label>
            <input
              id="restaurant-name"
              type="text"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="restaurant-address">
              Địa chỉ
            </label>
            <input
              id="restaurant-address"
              type="text"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="restaurant-phone">
              Số điện thoại
            </label>
            <input
              id="restaurant-phone"
              type="tel"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={restaurantPhone}
              onChange={(e) => setRestaurantPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="restaurant-email">
              Email
            </label>
            <input
              id="restaurant-email"
              type="email"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={restaurantEmail}
              onChange={(e) => setRestaurantEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-t border-border-light dark:border-border-dark flex justify-end">
          <Button onClick={saveRestaurantInfo}>Lưu thay đổi</Button>
        </div>
      </div>

      {/* Reservation Settings */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Cài đặt đặt bàn</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">
            Quản lý các quy tắc và giới hạn cho việc đặt bàn online.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="operating-hours">
              Thời gian hoạt động
            </label>
            <input
              id="operating-hours"
              type="text"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="max-tables">
              Số bàn tối đa
            </label>
            <input
              id="max-tables"
              type="number"
              min={1}
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={maxTables}
              onChange={(e) => setMaxTables(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="booking-lead-time">
              Thời gian đặt trước (giờ)
            </label>
            <input
              id="booking-lead-time"
              type="number"
              min={0}
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={bookingLeadTime}
              onChange={(e) => setBookingLeadTime(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-t border-border-light dark:border-border-dark flex justify-end">
          <Button onClick={saveReservationSettings}>Lưu thay đổi</Button>
        </div>
      </div>

      {/* Admin Account Settings */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Cài đặt tài khoản Admin</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">
            Thay đổi mật khẩu và quản lý người dùng admin khác.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="current-password">
              Mật khẩu hiện tại
            </label>
            <input
              id="current-password"
              type="password"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="new-password">
              Mật khẩu mới
            </label>
            <input
              id="new-password"
              type="password"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-text-light dark:text-text-dark" htmlFor="confirm-password">
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirm-password"
              type="password"
              className="md:col-span-2 w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary p-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-t border-border-light dark:border-border-dark flex justify-end">
          <Button onClick={changeAdminPassword}>Đổi mật khẩu</Button>
        </div>
      </div>

      {/* UI Theme Settings */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Cài đặt giao diện</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">
            Tùy chỉnh giao diện của trang quản lý.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-text-light dark:text-text-dark">Chủ đề màu sắc</label>
              <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                Chọn giao diện Sáng hoặc Tối cho bảng điều khiển.
              </p>
            </div>
            <div className="md:col-span-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 p-4 rounded-lg border-2 w-full ${
                  theme === "light"
                    ? "border-primary bg-primary/10"
                    : "border-border-light dark:border-border-dark hover:border-primary/50"
                }`}
              >
                <span className={`material-symbols-outlined ${theme === "light" ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                  light_mode
                </span>
                <span className={`text-sm font-medium ${theme === "light" ? "text-primary" : "text-text-light dark:text-text-dark"}`}>
                  Sáng
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 p-4 rounded-lg border-2 w-full ${
                  theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-border-light dark:border-border-dark hover:border-primary/50"
                }`}
              >
                <span className={`material-symbols-outlined ${theme === "dark" ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                  dark_mode
                </span>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-primary" : "text-text-light dark:text-text-dark"}`}>
                  Tối
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-t border-border-light dark:border-border-dark flex justify-end">
          <Button onClick={saveTheme}>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
}

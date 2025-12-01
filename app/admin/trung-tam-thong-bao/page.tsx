"use client";
import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumb";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";

type NotificationType = "Đặt bàn mới" | "Hủy đặt bàn" | "Hết hàng" | "Hệ thống" | "Cập nhật";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "DB1052",
    type: "Đặt bàn mới",
    title: "Đặt bàn mới #DB1052",
    message: "Khách hàng Trần Văn An vừa đặt bàn cho 4 người vào lúc 19:00 hôm nay.",
    time: "2 phút trước",
    read: false,
  },
  {
    id: "LOW_STOCK_GA_NUONG_LU",
    type: "Hết hàng",
    title: "Món \"Gà nướng lu\" sắp hết hàng",
    message: "Số lượng tồn kho của món \"Gà nướng lu\" chỉ còn dưới 5 suất. Vui lòng kiểm tra và cập nhật.",
    time: "15 phút trước",
    read: false,
  },
  {
    id: "DB1048_CANCEL",
    type: "Hủy đặt bàn",
    title: "Hủy đặt bàn #DB1048",
    message: "Khách hàng Lê Thị Bích đã hủy đặt bàn cho 2 người vào lúc 20:00 hôm nay.",
    time: "1 giờ trước",
    read: true,
  },
  {
    id: "SYS_WARN_PAYMENTS",
    type: "Hệ thống",
    title: "Cảnh báo hệ thống: Lỗi thanh toán",
    message: "Ghi nhận 3 giao dịch thanh toán qua cổng VNPAY thất bại. Vui lòng kiểm tra cấu hình.",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: "DB1051",
    type: "Đặt bàn mới",
    title: "Đặt bàn mới #DB1051",
    message: "Khách hàng Nguyễn Thị Cẩm vừa đặt bàn cho 6 người vào lúc 18:30 ngày mai.",
    time: "Hôm qua",
    read: true,
  },
  {
    id: "SYS_UPDATE_120",
    type: "Cập nhật",
    title: "Hệ thống đã được cập nhật",
    message: "Hệ thống quản lý đã được cập nhật lên phiên bản 1.2.0 với các bản vá bảo mật mới.",
    time: "2 ngày trước",
    read: true,
  },
];

export default function TrungTamThongBao() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [typeFilter, setTypeFilter] = useState<string>("Tất cả loại");
  const [statusFilter, setStatusFilter] = useState<string>("Tất cả trạng thái");

  const breadcrumbs = [
    { label: "Trung tâm thông báo", current: true },
  ];

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function deleteAll() {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả thông báo?")) {
      setNotifications([]);
    }
  }

  function toggleRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  const filtered = notifications.filter((n) => {
    const matchType = typeFilter === "Tất cả loại" || n.type === typeFilter;
    const matchStatus =
      statusFilter === "Tất cả trạng thái" || (statusFilter === "Chưa đọc" ? !n.read : n.read);
    return matchType && matchStatus;
  });

  function typeBadgeColor(type: NotificationType) {
    switch (type) {
      case "Đặt bàn mới":
        return "bg-primary/15 text-primary";
      case "Hủy đặt bàn":
        return "bg-danger/10 text-danger";
      case "Hết hàng":
        return "bg-warning/20 text-warning";
      case "Hệ thống":
        return "bg-info/15 text-info";
      case "Cập nhật":
        return "bg-success/15 text-success";
      default:
        return "bg-black/10 text-text-muted-light dark:text-text-muted-dark";
    }
  }

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <Breadcrumbs items={breadcrumbs} />
      <PageTitle title="Trung tâm thông báo" subtitle="Xem và quản lý các thông báo hệ thống, đặt bàn, tồn kho." />

      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-border-light dark:border-border-dark flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                className="w-full md:w-48 appearance-none rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm py-2 pl-3 pr-8 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>Tất cả loại</option>
                <option>Đặt bàn mới</option>
                <option>Hủy đặt bàn</option>
                <option>Hết hàng</option>
                <option>Hệ thống</option>
                <option>Cập nhật</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark pointer-events-none">
                expand_more
              </span>
            </div>
            <div className="relative">
              <select
                className="w-full md:w-48 appearance-none rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm py-2 pl-3 pr-8 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Tất cả trạng thái</option>
                <option>Chưa đọc</option>
                <option>Đã đọc</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" icon="done_all" onClick={markAllRead}>
              Đánh dấu đã đọc
            </Button>
            <Button variant="danger" icon="delete" onClick={deleteAll}>
              Xóa tất cả
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-border-light dark:divide-border-dark">
          {filtered.length === 0 && (
            <div className="p-6 text-sm text-text-muted-light dark:text-text-muted-dark">Không có thông báo phù hợp.</div>
          )}
          {filtered.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => toggleRead(n.id)}
              className="w-full text-left flex items-start gap-4 p-4 md:p-6 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer focus:outline-none"
            >
              <div className={`size-2.5 rounded-full mt-2 ${n.read ? "bg-transparent" : "bg-primary"}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-base font-${n.read ? "medium" : "bold"} ${n.read ? "text-text-muted-light dark:text-text-muted-dark" : "text-text-light dark:text-text-dark"}`}
                    >
                      {n.title}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-medium ${typeBadgeColor(n.type)}`}
                    >
                      {n.type}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">{n.time}</p>
                </div>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{n.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

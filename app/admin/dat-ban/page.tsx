"use client";
import React, { useState } from "react";

type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guestCount: number;
  status: ReservationStatus;
}

export default function DatBan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [dateFilter, setDateFilter] = useState("");

  // Demo data
  const reservations: Reservation[] = [
    {
      id: "1",
      customerName: "Nguyễn Văn An",
      phone: "0901234567",
      date: "25/12/2023",
      time: "19:00",
      guestCount: 4,
      status: "confirmed",
    },
    {
      id: "2",
      customerName: "Trần Thị Bích",
      phone: "0912345678",
      date: "26/12/2023",
      time: "18:30",
      guestCount: 2,
      status: "pending",
    },
    {
      id: "3",
      customerName: "Lê Hoàng Cường",
      phone: "0987654321",
      date: "24/12/2023",
      time: "20:00",
      guestCount: 6,
      status: "completed",
    },
    {
      id: "4",
      customerName: "Phạm Thị Dung",
      phone: "0939876543",
      date: "25/12/2023",
      time: "19:30",
      guestCount: 5,
      status: "cancelled",
    },
    {
      id: "5",
      customerName: "Võ Minh Hải",
      phone: "0978123456",
      date: "27/12/2023",
      time: "12:00",
      guestCount: 8,
      status: "confirmed",
    },
  ];

  const getStatusLabel = (status: ReservationStatus) => {
    const labels = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      completed: "Đã hoàn thành",
      cancelled: "Đã hủy",
    };
    return labels[status];
  };

  const getStatusClass = (status: ReservationStatus) => {
    const classes = {
      pending:
        "bg-status-pending-bg dark:bg-status-pending-bg-dark text-status-pending dark:text-status-pending-dark",
      confirmed:
        "bg-status-confirmed-bg dark:bg-status-confirmed-bg-dark text-status-confirmed dark:text-status-confirmed-dark",
      completed:
        "bg-status-completed-bg dark:bg-status-completed-bg-dark text-status-completed dark:text-status-completed-dark",
      cancelled:
        "bg-status-cancelled-bg dark:bg-status-cancelled-bg-dark text-status-cancelled dark:text-status-cancelled-dark",
    };
    return classes[status];
  };

  const filtered = reservations.filter((r) => {
    const bySearch = searchQuery
      ? r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery)
      : true;
    const byStatus =
      statusFilter === "Tất cả trạng thái"
        ? true
        : getStatusLabel(r.status) === statusFilter;
    return bySearch && byStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              placeholder="Tìm kiếm khách hàng..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Tất cả trạng thái</option>
              <option>Chờ xác nhận</option>
              <option>Đã xác nhận</option>
              <option>Đã hủy</option>
              <option>Đã hoàn thành</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              expand_more
            </span>
          </div>
          <div className="relative">
            <input
              className="w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              calendar_today
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/5 dark:bg-white/5">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Tên khách hàng
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Giờ đặt
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Số lượng khách
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filtered.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-text-light dark:text-text-dark">
                      {reservation.customerName}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                    {reservation.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                    {reservation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                    {reservation.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark text-center">
                    {reservation.guestCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        reservation.status
                      )}`}
                    >
                      {getStatusLabel(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted-light dark:text-text-muted-dark"
                        title="Xem chi tiết"
                        onClick={() => console.log("View", reservation.id)}
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted-light dark:text-text-muted-dark"
                        title="Cập nhật trạng thái"
                        onClick={() => console.log("Edit", reservation.id)}
                      >
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-red-600 dark:text-red-400"
                        title="Xóa"
                        onClick={() => console.log("Delete", reservation.id)}
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

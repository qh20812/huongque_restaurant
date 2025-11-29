"use client";
import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

interface ReservationDetail {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  specialRequest: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export default function ChiTietDatBan() {
  // Demo data - in real app, fetch by ID from URL params
  const [reservation] = useState<ReservationDetail>({
    id: "10524",
    customerName: "Nguyễn Thị Bích",
    phone: "0987654321",
    email: "ntbich@email.com",
    date: "15/09/2024",
    time: "18:30",
    guestCount: 4,
    specialRequest:
      "Vui lòng sắp xếp bàn gần cửa sổ, view đẹp. Có một bé 2 tuổi, cần ghế trẻ em.",
    status: "confirmed",
  });

  const handleBack = () => {
    window.history.back();
  };

  const handleEdit = () => {
    alert("Chức năng sửa đặt bàn (coming soon)");
  };

  const handleUpdateStatus = () => {
    alert("Chức năng cập nhật trạng thái (coming soon)");
  };

  const handleCancel = () => {
    if (confirm("Bạn có chắc chắn muốn hủy đặt bàn này?")) {
      alert("Đã hủy đặt bàn");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý đặt bàn", href: "/admin/dat-ban" },
          { label: "Chi tiết đặt bàn", current: true },
        ]}
      />

      <PageTitle
        title={`Chi tiết đặt bàn #${reservation.id}`}
        subtitle="Xem thông tin chi tiết của một đặt bàn đã chọn."
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              icon="arrow_back"
              iconPosition="left"
              onClick={handleBack}
            >
              Quay lại
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="edit"
              iconPosition="left"
              onClick={handleEdit}
              className="bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40"
            >
              Sửa đặt bàn
            </Button>
          </>
        }
      />

      <div className="bg-white dark:bg-background-dark/50 border border-border-light dark:border-primary/20 rounded-xl p-8">
        <div className="flex flex-col gap-6">
          {/* Customer and Reservation Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Tên khách hàng
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.customerName}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Số điện thoại
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.phone}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Email
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.email}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Ngày đặt
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.date}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Giờ đặt
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.time}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
                Số lượng khách
              </p>
              <p className="text-text-light dark:text-background-light text-base font-medium leading-normal">
                {reservation.guestCount} người
              </p>
            </div>
          </div>

          {/* Special Request */}
          <div className="flex flex-col w-full">
            <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-1">
              Yêu cầu đặc biệt
            </p>
            <p className="text-text-light dark:text-background-light text-base font-medium leading-normal bg-background-light dark:bg-background-dark/60 p-4 rounded-lg border border-border-light dark:border-primary/20 min-h-24">
              {reservation.specialRequest}
            </p>
          </div>

          {/* Status */}
          <div className="flex flex-col w-full">
            <p className="text-text-muted-light dark:text-primary/70 text-sm font-normal leading-normal pb-2">
              Trạng thái hiện tại
            </p>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                <span className="size-2 rounded-full bg-blue-500" />
                <span>Đã xác nhận</span>
              </div>
              <button
                className="text-primary dark:text-primary/90 text-sm font-medium hover:underline"
                onClick={handleUpdateStatus}
              >
                Cập nhật trạng thái
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-primary/20">
          <button
            className="flex items-center justify-center h-12 px-6 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 text-base font-medium hover:bg-red-200 dark:hover:bg-red-900"
            onClick={handleCancel}
          >
            Hủy đặt bàn
          </button>
        </div>
      </div>
    </div>
  );
}

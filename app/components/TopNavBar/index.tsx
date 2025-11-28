"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TopNavBar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/logout", { method: "POST", credentials: "include" });
      if (!res.ok) {
        const json = await res.json();
        console.warn(json?.message ?? "Đăng xuất thất bại");
      } else {
        console.info("Đăng xuất thành công");
        // redirect to home and refresh
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("logout failed", err);
      console.warn("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsLoggingOut(false);
    }
  }
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-10 py-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <Link href="/" aria-label="Hương Quê - Trang chủ" className="flex items-center gap-4">
        <div className="size-6">
          <Image src="/logo-huongque.svg" alt="Hương Quê logo" width={36} height={36} className="object-contain" />
        </div>
        <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">
          Hương Quê
        </h2>
      </Link>
      <nav className="flex flex-1 justify-end gap-8">
        <div className="hidden sm:flex items-center gap-9">
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            href="#gioi-thieu"
          >
            Giới Thiệu
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            href="/thuc-don"
          >
            Thực Đơn
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            href="#doi-ngu"
          >
            Đội Ngũ
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            href="#lien-he"
          >
            Liên Hệ
          </a>
          <Link
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            href="/dang-nhap"
          >
            Đăng Nhập
          </Link>
          <button
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
            onClick={handleLogout}
            type="button"
            aria-label="Đăng xuất"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Đang thoát..." : "Đăng Xuất"}
          </button>
        </div>
      </nav>
    </header>
  );
}

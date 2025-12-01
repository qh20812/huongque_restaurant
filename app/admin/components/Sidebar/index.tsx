"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { href: '/admin', icon: 'pie_chart', label: 'Tổng quan' },
    { href: '/admin/mon-an', icon: 'restaurant_menu', label: 'Quản lý món ăn' },
    { href: '/admin/set-menu', icon: 'menu_book', label: 'Quản lý set menu' },
    { href: '/admin/dat-ban', icon: 'calendar_month', label: 'Quản lý đặt bàn' },
    { href: '/admin/anh', icon: 'photo_library', label: 'Quản lý ảnh' },
    { href: '/admin/cai-dat', icon: 'settings', label: 'Cài đặt' },
  ];

  return (
    <aside className="flex flex-col w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark p-4">
      <div className="flex items-center gap-3 p-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: "url('/logo-huongque.svg')"
          }}
        />
        <div className="flex flex-col">
          <h1 className="text-text-light dark:text-text-dark text-base font-bold">
            Hương Quê
          </h1>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal">
            Admin Panel
          </p>
        </div>
      </div>
      <nav className="mt-6 flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          // For parent admin route, match exact '/admin'. For others, match prefix so
          // nested routes like '/admin/mon-an/them-mon-an' keep the main item active.
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive
                  ? 'bg-primary/20 dark:bg-primary/30'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  isActive
                    ? 'text-primary dark:text-primary'
                    : 'text-text-light dark:text-text-dark'
                }`}
              >
                {item.icon}
              </span>
              <p
                className={`text-sm ${
                  isActive
                    ? 'text-primary dark:text-primary font-bold'
                    : 'text-text-light dark:text-text-dark font-medium'
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            if (isLoggingOut) return;
            setIsLoggingOut(true);
            try {
              const res = await fetch('/api/dang-xuat', { method: 'POST', credentials: 'include' });
              // fallback to /api/logout if endpoint not found
              if (!res.ok) {
                await fetch('/api/logout', { method: 'POST', credentials: 'include' });
              }
            } catch (err) {
              console.error('Logout failed', err);
            } finally {
              setIsLoggingOut(false);
              // Redirect to login page
              router.push('/dang-nhap');
              router.refresh();
            }
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-text-light dark:text-text-dark">
            logout
          </span>
          <p className="text-text-light dark:text-text-dark text-sm font-medium">
            {isLoggingOut ? 'Đăng xuất...' : 'Đăng xuất'}
          </p>
        </button>
      </div>
    </aside>
  );
}

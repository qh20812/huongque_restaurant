"use client";
import React from 'react';

export default function NavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark px-10 py-4 bg-surface-light dark:bg-surface-dark">
      <h2 className="text-text-light dark:text-text-dark text-lg font-bold">
        Tổng quan hoạt động
      </h2>
      <div className="flex items-center gap-4">
        <button
          className="flex cursor-pointer items-center justify-center rounded-full size-10 bg-black/5 dark:bg-white/10 text-text-light dark:text-text-dark hover:bg-black/10 dark:hover:bg-white/20"
          aria-label="Thông báo"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAT78A-0uaWrYDImRvTAOAEYWdsv_iQ9L9DsC2OLqBq5Q9sNEJ3ran0PTjeKuBmangQAk_0xm6taHhA2Und8J-pODXOIi9iG9yAIf_n2_g2Sv8ih68-l_f5Fe0cNwa07isQY7m4qjmaI4JZRrL4ZfwM-f7er1COFupdeNMkCQ3z34BS9AYSRNQ6BGTead8gYUceEQgtTKa-gYCxBbUE9bQEHt_Llt52q37MfYLHYPX0IVm-fWrq1HLxAOOS7c2_4zkp-Q-HYwh3ujM')"
          }}
          aria-label="Avatar admin"
        />
      </div>
    </header>
  );
}

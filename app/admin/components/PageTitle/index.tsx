"use client";
import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageTitle({
  title,
  subtitle,
  actions,
  className = "",
}: PageTitleProps) {
  return (
    <div className={"flex flex-wrap justify-between gap-3 mb-4 " + className}>
      <div className="flex min-w-72 flex-col gap-2">
        <p className="text-text-light dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{title}</p>
        {subtitle && (
          <p className="text-text-muted-light dark:text-primary/70 text-base">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

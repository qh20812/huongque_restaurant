"use client";
import React from "react";

type DescriptionFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  rows?: number;
  name?: string;
  required?: boolean;
};

export default function DescriptionField({
  label = "Mô tả",
  placeholder = "Nhập mô tả...",
  value,
  onChange,
  className,
  rows = 4,
  name,
  required = false,
}: DescriptionFieldProps) {
  const heightClass = rows === 4 ? "h-28" : rows === 5 ? "h-36" : "h-28";
  
  return (
    <label className={`flex flex-col w-full ${className || ""}`}>
      <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">{label}</p>
      <textarea
        className={`form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark focus:border-primary ${heightClass} placeholder:text-text-muted-light p-[15px] text-base`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        name={name}
        required={required}
      />
    </label>
  );
}

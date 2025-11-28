"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
};

export default function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex w-full mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-white dark:text-text-light text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </button>
  );
}

"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-gray-200 dark:bg-gray-700 text-text-light dark:text-background-light hover:bg-gray-300 dark:hover:bg-gray-600",
  danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  ghost: "bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    "flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "w-auto",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-inherit">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-inherit">{icon}</span>
      )}
    </button>
  );
}

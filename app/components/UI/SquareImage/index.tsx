"use client";
import React from 'react';

type SquareImageProps = {
  src?: string | null;
  alt?: string;
  size?: number; // px width/height
  className?: string;
};

export default function SquareImage({ src, alt = "", size = 64, className = "" }: SquareImageProps) {
  const url = src && src.length > 0 ? src : "https://via.placeholder.com/300?text=No+Image";
  return (
    <div
      className={`rounded overflow-hidden bg-gray-100 flex-none min-w-0 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden
    >
      <div
        className="w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url('${url}')` }}
      />
    </div>
  );
}

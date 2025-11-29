"use client";
import React from "react";

type CurrentImageProps = {
  title?: string;
  imageUrl: string;
  alt?: string;
  className?: string;
};

export default function CurrentImage({
  title = "Ảnh hiện tại",
  imageUrl,
  alt = "Current image",
  className,
}: CurrentImageProps) {
  return (
    <div className={className}>
      <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">{title}</p>
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-full max-w-sm"
        aria-label={alt}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
    </div>
  );
}

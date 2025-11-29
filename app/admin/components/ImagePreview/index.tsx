"use client";
import React from "react";

type ImagePreviewProps = {
  title?: string;
  note?: string;
  imageUrl?: string | null;
  imageFile?: File | null;
  onPick: () => void;
  onClear?: () => void;
  showClear?: boolean;
};

export default function ImagePreview({
  title = "Hình ảnh món ăn (tỉ lệ 1:1)",
  note = "Ảnh hiển thị trong khung vuông để đảm bảo bố cục đồng nhất.",
  imageUrl,
  imageFile,
  onPick,
  onClear,
  showClear,
}: ImagePreviewProps) {
  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : imageUrl ?? null;

  return (
    <div className="lg:col-span-1 flex flex-col">
      <p className="text-text-light dark:text-background-light text-base font-medium pb-2">{title}</p>
      <div className="w-full max-w-sm">
        <div className="relative w-full aspect-square rounded-lg border-2 border-dashed border-border-light dark:border-primary/40 bg-background-light dark:bg-background-dark/50 overflow-hidden group">
          {previewUrl ? (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${previewUrl})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div>
                <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-primary/70">upload_file</span>
                <p className="mt-2 text-text-light dark:text-background-light text-base font-medium">Kéo & thả ảnh vào đây</p>
                <p className="text-sm text-text-muted-light dark:text-primary/70">Khuyến nghị: ảnh vuông (1:1)</p>
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-black/30 p-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white border border-white/40 rounded-lg hover:bg-white/10"
              type="button"
              onClick={onPick}
            >
              Chọn tệp
            </button>
            {showClear && onClear && (
              <button
                className="px-4 py-2 text-sm font-medium text-white border border-white/40 rounded-lg hover:bg-white/10"
                type="button"
                onClick={onClear}
              >
                Xóa ảnh
              </button>
            )}
          </div>
        </div>
        {imageFile && (
          <p className="mt-2 text-sm text-text-muted-light dark:text-primary/70 truncate">Đã chọn: {imageFile.name}</p>
        )}
        {note && (
          <p className="mt-1 text-xs text-text-muted-light dark:text-primary/70">{note}</p>
        )}
      </div>
    </div>
  );
}

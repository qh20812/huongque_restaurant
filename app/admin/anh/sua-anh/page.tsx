"use client";
import React, { useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ImagePreview from "../../components/ImagePreview";
import CurrentImage from "../../components/CurrentImage";
import DescriptionField from "../../components/DescriptionField";

type CategoryOption = "Ảnh món ăn" | "Ảnh không gian" | "Ảnh sự kiện";

export default function SuaAnh() {
  // Mock existing image data
  const existingImageUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXA8uI_rurFBooSfBz9wzPANhhSk7CWmIuL1UWVgCkHHtWgb6Xo3vgX_IUYEP98TLzw9wMpQdHTjN8e5W0U4ljpu5dRD0BGvCD5NG0Q6pdn3WSk2GfyOBZuPshUP5HiebOUXAMIABlEIjoMHMwAsEsEaPGp4bbmXw217IU8rVavvckjP0xDd4mikF8P8vaJLmj-HW398kq5_KbnIzp88zAxH7vhjgMSJgu6C2U0aiHtCdFhKcvTtgquojOnmSuFqpZQHaKA1oUa1c";
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(
    "Không gian mộc mạc, ấm cúng của nhà hàng Hương Quê với bàn ghế gỗ và đèn lồng tre, mang đậm chất miền Tây sông nước."
  );
  const [category, setCategory] = useState<CategoryOption>("Ảnh không gian");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setNewImageFile(file);
    const url = URL.createObjectURL(file);
    setNewImagePreview(url);
  };

  // Drag & drop can be added later at container level if needed

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    if (newImagePreview) URL.revokeObjectURL(newImagePreview);
    setNewImageFile(null);
    setNewImagePreview(null);
    window.history.back();
  };

  const handleUpdate = async () => {
    // TODO: Wire to API endpoint for updating image + metadata
    console.log({ newImageFile, description, category });
    alert("Đã cập nhật thông tin ảnh (demo)");
  };

  const breadcrumbs = [
    { label: "Quản lý ảnh", href: "/admin/anh" },
    { label: "Sửa thông tin ảnh" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <Breadcrumbs items={breadcrumbs} />
      <PageTitle
        title="Sửa thông tin ảnh"
        subtitle="Chỉnh sửa thông tin chi tiết cho ảnh đã chọn trong bộ sưu tập."
      />

      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* Current image */}
              <CurrentImage
                title="Ảnh hiện tại"
                imageUrl={existingImageUrl}
                alt="Ảnh hiện tại trong bộ sưu tập"
              />

              {/* Optional new upload */}
              <div className="flex flex-col">
                <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">Tải ảnh mới (tùy chọn)</p>
                <ImagePreview
                  title="Ảnh mới (tỉ lệ 1:1)"
                  note="Nếu tải ảnh mới, ảnh sẽ thay thế ảnh hiện tại."
                  imageUrl={newImagePreview}
                  imageFile={newImageFile}
                  onPick={handleChooseFile}
                  onClear={() => {
                    if (newImagePreview) URL.revokeObjectURL(newImagePreview);
                    setNewImageFile(null);
                    setNewImagePreview(null);
                  }}
                  showClear={!!newImagePreview || !!newImageFile}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFilesSelected(e.target.files)}
                />
              </div>
            </div>

            {/* Description */}
            <DescriptionField
              label="Mô tả ảnh"
              placeholder="Nhập mô tả cho ảnh..."
              value={description}
              onChange={setDescription}
            />

            {/* Category */}
            <label className="flex flex-col w-full max-w-sm">
              <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">Danh mục ảnh</p>
              <div className="relative">
                <select
                  className="form-select w-full rounded-lg text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark focus:border-primary h-14 px-[15px]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryOption)}
                >
                  <option>Ảnh món ăn</option>
                  <option>Ảnh không gian</option>
                  <option>Ảnh sự kiện</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
                  expand_more
                </span>
              </div>
            </label>
          </div>
          <div className="lg:col-span-1 hidden lg:flex" />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
          <Button variant="secondary" onClick={handleCancel}>
            Hủy
          </Button>
          <Button onClick={handleUpdate}>
            Cập nhật
          </Button>
        </div>
      </div>
    </div>
  );
}

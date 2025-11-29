"use client";
import React, { useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ImagePreview from "../../components/ImagePreview";
import DescriptionField from "../../components/DescriptionField";

type CategoryOption = "Ảnh món ăn" | "Ảnh không gian" | "Ảnh sự kiện";

export default function ThemAnhMoi() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<CategoryOption>("Ảnh món ăn");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  // Drag & drop can be added later at container level if needed

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    setDescription("");
    setCategory("Ảnh món ăn");
    window.history.back();
  };

  const handleSave = async () => {
    if (!imageFile) {
      alert("Vui lòng chọn ảnh trước khi lưu.");
      return;
    }
    // TODO: Wire to API endpoint for upload + metadata save
    console.log({ imageFile, description, category });
    alert("Đã lưu ảnh mới (demo)");
  };

  const breadcrumbs = [
    { label: "Quản lý ảnh", href: "/admin/anh" },
    { label: "Thêm ảnh mới" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <Breadcrumbs items={breadcrumbs} />
      <PageTitle
        title="Thêm ảnh mới"
        subtitle="Tải lên và điền thông tin chi tiết cho ảnh mới vào bộ sưu tập."
      />

      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Upload area using ImagePreview (1:1) */}
            <div className="flex flex-col">
              <ImagePreview
                title="Hình ảnh (tỉ lệ 1:1)"
                note="Khuyến nghị: ảnh vuông để hiển thị đồng nhất."
                imageUrl={imagePreview}
                imageFile={imageFile}
                onPick={handleChooseFile}
                onClear={() => {
                  if (imagePreview) URL.revokeObjectURL(imagePreview);
                  setImageFile(null);
                  setImagePreview(null);
                }}
                showClear={!!imagePreview || !!imageFile}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFilesSelected(e.target.files)}
              />
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
          <Button onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

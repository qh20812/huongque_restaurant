"use client";
import React, { useState } from "react";
import ImagePreview from "../../components/ImagePreview";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import DescriptionField from "../../components/DescriptionField";

export default function ThemMonAn() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("Khai vị");
  const [imageFile, setImageFile] = useState<File | null>(null);

  function handlePickFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0] ?? null;
      setImageFile(file ?? null);
    };
    input.click();
  }

  function handleCancel() {
    setName("");
    setDesc("");
    setPrice("");
    setCategory("Khai vị");
    setImageFile(null);
  }

  async function handleSave() {
    // Placeholder: wire up to API later
    console.log("Saving dish:", { name, desc, price, category, imageFile });
    alert("Lưu món ăn (demo)\nBạn có thể nối API sau.");
  }

  return (
    <div className="p-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý món ăn", href: "/admin/mon-an" },
          { label: "Thêm món mới", current: true },
        ]}
      />
      <PageTitle
        title="Thêm món ăn mới"
        subtitle="Điền thông tin chi tiết cho món ăn sẽ được thêm vào thực đơn."
      />

      {/* Form Section */}
      <div className="bg-surface-light dark:bg-background-dark/50 border border-border-light dark:border-primary/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-background-light text-base font-medium pb-2">Tên món</p>
              <input
                className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="Ví dụ: Lẩu cá linh bông điên điển"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <DescriptionField
              label="Mô tả chi tiết"
              placeholder="Mô tả nguyên liệu, hương vị đặc trưng của món ăn..."
              value={desc}
              onChange={setDesc}
              rows={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium pb-2">Giá tiền (VNĐ)</p>
                <input
                  className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Ví dụ: 250000"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium pb-2">Danh mục</p>
                <select
                  className="form-select h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark px-[15px] text-base text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Khai vị</option>
                  <option>Món chính</option>
                  <option>Tráng miệng</option>
                  <option>Set Menu</option>
                </select>
              </label>
            </div>
          </div>

          {/* Right column: reusable ImagePreview */}
          <ImagePreview
            title="Hình ảnh món ăn (tỉ lệ 1:1)"
            note="Ảnh sẽ được hiển thị trong khung vuông 1:1 để đảm bảo bố cục đồng nhất."
            imageFile={imageFile}
            onPick={handlePickFile}
            onClear={() => setImageFile(null)}
            showClear={!!imageFile}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-primary/20">
          <button
            className="flex items-center justify-center h-12 px-6 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-background-light text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
            type="button"
            onClick={handleCancel}
          >
            Hủy
          </button>
          <button
            className="flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white text-base font-medium hover:bg-primary/90"
            type="button"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

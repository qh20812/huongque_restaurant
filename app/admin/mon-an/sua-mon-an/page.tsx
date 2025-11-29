"use client";
import React, { useState } from "react";
import ImagePreview from "../../components/ImagePreview";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import DescriptionField from "../../components/DescriptionField";

export default function SuaMonAn() {
  // Demo prefilled values based on the provided HTML
  const [name, setName] = useState("Lẩu cá linh bông điên điển");
  const [desc, setDesc] = useState(
    "Món lẩu đặc sản miền Tây sông nước, với vị chua thanh của me, vị ngọt của cá linh non và hương thơm đặc trưng của bông điên điển. Nước lẩu đậm đà, ăn kèm bún tươi và rau sống."
  );
  const [price, setPrice] = useState<string>("250000");
  const [category, setCategory] = useState("Món chính");
  const [imageUrl, setImageUrl] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7wU7rYhC3b_xqJgA9uieORB25rmL9Ms4C1GO2dOWhiBfNOAb_J2SI-JkpRgWCnzTBHDoGuZTueAoUURHDvULmHtBjzgsBRFQWw8M4PrqzO6AwXxr4r2yZ8gVmh6Ga4v03iTM1uGfbas9NWYflVZlwgft0xOdpkDiNseAvpi9W68tK7ihV_SeQLzlxwv8KhhKOt_EVCcAK_ydhsrh9tUzIJTz07vNlpd3N_yKrWSpVMWS84N4qREzyZyr6PRGDZltp8J-diAQpze4"
  );

  function pickNewImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      }
    };
    input.click();
  }

  function handleCancel() {
    // In a real app, navigate back; here we simply no-op
    history.back();
  }

  async function handleUpdate() {
    // Placeholder for API integration
    console.log("Updating dish:", { name, desc, price, category, imageUrl });
    alert("Cập nhật món ăn (demo)\nBạn có thể nối API sau.");
  }

  return (
    <div className="p-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý món ăn", href: "/admin/mon-an" },
          { label: "Sửa món ăn", current: true },
        ]}
      />
      <PageTitle
        title="Sửa món ăn"
        subtitle="Chỉnh sửa thông tin chi tiết cho món ăn đã chọn."
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
            note="Ảnh hiển thị trong khung vuông để đảm bảo bố cục đồng nhất."
            imageUrl={imageUrl}
            onPick={pickNewImage}
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
            onClick={handleUpdate}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

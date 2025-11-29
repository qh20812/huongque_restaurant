"use client";
import React, { useState } from "react";
import Button from "../components/Button";

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  alt: string;
}

export default function QuanLyAnh() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả danh mục");

  // Demo data - same image repeated for demonstration
  const demoImageUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCOihLFLkgIQdns9vXNgqu4rHdtkKbK7iGK2PPqizibPrEpeWQZcHrZzJ50azVWy_J9owsB4ZSWDXCYva1-S2bI7U5O7OqtQXM8TKOtSU4rHJPNZ7xBP9PmHGy5bT_5jC6tGfY9wAIQivNwO4CvvFGxBG8yvLT9d9LTli0D5d2itsDZ9MV-IFkBXU2mbo8MDHQWfiEnXQ4poVz4bfCO-RHKVM5siZWK1hwuIruffW4EcxAd6u62UYXT93l5SMaSJLVfhIKZhYZLZao";

  const images: GalleryImage[] = Array.from({ length: 10 }, (_, i) => ({
    id: `img-${i + 1}`,
    url: demoImageUrl,
    category: i % 3 === 0 ? "Ảnh món ăn" : i % 3 === 1 ? "Ảnh không gian" : "Ảnh sự kiện",
    alt: `Gallery image ${i + 1}`,
  }));

  const handleAddNew = () => {
    alert("Chức năng thêm ảnh mới (coming soon)");
  };

  const handleView = (id: string) => {
    console.log("View image:", id);
    alert(`Xem chi tiết ảnh #${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit image:", id);
    alert(`Sửa thông tin ảnh #${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa ảnh #${id}?`)) {
      console.log("Delete image:", id);
      alert(`Đã xóa ảnh #${id}`);
    }
  };

  const filtered = images.filter((img) => {
    const byCat = categoryFilter === "Tất cả danh mục" ? true : img.category === categoryFilter;
    return byCat;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              placeholder="Tìm kiếm ảnh..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>Tất cả danh mục</option>
              <option>Ảnh món ăn</option>
              <option>Ảnh không gian</option>
              <option>Ảnh sự kiện</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              expand_more
            </span>
          </div>
        </div>
        <Button
          icon="add_photo_alternate"
          iconPosition="left"
          onClick={handleAddNew}
          className="w-full sm:w-auto"
        >
          Thêm ảnh mới
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filtered.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
          >
            <div
              className="aspect-square w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image.url}')` }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <div className="flex gap-2">
                <button
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  title="Xem chi tiết"
                  onClick={() => handleView(image.id)}
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  title="Sửa thông tin"
                  onClick={() => handleEdit(image.id)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-red-400 backdrop-blur-sm"
                  title="Xóa"
                  onClick={() => handleDelete(image.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

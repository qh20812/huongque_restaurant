"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import DescriptionField from "../../components/DescriptionField";
import InputField from "../../components/InputField";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function ThemMonAn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/admin/danh-muc')
      .then(res => res.json())
      .then(data => {
        setCategories(data.items || []);
        if (data.items?.length > 0) {
          setCategoryId(String(data.items[0].id));
        }
      })
      .catch(() => setError('Không thể tải danh mục'));
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    } else {
      setSlug('');
    }
  }, [name]);

  function handlePickFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Kích thước ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB');
          return;
        }

        setImageLoading(true);
        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          console.log('Base64 loaded, length:', base64String.length);
          setImageUrl(base64String);
          setImageLoading(false);
        };
        reader.onerror = () => {
          alert('Không thể đọc file ảnh');
          setImageLoading(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  function handleCancel() {
    router.push('/admin/mon-an');
  }

  async function handleSave() {
    // Validation
    if (!name.trim()) {
      alert('Vui lòng nhập tên món');
      return;
    }
    if (!slug.trim()) {
      alert('Slug không được để trống');
      return;
    }
    if (!categoryId) {
      alert('Vui lòng chọn danh mục');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Image is already in base64 format from handlePickFile
      const finalImageUrl = imageUrl || null;

      const res = await fetch('/api/admin/mon-an', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: desc.trim() || null,
          categoryId: Number(categoryId),
          imageUrl: finalImageUrl,
          isActive: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Tạo món ăn thất bại');
      }

      alert('Tạo món ăn thành công!');
      router.push('/admin/mon-an');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
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
            <InputField
              label="Tên món"
              placeholder="Ví dụ: Lẩu cá linh bông điên điển"
              value={name}
              onChange={setName}
              required
            />

            <InputField
              label="Slug (URL)"
              placeholder="Tự động tạo từ tên món"
              value={slug}
              onChange={setSlug}
              helperText="URL thân thiện được tạo tự động từ tên món"
            />

            <DescriptionField
              label="Mô tả chi tiết"
              placeholder="Mô tả nguyên liệu, hương vị đặc trưng của món ăn..."
              value={desc}
              onChange={setDesc}
              rows={5}
            />

            <label className="flex flex-col w-full">
                <p className="text-text-light dark:text-background-light text-base font-medium pb-2">Danh mục</p>
                <select
                  className="form-select h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark px-[15px] text-base text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>

            <InputField
              label="URL hình ảnh"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={setImageUrl}
              helperText="Hoặc chọn file ảnh bên phải (upload tự động sẽ được thêm sau)"
            />
          </div>

          {/* Right column: Image preview */}
          <div>
            <p className="text-text-light dark:text-background-light text-base font-medium mb-2">
              Hình ảnh món ăn (tỉ lệ 1:1)
            </p>
            {imageLoading && (
              <div className="w-full aspect-square rounded-lg border border-border-light dark:border-primary/20 mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-text-muted-light dark:text-text-muted-dark">Đang tải ảnh...</p>
              </div>
            )}
            {!imageLoading && imageUrl && (
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border-light dark:border-primary/20 mb-4">
                {imageUrl.startsWith('data:') ? (
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image 
                    src={imageUrl} 
                    alt="Preview" 
                    fill
                    className="object-cover" 
                  />
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handlePickFile}
              className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark text-text-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              {imageUrl ? 'Chọn ảnh khác' : 'Chọn ảnh từ máy'}
            </button>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="w-full mt-2 px-4 py-2 rounded-lg border border-red-500 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Xóa ảnh
              </button>
            )}
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">
              Ảnh sẽ được hiển thị trong khung vuông 1:1 để đảm bảo bố cục đồng nhất.
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-primary/20">
          <button
            className="flex items-center justify-center h-12 px-6 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-background-light text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            type="button"
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </button>
          <button
            className="flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white text-base font-medium hover:bg-primary/90 disabled:opacity-50"
            type="button"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "../../../components/Breadcrumb";
import PageTitle from "../../../components/PageTitle";
import DescriptionField from "../../../components/DescriptionField";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Dish = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  categoryId: number;
  imageUrl: string | null;
  isActive: boolean;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function SuaMonAn({ params }: PageProps) {
  const router = useRouter();
  const [dishId, setDishId] = useState<string>("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories and dish data
  useEffect(() => {
    async function fetchData() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        console.log('Dish ID from params:', id);
        console.log('dishId type:', typeof id);
        
        if (!id) {
          setError('Không tìm thấy ID món ăn');
          setLoading(false);
          return;
        }

        setDishId(id);

        const [categoriesData, dishData] = await Promise.all([
          fetch('/api/admin/danh-muc').then(res => res.json()),
          fetch(`/api/admin/mon-an/${id}`).then(res => res.json())
        ]);

        console.log('Categories data:', categoriesData);
        console.log('Dish data:', dishData);
        
        if (categoriesData.items) {
          setCategories(categoriesData.items);
        }
        
        if (dishData.success && dishData.data) {
          const dish = dishData.data;
          setName(dish.name);
          setSlug(dish.slug);
          setDesc(dish.description || '');
          setPrice(dish.price?.toString() || '');
          setCategoryId(dish.categoryId.toString());
          setImageUrl(dish.imageUrl || '');
        } else {
          console.error('Invalid dish data structure:', dishData);
          throw new Error(dishData.error || 'Không tìm thấy món ăn');
        }
      } catch (err: any) {
        console.error('Error fetching dish:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params]);

  // Auto-generate slug from name if user changes name
  useEffect(() => {
    if (name && !slug) {
      const generatedSlug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [name, slug]);

  function pickNewImage() {
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
        // Convert to base64 for preview and storage
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          console.log('Base64 loaded, length:', base64String.length);
          setNewImageUrl(base64String);
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

  async function handleUpdate() {
    if (!dishId) {
      alert('Không tìm thấy ID món ăn');
      return;
    }

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
    if (!price || isNaN(Number(price))) {
      alert('Vui lòng nhập giá hợp lệ');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // TODO: Implement image upload to cloud storage
      const finalImageUrl = newImageUrl || imageUrl;

      const res = await fetch(`/api/admin/mon-an/${dishId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: desc.trim() || null,
          categoryId: Number(categoryId),
          price: Number(price),
          imageUrl: finalImageUrl || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Cập nhật món ăn thất bại');
      }

      alert('Cập nhật món ăn thành công!');
      router.push('/admin/mon-an');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(message);
      alert(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="text-center py-12">
          <p className="text-text-muted-light dark:text-text-muted-dark">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error && !name) {
    return (
      <div className="p-8 space-y-6">
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => router.push('/admin/mon-an')}
            className="mt-4 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
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

            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-background-light text-base font-medium pb-2">Slug (URL)</p>
              <input
                className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="Tự động tạo từ tên món"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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
            </div>

            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-background-light text-base font-medium pb-2">URL hình ảnh mới (tùy chọn)</p>
              <input
                className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="https://example.com/new-image.jpg"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">Để trống nếu giữ nguyên ảnh hiện tại</p>
            </label>
          </div>

          {/* Right column: Image preview */}
          <div>
            <div className="mb-4">
              <p className="text-text-light dark:text-background-light text-base font-medium mb-2">Hình ảnh hiện tại</p>
              {imageUrl && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border-light dark:border-primary/20">
                  {imageUrl.startsWith('data:') ? (
                    <img 
                      src={imageUrl} 
                      alt="Current" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={imageUrl} 
                      alt="Current" 
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              )}
            </div>
            
            {imageLoading && (
              <div className="mb-4">
                <p className="text-text-light dark:text-background-light text-base font-medium mb-2">Ảnh mới</p>
                <div className="w-full aspect-square rounded-lg border border-border-light dark:border-primary/20 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <p className="text-text-muted-light dark:text-text-muted-dark">Đang tải ảnh...</p>
                </div>
              </div>
            )}
            
            {!imageLoading && newImageUrl && (
              <div>
                <p className="text-text-light dark:text-background-light text-base font-medium mb-2">Ảnh mới</p>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border-light dark:border-primary/20">
                  {newImageUrl.startsWith('data:') ? (
                    <img 
                      src={newImageUrl} 
                      alt="New preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={newImageUrl} 
                      alt="New preview" 
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            )}
            
            <button
              type="button"
              onClick={pickNewImage}
              className="mt-4 w-full px-4 py-2 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark text-text-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Chọn ảnh mới
            </button>
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
            disabled={saving}
          >
            Hủy
          </button>
          <button
            className="flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white text-base font-medium hover:bg-primary/90 disabled:opacity-50"
            type="button"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </div>
      </div>
    </div>
  );
}

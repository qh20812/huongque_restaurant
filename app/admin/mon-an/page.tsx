"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../components/Button";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Dish = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  category: Category | null;
};

export default function QuanLyMonAn() {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState("tat-ca-danh-muc");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    fetch('/api/admin/danh-muc')
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setCategories(data.items);
        }
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  // Fetch dishes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (categorySlug !== 'tat-ca-danh-muc') params.set('category', categorySlug);
    
    fetch(`/api/admin/mon-an?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setDishes(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, categorySlug]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa món ăn này?')) return;

    try {
      const res = await fetch(`/api/admin/mon-an/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      // Refresh list
      setDishes(dishes.filter(d => d.id !== id));
    } catch {
      alert('Xóa món ăn thất bại');
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Chưa có giá';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getCategoryBadgeClass = (categoryName: string | undefined) => {
    if (categoryName === "Khai vị") {
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
    } else if (categoryName === "Tráng miệng") {
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    }
    return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              placeholder="Tìm kiếm món ăn..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
            >
              <option value="tat-ca-danh-muc">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              expand_more
            </span>
          </div>
        </div>
        <Link href="/admin/mon-an/them-mon-an">
          <Button icon="add" iconPosition="left" className="w-full sm:w-auto">
            Thêm món mới
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/5 dark:bg-white/5">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Tên món</th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Mô tả</th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Giá</th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Danh mục</th>
                <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted-light dark:text-text-muted-dark">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-red-600 dark:text-red-400">
                    {error}
                  </td>
                </tr>
              ) : dishes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted-light dark:text-text-muted-dark">
                    Không tìm thấy món ăn nào
                  </td>
                </tr>
              ) : (
                dishes.map((dish) => (
                  <tr key={dish.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12"
                          style={{ backgroundImage: `url('${dish.imageUrl || '/placeholder.jpg'}')` }}
                        />
                        <div>
                          <p className="font-medium text-text-light dark:text-text-dark">{dish.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted-light dark:text-text-muted-dark max-w-xs truncate">
                      {dish.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-light dark:text-text-dark">
                      {formatPrice(dish.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ` +
                          getCategoryBadgeClass(dish.category?.name)
                        }
                      >
                        {dish.category?.name || 'Chưa phân loại'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/mon-an/sua-mon-an/${dish.id}`}>
                          <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted-light dark:text-text-muted-dark" aria-label="Sửa">
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(dish.id)}
                          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-red-600 dark:text-red-400" 
                          aria-label="Xóa"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

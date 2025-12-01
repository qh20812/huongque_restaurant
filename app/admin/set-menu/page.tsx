"use client";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@/app/admin/components/Button";
import DataTable from "@/app/admin/components/DataTable";
import { useRouter } from "next/navigation";

type SetMenu = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  servesMin: number | null;
  servesMax: number | null;
  isActive: boolean;
};

export default function QuanLySetMenu() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const [items, setItems] = useState<SetMenu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchList() {
      try {
        setLoading(true);
        setError("");
        const statusParam = status === 'Đang hoạt động' ? 'active' : status === 'Không hoạt động' ? 'inactive' : 'all';
        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        if (statusParam !== 'all') params.set('status', statusParam);
        params.set('page', '1');
        params.set('pageSize', '50');
        const res = await fetch(`/api/admin/set-menu?${params.toString()}`, { signal: controller.signal });
        const data = await res.json();
        if (!res.ok || !data?.success) throw new Error(data?.error || 'Tải dữ liệu thất bại');
        setItems(data.data.items || []);
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'name' in err && (err as { name?: string }).name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }
    fetchList();
    return () => controller.abort();
  }, [query, status]);

  const filtered = useMemo(() => items, [items]);

  function formatPriceVND(v: number) {
    try {
      return new Intl.NumberFormat('vi-VN').format(v) + 'đ';
    } catch {
      return `${v}đ`;
    }
  }

  function servesLabel(min: number | null, max: number | null) {
    if (min && max) return `${min} - ${max} người`;
    if (min) return `Từ ${min} người`;
    if (max) return `Tối đa ${max} người`;
    return '-';
  }

  async function handleDelete(id: number) {
    if (!confirm('Bạn có chắc chắn muốn xóa set menu này?')) return;
    try {
      const res = await fetch(`/api/admin/set-menu/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Xóa thất bại');
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}
      {loading && (
        <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 text-text-muted-light dark:text-text-muted-dark text-sm">
          Đang tải dữ liệu...
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              placeholder="Tìm kiếm set menu..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Tất cả trạng thái</option>
              <option>Đang hoạt động</option>
              <option>Không hoạt động</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              expand_more
            </span>
          </div>
        </div>
        <Button
          icon="add"
          iconPosition="left"
          className="w-full sm:w-auto"
          onClick={() => router.push('/admin/set-menu/them-set-menu-moi')}
        >
          Thêm Set Menu mới
        </Button>
      </div>

      <DataTable
        items={filtered}
        columns={[
          {
            header: "Tên Set Menu",
            render: (setMenu: SetMenu) => (
              <p className="font-medium text-text-light dark:text-text-dark">
                {setMenu.name}
              </p>
            ),
          },
          {
            header: "Mô tả",
            render: (setMenu: SetMenu) => (
              <span className="text-sm text-text-muted-light dark:text-text-muted-dark max-w-xs truncate block">
                {setMenu.description || "-"}
              </span>
            ),
          },
          {
            header: "Giá",
            render: (setMenu: SetMenu) => (
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                {formatPriceVND(setMenu.price)}
              </span>
            ),
          },
          {
            header: "Phục vụ",
            render: (setMenu: SetMenu) => (
              <span className="text-sm text-text-light dark:text-text-dark">
                {servesLabel(setMenu.servesMin, setMenu.servesMax)}
              </span>
            ),
          },
          {
            header: "Trạng thái",
            render: (setMenu: SetMenu) => (
              <span
                className={
                  `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ` +
                  (setMenu.isActive
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200")
                }
              >
                {setMenu.isActive ? "Đang hoạt động" : "Không hoạt động"}
              </span>
            ),
          },
        ]}
        loading={loading}
        error={error}
        buildEditHref={(id) => `/admin/set-menu/sua/${id}`}
        onDelete={handleDelete}
        emptyMessage="Không tìm thấy set menu nào"
      />
    </div>
  );
}

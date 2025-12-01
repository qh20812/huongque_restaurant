"use client";

import React from "react";
import Link from "next/link";

type TableColumn<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T extends { id: number }> = {
  items: T[];
  columns: TableColumn<T>[];
  loading: boolean;
  error: string | null;
  buildEditHref: (id: number) => string;
  onDelete: (id: number) => void;
  emptyMessage?: string;
};

export default function DataTable<T extends { id: number }>({
  items,
  columns,
  loading,
  error,
  buildEditHref,
  onDelete,
  emptyMessage = "Không tìm thấy dữ liệu",
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-text-muted-light dark:text-text-muted-dark">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-red-600 dark:text-red-400">
                  {error}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-text-muted-light dark:text-text-muted-dark">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-6 py-4">
                      {col.render(item)}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={buildEditHref(item.id)}>
                        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted-light dark:text-text-muted-dark" aria-label="Sửa">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </Link>
                      <button
                        onClick={() => onDelete(item.id)}
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
  );
}

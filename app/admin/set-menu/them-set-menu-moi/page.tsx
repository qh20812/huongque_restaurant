"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/admin/components/Button";
import InputField from "@/app/admin/components/InputField";
import DescriptionField from "@/app/admin/components/DescriptionField";
import Breadcrumbs from "@/app/admin/components/Breadcrumb";

type DishOption = { id: number; name: string; categoryId: number; categoryName: string };

type DishItem = {
  dishId: number;
  dishName: string;
  notes: string;
  quantity: number;
};

type Section = {
  id: string;
  name: string;
  order: number;
  dishes: DishItem[];
};

export default function ThemSetMenuMoi() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [servesMin, setServesMin] = useState("");
  const [servesMax, setServesMax] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [slugEdited, setSlugEdited] = useState(false);

  const [sections, setSections] = useState<Section[]>([
    { id: "1", name: "Khai vị", order: 1, dishes: [] },
    { id: "2", name: "Món chính", order: 2, dishes: [] },
    { id: "3", name: "Tráng miệng", order: 3, dishes: [] },
  ]);

  const [availableDishes, setAvailableDishes] = useState<DishOption[]>([]);
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from name (if slug empty)
  useEffect(() => {
    if (!name) return;
    if (slugEdited) return;
    const generated = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  }, [name, slugEdited]);

  // Fetch dishes for dropdown
  useEffect(() => {
    const controller = new AbortController();
    async function fetchDishes() {
      try {
        const res = await fetch(`/api/admin/mon-an?page=1&pageSize=200`, { signal: controller.signal });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Không thể tải danh sách món ăn");
        const items = data?.data?.items ?? data?.items ?? [];
        setAvailableDishes(
          items.map((d: { id: number; name: string; category?: { id: number; name: string } }) => ({
            id: d.id,
            name: d.name,
            categoryId: d.category ? d.category.id : 0,
            categoryName: d.category ? d.category.name : "",
          }))
        );
      } catch (err) {
        if (err && typeof err === 'object' && 'name' in err && (err as { name?: string }).name === 'AbortError') return;
        console.error("Failed to fetch dishes:", err);
      }
    }
    fetchDishes();
    return () => controller.abort();
  }, []);

  const addDishToSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              dishes: [...section.dishes, { dishId: 0, dishName: "", notes: "", quantity: 1 }],
            }
          : section
      )
    );
  };

  const removeDishFromSection = (sectionId: string, dishIndex: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, dishes: section.dishes.filter((_, i) => i !== dishIndex) }
          : section
      )
    );
  };

  const updateDish = (sectionId: string, dishIndex: number, field: keyof DishItem, value: unknown) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const nextDishes = section.dishes.map((dish, i) => {
          if (i !== dishIndex) return dish;
          if (field === "dishId") {
            const id = Number(value) || 0;
            const found = availableDishes.find((d) => d.id === id);
            return { ...dish, dishId: id, dishName: found?.name || "" };
          }
          return { ...dish, [field]: value } as DishItem;
        });
        return { ...section, dishes: nextDishes };
      })
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return alert("Vui lòng nhập tên set menu");
    if (!slug.trim()) return alert("Slug không được để trống");
    if (!price || isNaN(Number(price))) return alert("Vui lòng nhập giá hợp lệ");

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        price: Number(price),
        servesMin: servesMin ? Number(servesMin) : null,
        servesMax: servesMax ? Number(servesMax) : null,
        isActive,
        sections: sections.map((s) => ({
          name: s.name,
          order: s.order,
          items: s.dishes
            .filter((d) => d.dishId)
            .map((d, idx) => ({
              dishId: d.dishId,
              notes: d.notes || null,
              quantity: d.quantity || null,
              order: idx + 1,
            })),
        })),
      };

      const res = await fetch("/api/admin/set-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || "Tạo set menu thất bại");

      alert("Tạo set menu thành công!");
      router.push("/admin/set-menu");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý Set Menu", href: "/admin/set-menu" },
          { label: "Thêm Set Menu mới", current: true },
        ]}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Thêm Set Menu mới</h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Tạo set menu mới với các món ăn đi kèm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Thông tin cơ bản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField
                label="Tên Set Menu"
                value={name}
                onChange={setName}
                placeholder="Ví dụ: Set Menu Sum Vầy"
                required
              />
            </div>

            <div className="md:col-span-2">
              <InputField
                label="Slug"
                value={slug}
                onChange={(value) => {
                  setSlugEdited(true);
                  setSlug(value);
                }}
                placeholder="Tự tạo từ tên, không điều chỉnh được"
                helperText="URL thân thiện, tự động tạo từ tên"
                disabled
              />
            </div>

            <div className="md:col-span-2">
              <DescriptionField
                label="Mô tả"
                value={description}
                onChange={setDescription}
                placeholder="Mô tả ngắn gọn về set menu..."
                rows={4}
              />
            </div>

            <div>
              <InputField
                label="Giá (VNĐ)"
                type="number"
                value={price}
                onChange={setPrice}
                placeholder="899000"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Phục vụ tối thiểu"
                  type="number"
                  value={servesMin}
                  onChange={setServesMin}
                  placeholder="4"
                />
              </div>
              <div>
                <InputField
                  label="Phục vụ tối đa"
                  type="number"
                  value={servesMax}
                  onChange={setServesMax}
                  placeholder="6"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-light dark:text-text-dark">Đang hoạt động</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Các phần món ăn</h3>

          {sections.map((section) => (
            <div key={section.id} className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-text-light dark:text-text-dark">{section.name}</h4>
                {(() => {
                  const hasOptions = availableDishes.some((d) => d.categoryName === section.name);
                  return (
                    <button
                      type="button"
                      onClick={() => hasOptions && addDishToSection(section.id)}
                      disabled={!hasOptions}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                        hasOptions
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                  <span className="material-symbols-outlined text-base">add</span>
                  Thêm món
                    </button>
                  );
                })()}
              </div>

              {section.dishes.length === 0 ? (
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">Chưa có món ăn nào. Nhấn Thêm món để bắt đầu.</p>
              ) : (
                <div className="space-y-3">
                  {section.dishes.map((dish, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 rounded-lg bg-background-light dark:bg-background-dark">
                      <div className="md:col-span-5">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Món ăn</label>
                        {(() => {
                          const filtered = availableDishes.filter((d) => d.categoryName === section.name);
                          const hasOptions = filtered.length > 0;
                          return (
                            <>
                              <select
                                value={dish.dishId}
                                onChange={(e) => updateDish(section.id, index, "dishId", e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                                disabled={!hasOptions}
                              >
                                <option value="">
                                  {hasOptions ? "Chọn món ăn..." : "Không có món thuộc danh mục này"}
                                </option>
                                {filtered.map((d) => (
                                  <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                              </select>
                              {!hasOptions && (
                                <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                                  Danh mục &quot;{section.name}&quot; hiện chưa có món ăn. Thêm món ở trang quản lý món ăn trước nhé.
                                </p>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Ghi chú</label>
                        <input
                          type="text"
                          value={dish.notes}
                          onChange={(e) => updateDish(section.id, index, "notes", e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                          placeholder="Ghi chú (tùy chọn)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Số lượng</label>
                        <input
                          type="number"
                          value={dish.quantity}
                          onChange={(e) => updateDish(section.id, index, "quantity", Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                          min={1}
                        />
                      </div>

                      <div className="md:col-span-1 flex items-end">
                        <button
                          type="button"
                          onClick={() => removeDishFromSection(section.id, index)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                          aria-label="Xóa món"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={() => window.history.back()}>
            Hủy
          </Button>
          <Button type="submit" icon="save" iconPosition="left" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu Set Menu"}
          </Button>
        </div>
      </form>
    </div>
  );
}

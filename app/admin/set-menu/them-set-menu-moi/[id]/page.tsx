"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [servesMin, setServesMin] = useState("");
  const [servesMax, setServesMax] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  const [sections, setSections] = useState<Section[]>([
    { id: "1", name: "Khai vị", order: 1, dishes: [] },
    { id: "2", name: "Món chính", order: 2, dishes: [] },
    { id: "3", name: "Tráng miệng", order: 3, dishes: [] },
  ]);

  // Sample dishes for dropdown (would come from API)
  const availableDishes = [
    { id: 1, name: "Canh chua cá lóc", category: "Món chính" },
    { id: 2, name: "Cá kho tộ", category: "Món chính" },
    { id: 3, name: "Lẩu mắm", category: "Món chính" },
    { id: 4, name: "Gỏi cuốn tôm thịt", category: "Khai vị" },
    { id: 5, name: "Bánh xèo", category: "Khai vị" },
    { id: 6, name: "Chè bà ba", category: "Tráng miệng" },
  ];

  const addDishToSection = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          dishes: [...section.dishes, { dishId: 0, dishName: "", notes: "", quantity: 1 }]
        };
      }
      return section;
    }));
  };

  const removeDishFromSection = (sectionId: string, dishIndex: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          dishes: section.dishes.filter((_, i) => i !== dishIndex)
        };
      }
      return section;
    }));
  };

  const updateDish = (sectionId: string, dishIndex: number, field: keyof DishItem, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          dishes: section.dishes.map((dish, i) => {
            if (i === dishIndex) {
              if (field === 'dishId') {
                const selectedDish = availableDishes.find(d => d.id === Number(value));
                return { ...dish, dishId: Number(value), dishName: selectedDish?.name || "" };
              }
              return { ...dish, [field]: value };
            }
            return dish;
          })
        };
      }
      return section;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    console.log({ name, description, price, servesMin, servesMax, isActive, sections });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            Thêm Set Menu mới
          </h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
            Tạo set menu mới với các món ăn đi kèm
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">
            Thông tin cơ bản
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Tên Set Menu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                placeholder="Ví dụ: Set Menu Sum Vầy"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                placeholder="Mô tả ngắn gọn về set menu..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Giá (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                placeholder="899000"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Phục vụ tối thiểu
                </label>
                <input
                  type="number"
                  value={servesMin}
                  onChange={(e) => setServesMin(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                  placeholder="4"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Phục vụ tối đa
                </label>
                <input
                  type="number"
                  value={servesMax}
                  onChange={(e) => setServesMax(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                  placeholder="6"
                  min="1"
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
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  Đang hoạt động
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Sections with Dishes */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
            Các phần món ăn
          </h3>
          
          {sections.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-text-light dark:text-text-dark">
                  {section.name}
                </h4>
                <button
                  type="button"
                  onClick={() => addDishToSection(section.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Thêm món
                </button>
              </div>

              {section.dishes.length === 0 ? (
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">
                  Chưa có món ăn nào. Nhấn Thêm món để bắt đầu.
                </p>
              ) : (
                <div className="space-y-3">
                  {section.dishes.map((dish, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 rounded-lg bg-background-light dark:bg-background-dark"
                    >
                      <div className="md:col-span-5">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                          Món ăn
                        </label>
                        <select
                          value={dish.dishId}
                          onChange={(e) => updateDish(section.id, index, 'dishId', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                        >
                          <option value="">Chọn món ăn...</option>
                          {availableDishes.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                          Ghi chú
                        </label>
                        <input
                          type="text"
                          value={dish.notes}
                          onChange={(e) => updateDish(section.id, index, 'notes', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                          placeholder="Ghi chú (tùy chọn)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                          Số lượng
                        </label>
                        <input
                          type="number"
                          value={dish.quantity}
                          onChange={(e) => updateDish(section.id, index, 'quantity', Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary"
                          min="1"
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

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Hủy
          </Button>
          <Button type="submit" icon="save" iconPosition="left">
            Lưu Set Menu
          </Button>
        </div>
      </form>
    </div>
  );
}

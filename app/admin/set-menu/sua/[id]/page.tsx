"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/admin/components/Button";
import InputField from "@/app/admin/components/InputField";
import DescriptionField from "@/app/admin/components/DescriptionField";
import Breadcrumbs from "@/app/admin/components/Breadcrumb";

type DishItem = {
  id: string;
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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function SuaSetMenu({ params }: PageProps) {
  const router = useRouter();
  const [setMenuId, setSetMenuId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [servesMin, setServesMin] = useState("");
  const [servesMax, setServesMax] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Fetch set menu data
  useEffect(() => {
    async function fetchData() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        if (!id) {
          alert('Không tìm thấy ID set menu');
          setLoading(false);
          return;
        }

        setSetMenuId(id);

        const response = await fetch(`/api/admin/set-menu/${id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const setMenu = data.data;
          setName(setMenu.name);
          setSlug(setMenu.slug);
          setDescription(setMenu.description || '');
          setPrice(setMenu.price?.toString() || '');
          setServesMin(setMenu.servesMin?.toString() || '');
          setServesMax(setMenu.servesMax?.toString() || '');
          setIsActive(setMenu.isActive);
          
          // TODO: Load sections if needed
        } else {
          throw new Error(data.error || 'Không tìm thấy set menu');
        }
      } catch (err: any) {
        console.error('Error fetching set menu:', err);
        alert(err.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params]);

  // slug is computed on the fly from name when not manually edited

  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Khai vị",
      order: 1,
      dishes: [
        {
          id: "d1",
          dishId: 2,
          dishName: "Gỏi bồn bồn tôm thịt",
          notes: "Thêm đậu phộng",
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      name: "Món chính",
      order: 2,
      dishes: [
        {
          id: "d2",
          dishId: 3,
          dishName: "Lẩu cá kèo lá giang",
          notes: "Nhiều rau",
          quantity: 1,
        },
        {
          id: "d3",
          dishId: 7,
          dishName: "Bún tươi",
          notes: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      name: "Tráng miệng",
      order: 3,
      dishes: [
        {
          id: "d4",
          dishId: 6,
          dishName: "Trái cây theo mùa",
          notes: "",
          quantity: 1,
        },
      ],
    },
  ]);

  // Sample dishes for dropdown (would come from API)
  const availableDishes = [
    { id: 1, name: "Gỏi cuốn tôm thịt", category: "Khai vị" },
    { id: 2, name: "Gỏi bồn bồn tôm thịt", category: "Khai vị" },
    { id: 3, name: "Lẩu cá kèo lá giang", category: "Món chính" },
    { id: 4, name: "Lẩu mắm cá linh bông điên điển", category: "Món chính" },
    { id: 5, name: "Cá lóc nướng trui", category: "Món chính" },
    { id: 6, name: "Trái cây theo mùa", category: "Tráng miệng" },
    { id: 7, name: "Bún tươi", category: "Món chính" },
    { id: 8, name: "Cơm trắng", category: "Món chính" },
    { id: 9, name: "Chả giò rế", category: "Khai vị" },
    { id: 10, name: "Gỏi ngó sen tai heo", category: "Khai vị" },
    { id: 11, name: "Chè bà ba", category: "Tráng miệng" },
    { id: 12, name: "Bánh bò thốt nốt", category: "Tráng miệng" },
    { id: 13, name: "Gà hấp lá chúc", category: "Món chính" },
  ];

  const addDishToSection = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            dishes: [
              ...section.dishes,
              {
                id: `d${Date.now()}`,
                dishId: 0,
                dishName: "",
                notes: "",
                quantity: 1,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const removeDishFromSection = (sectionId: string, dishId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            dishes: section.dishes.filter((d) => d.id !== dishId),
          };
        }
        return section;
      })
    );
  };

  const updateDish = (
    sectionId: string,
    dishId: string,
    field: keyof DishItem,
    value: string | number
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            dishes: section.dishes.map((dish) => {
              if (dish.id === dishId) {
                if (field === "dishId") {
                  const selectedDish = availableDishes.find(
                    (d) => d.id === Number(value)
                  );
                  return {
                    ...dish,
                    dishId: Number(value),
                    dishName: selectedDish?.name || "",
                  };
                }
                return { ...dish, [field]: value };
              }
              return dish;
            }),
          };
        }
        return section;
      })
    );
  };

  const addNewSection = () => {
    const newSection: Section = {
      id: `s${Date.now()}`,
      name: "Section mới",
      order: sections.length + 1,
      dishes: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSectionName = (sectionId: string, newName: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!setMenuId) {
      alert('Không tìm thấy ID set menu');
      return;
    }

    if (!name.trim()) {
      alert('Vui lòng nhập tên set menu');
      return;
    }

    setSaving(true);

    try {
      const finalSlug = slugEdited
        ? slug
        : name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

      const response = await fetch(`/api/admin/set-menu/${setMenuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: finalSlug.trim(),
          description: description.trim() || null,
          price: price ? Number(price) : null,
          servesMin: servesMin ? Number(servesMin) : null,
          servesMax: servesMax ? Number(servesMax) : null,
          isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Cập nhật set menu thất bại');
      }

      alert('Cập nhật set menu thành công!');
      router.push('/admin/set-menu');
    } catch (err: any) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      alert(message);
      console.error('Error updating set menu:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="text-center py-12">
          <p className="text-text-muted-light dark:text-text-muted-dark">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Quản lý Set Menu", href: "/admin/set-menu" },
          { label: "Sửa Set Menu", current: true },
        ]}
      />

      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
            Sửa Set Menu
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">
            Chỉnh sửa thông tin chi tiết cho set menu đã chọn.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8"
      >
        <div className="flex flex-col gap-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <DescriptionField
            label="Mô tả"
            value={description}
            onChange={setDescription}
            placeholder="Mô tả chi tiết về set menu..."
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Status */}
          <div>
            <label className="flex flex-col w-full">
              <span className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">
                Trạng thái
              </span>
              <select
                className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-text-muted-light px-[15px] text-base font-normal leading-normal"
                value={isActive ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Đang hoạt động</option>
                <option value="false">Tạm ẩn</option>
              </select>
            </label>
          </div>

          {/* Sections with Dishes */}
          <div className="pt-6 border-t border-border-light dark:border-border-dark flex flex-col gap-6">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Các món trong Set Menu
            </h3>

            {sections.map((section) => (
              <div
                key={section.id}
                className="flex flex-col gap-6 p-4 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark/30"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) =>
                      updateSectionName(section.id, e.target.value)
                    }
                    className="text-lg font-semibold text-primary dark:text-primary/90 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                  />
                </div>

                <div className="space-y-4">
                  {section.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center"
                    >
                      <select
                        className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 placeholder:text-text-muted-light px-3 text-sm font-normal leading-normal"
                        value={dish.dishId}
                        onChange={(e) =>
                          updateDish(
                            section.id,
                            dish.id,
                            "dishId",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Chọn món ăn...</option>
                        {availableDishes.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <input
                        className="form-input flex w-20 min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 placeholder:text-text-muted-light px-3 text-sm font-normal leading-normal text-center"
                        placeholder="SL"
                        type="number"
                        value={dish.quantity}
                        onChange={(e) =>
                          updateDish(
                            section.id,
                            dish.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        min="1"
                      />
                      <input
                        className="form-input flex w-48 min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 placeholder:text-text-muted-light px-3 text-sm font-normal leading-normal"
                        placeholder="Ghi chú"
                        type="text"
                        value={dish.notes}
                        onChange={(e) =>
                          updateDish(
                            section.id,
                            dish.id,
                            "notes",
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="flex items-center justify-center size-10 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                        type="button"
                        onClick={() =>
                          removeDishFromSection(section.id, dish.id)
                        }
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 self-start px-4 py-2 text-sm font-medium text-primary dark:text-primary border border-primary rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
                  type="button"
                  onClick={() => addDishToSection(section.id)}
                >
                  <span className="material-symbols-outlined">add</span>
                  <span>Thêm món</span>
                </button>
              </div>
            ))}

            <button
              className="flex items-center gap-2 self-start px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark/50 border border-border-light dark:border-border-dark rounded-lg hover:bg-gray-100 dark:hover:bg-primary/10"
              type="button"
              onClick={addNewSection}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Thêm Section mới</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/admin/set-menu')}
            disabled={saving}
          >
            Hủy
          </Button>
          <Button type="submit" icon="save" iconPosition="left" disabled={saving}>
            {saving ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </div>
      </form>
    </div>
  );
}

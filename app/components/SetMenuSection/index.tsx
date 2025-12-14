"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Dish {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  category: {
    name: string;
  };
}

interface SetMenuDish {
  id: number;
  notes: string | null;
  quantity: number | null;
  order: number;
  dish: Dish;
}

interface SetMenuSection {
  id: number;
  name: string;
  order: number;
  items: SetMenuDish[];
}

interface SetMenu {
  id: number;
  name: string;
  description: string | null;
  price: number;
  servesMin: number | null;
  servesMax: number | null;
  sections: SetMenuSection[];
}

export default function SetMenuSection() {
  const [setMenus, setSetMenus] = useState<SetMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSetMenus();
  }, []);

  const fetchSetMenus = async () => {
    try {
      const response = await fetch("/api/set-menu");
      const data = await response.json();

      if (data.success) {
        setSetMenus(data.data);
      }
    } catch (error) {
      console.error("Error fetching set menus:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <section className="px-4 py-16 sm:px-10 bg-primary">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }
  if (setMenus.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-10 bg-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[#1b140d] text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
            Thực đơn Set Menu Hương Quê
          </h2>
          <p className="mt-8 text-[#9a734c] text-lg">
            Hiện tại chưa có set menu nào được công bố.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-10 bg-primary/5" id="set-menu">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
            Thực đơn Set Menu Hương Quê
          </h2>
          <p className="mt-4 text-[#9a734c] text-lg max-w-2xl mx-auto">
            Trải nghiệm ẩm thực tinh túy với set menu đặc biệt, hội tụ đầy đủ
            các món ngon đặc sắc của Hương Quê.
          </p>
        </div>

        {/* Set Menus */}
        <div className="space-y-8">
          {setMenus.map((setMenu) => (
            <div
              key={setMenu.id}
              className="border-2 border-[#ec7f13] rounded-xl p-6 sm:p-8 bg-primary/5 shadow-lg"
            >
              {/* Set Menu Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-[#ec7f13] text-3xl font-bold tracking-tight">
                    {setMenu.name}
                  </h3>
                  {setMenu.description && (
                    <p className="text-[#9a734c] text-sm mt-2">
                      {setMenu.description}
                    </p>
                  )}
                  {(setMenu.servesMin || setMenu.servesMax) && (
                    <p className="text-[#9a734c] text-sm mt-1">
                      Phục vụ: {setMenu.servesMin}
                      {setMenu.servesMax &&
                      setMenu.servesMax !== setMenu.servesMin
                        ? ` - ${setMenu.servesMax}`
                        : ""}{" "}
                      người
                    </p>
                  )}
                </div>
                <p className="text-white text-2xl font-black bg-[#ec7f13]/20 px-4 py-2 rounded-lg whitespace-nowrap">
                  {formatPrice(setMenu.price)}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {setMenu.sections.map((section) => (
                  <div key={section.id}>
                    <h4 className="text-white text-xl font-bold leading-tight tracking-tight mb-6 border-b-2 border-[#e7dbcf] pb-3">
                      {section.name}
                    </h4>

                    {/* Dishes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-6"
                        >
                          {/* Dish Image */}
                          <div className="w-full sm:w-32 h-32 flex-shrink-0">
                            {item.dish.imageUrl ? (
                              <div className="relative w-full h-full rounded-md overflow-hidden">
                                <Image
                                  src={item.dish.imageUrl}
                                  alt={item.dish.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, 128px"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-gray-400 text-sm">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Dish Info */}
                          <div className="flex flex-col">
                            <h5 className="text-white text-lg font-bold">
                              {item.dish.name}
                              {item.quantity && item.quantity > 1 && (
                                <span className="text-sm text-[#9a734c] ml-2">
                                  (x{item.quantity})
                                </span>
                              )}
                            </h5>
                            {item.dish.description && (
                              <p className="text-[#9a734c] text-sm mt-2 flex-grow">
                                {item.dish.description}
                              </p>
                            )}
                            {item.notes && (
                              <p className="text-[#ec7f13] text-xs mt-2 italic">
                                * {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import TopNavBar from '@/app/components/TopNavBar';
import Footer from '@/app/components/Footer';

type Table = {
  id: string;
  name: string;
  type: 'table-2' | 'table-4' | 'table-large';
  capacity: number;
  area: 'quiet' | 'view' | 'private';
  position: { top?: string; bottom?: string; left: string };
  shape: 'square' | 'rounded' | 'circle';
  available: boolean;
};

const tables: Table[] = [
  { id: 'B1', name: 'B1', type: 'table-2', capacity: 2, area: 'quiet', position: { top: '5%', left: '5%' }, shape: 'square', available: true },
  { id: 'B2', name: 'B2', type: 'table-2', capacity: 2, area: 'quiet', position: { top: '5%', left: '30%' }, shape: 'square', available: false },
  { id: 'B3', name: 'B3', type: 'table-2', capacity: 2, area: 'quiet', position: { top: '5%', left: '55%' }, shape: 'square', available: true },
  { id: 'B4', name: 'B4', type: 'table-2', capacity: 2, area: 'quiet', position: { top: '5%', left: '80%' }, shape: 'square', available: true },
  { id: 'B5', name: 'B5', type: 'table-4', capacity: 4, area: 'quiet', position: { top: '35%', left: '10%' }, shape: 'rounded', available: true },
  { id: 'B6', name: 'B6', type: 'table-4', capacity: 4, area: 'quiet', position: { top: '35%', left: '45%' }, shape: 'rounded', available: true },
  { id: 'B7', name: 'B7', type: 'table-4', capacity: 4, area: 'quiet', position: { top: '35%', left: '75%' }, shape: 'rounded', available: false },
  { id: 'C1', name: 'C1', type: 'table-large', capacity: 6, area: 'view', position: { bottom: '10%', left: '5%' }, shape: 'circle', available: false },
  { id: 'C2', name: 'C2', type: 'table-large', capacity: 6, area: 'view', position: { bottom: '10%', left: '30%' }, shape: 'circle', available: true },
  { id: 'C3', name: 'C3', type: 'table-large', capacity: 6, area: 'private', position: { bottom: '10%', left: '55%' }, shape: 'circle', available: true },
  { id: 'C4', name: 'C4', type: 'table-large', capacity: 6, area: 'private', position: { bottom: '10%', left: '80%' }, shape: 'circle', available: true },
];

const areaLabels = {
  quiet: 'Khu vực yên tĩnh',
  view: 'Khu vực view đẹp',
  private: 'Phòng riêng',
};

const tableTypeLabels = {
  'table-2': 'Bàn 2 người',
  'table-4': 'Bàn 4 người',
  'table-large': 'Bàn lớn (6+)',
};

export default function Buoc2() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(tables.find(t => t.id === 'B6') || null);

  const handleTableClick = (table: Table) => {
    if (table.available) {
      setSelectedTable(table);
    }
  };

  const getTableClasses = (table: Table) => {
    const baseClasses = "absolute text-sm font-bold flex items-center justify-center transition-all";
    const shapeClasses = table.shape === 'circle' ? 'rounded-full w-16 h-16' : table.shape === 'rounded' ? 'rounded w-20 h-12' : 'rounded w-16 h-10';
    
    if (!table.available) {
      return `${baseClasses} ${shapeClasses} bg-border-light dark:bg-border-dark text-text-muted-light dark:text-text-muted-dark cursor-not-allowed`;
    }
    
    if (selectedTable?.id === table.id) {
      return `${baseClasses} ${shapeClasses} bg-primary text-white border-2 border-primary ring-2 ring-primary ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark`;
    }
    
    const typeColors = {
      'table-2': 'bg-[#8cb369]',
      'table-4': 'bg-[#f4a261]',
      'table-large': 'bg-[#b38867]',
    };
    
    return `${baseClasses} ${shapeClasses} ${typeColors[table.type]} text-white hover:ring-2 ring-primary ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark`;
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <TopNavBar />
          <main className="flex flex-1 justify-center px-4 py-10 md:px-10 lg:px-20">
            <div className="layout-content-container flex flex-col w-full max-w-6xl">
              {/* Page Heading */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
                    Đặt Bàn Tại Hương Quê
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">
                    Trải nghiệm không gian ấm cúng và hương vị ẩm thực miền Tây sông nước đích thực.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                {/* Left Column: Table Selection */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                  {/* Progress Bar */}
                  <div className="flex flex-col gap-3 p-4">
                    <div className="flex gap-6 justify-between">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                        Bước 2/4: Chọn bàn trên bản đồ
                      </p>
                    </div>
                    <div className="rounded-full bg-border-light dark:bg-border-dark h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "50%" }} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 px-4">
                    <h3 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">
                      Vui lòng chọn bàn bạn muốn
                    </h3>

                    {/* Legend */}
                    <div className="border border-border-light dark:border-border-dark rounded-xl p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                        <div className="col-span-full font-bold">Chú thích</div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-[#8cb369]" />
                          <span>Bàn 2 người</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-[#f4a261]" />
                          <span>Bàn 4 người</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#b38867]" />
                          <span>Bàn lớn (6+)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-[#6b9080] opacity-20" />
                          <span className="text-text-muted-light dark:text-text-muted-dark">Khu vực yên tĩnh</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-[#e07a5f] opacity-20" />
                          <span className="text-text-muted-light dark:text-text-muted-dark">Khu vực view đẹp</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-[#3d405b] opacity-20" />
                          <span className="text-text-muted-light dark:text-text-muted-dark">Phòng riêng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-primary border-primary text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[12px]! font-bold!">check</span>
                          </div>
                          <span>Bàn bạn chọn</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                          <div className="w-4 h-4 rounded-sm bg-border-light dark:bg-border-dark border border-transparent" />
                          <span className="text-text-muted-light dark:text-text-muted-dark">Đã đặt / Không khả dụng</span>
                        </div>
                      </div>
                    </div>

                    {/* Table Map */}
                    <div className="w-full bg-surface-light/50 dark:bg-surface-dark/50 p-4 sm:p-6 rounded-xl border border-border-light dark:border-border-dark relative aspect-4/3">
                      {/* Area Background Zones */}
                      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                        <div className="col-start-1 col-span-10 row-start-1 row-span-6 bg-[#6b9080]/20" />
                        <div className="col-start-1 col-span-5 row-start-7 row-span-4 bg-[#e07a5f]/20" />
                        <div className="col-start-6 col-span-5 row-start-7 row-span-4 bg-[#3d405b]/20" />
                      </div>

                      {/* Background Image */}
                      <div className="absolute inset-0 w-full h-full opacity-10 rounded-xl overflow-hidden">
                        <Image
                          src="https://via.placeholder.com/800x600/f3ede7/9a734c?text=Restaurant+Layout"
                          alt="Restaurant layout illustration"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Tables */}
                      <div className="relative h-full">
                        {tables.map((table) => (
                          <button
                            key={table.id}
                            onClick={() => handleTableClick(table)}
                            disabled={!table.available}
                            className={getTableClasses(table)}
                            style={table.position}
                          >
                            {table.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="px-4 mt-6 flex gap-4">
                    <button className="w-1/3 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                      <span className="truncate">Quay lại</span>
                    </button>
                    <button className="w-2/3 flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
                      <span className="truncate">Xác nhận chọn bàn</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Summary */}
                <div className="lg:col-span-2 flex flex-col gap-6 p-4">
                  <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      className="object-cover"
                      alt="Warm and inviting restaurant interior"
                      src="https://via.placeholder.com/800x600/f3ede7/9a734c?text=Restaurant+Interior"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="bg-surface-light/50 dark:bg-surface-dark/50 p-6 rounded-xl border border-border-light dark:border-border-dark flex flex-col gap-4">
                    <h4 className="text-lg font-bold text-text-light dark:text-text-dark">
                      Thông tin đặt bàn
                    </h4>
                    <div className="flex flex-col gap-3 text-sm border-t border-border-light dark:border-border-dark pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Ngày</span>
                        <span className="font-bold">Thứ Bảy, 05/10/2024</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Giờ</span>
                        <span className="font-bold">18:30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Số khách</span>
                        <span className="font-bold">4 người</span>
                      </div>
                      {selectedTable && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Bàn đã chọn</span>
                            <span className="font-bold text-primary">Bàn {selectedTable.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Loại bàn</span>
                            <span className="font-bold">{tableTypeLabels[selectedTable.type]}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-muted-light dark:text-text-muted-dark font-medium">Khu vực</span>
                            <span className="font-bold">{areaLabels[selectedTable.area]}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-center text-text-muted-light dark:text-text-muted-dark">
                      <p>Vui lòng hoàn tất các bước để xác nhận đặt bàn của bạn.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

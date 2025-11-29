import React from 'react';

export default function QuanTriVien() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <p className="text-text-light dark:text-text-dark text-base font-medium">
            Đặt bàn hôm nay
          </p>
          <p className="text-text-light dark:text-text-dark text-3xl font-bold">12</p>
          <p className="text-success dark:text-success-dark text-base font-medium">+5%</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <p className="text-text-light dark:text-text-dark text-base font-medium">
            Doanh thu trong ngày
          </p>
          <p className="text-text-light dark:text-text-dark text-3xl font-bold">15.000.000đ</p>
          <p className="text-success dark:text-success-dark text-base font-medium">+12%</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <p className="text-text-light dark:text-text-dark text-base font-medium">
            Tổng số món ăn
          </p>
          <p className="text-text-light dark:text-text-dark text-3xl font-bold">58</p>
          <p className="text-text-muted-light dark:text-text-muted-dark text-base font-medium h-6"></p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <p className="text-text-light dark:text-text-dark text-base font-medium">
            Khách hàng mới (tháng)
          </p>
          <p className="text-text-light dark:text-text-dark text-3xl font-bold">25</p>
          <p className="text-success dark:text-success-dark text-base font-medium">+8%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-border-light dark:border-border-dark p-6 bg-surface-light dark:bg-surface-dark">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-text-light dark:text-text-dark text-base font-bold">Doanh thu</p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal">
                7 ngày qua
              </p>
            </div>
            <div className="flex gap-1">
              <button className="flex items-center justify-center rounded-lg h-8 px-3 bg-primary/20 text-primary text-sm font-bold">
                Tuần
              </button>
              <button className="flex items-center justify-center rounded-lg h-8 px-3 hover:bg-black/5 dark:hover:bg-white/5 text-text-light dark:text-text-dark text-sm font-medium">
                Tháng
              </button>
            </div>
          </div>
          <div className="grid min-h-[220px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-4">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => (
              <React.Fragment key={day}>
                <div
                  className="w-full rounded-t bg-primary"
                  style={{ height: `${[80, 60, 60, 90, 70, 85, 75][i]}%` }}
                />
                <p className="text-text-muted-light dark:text-text-muted-dark text-[13px] font-bold">
                  {day}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Top Selling Dishes */}
        <div className="flex flex-col gap-4 rounded-xl border border-border-light dark:border-border-dark p-6 bg-surface-light dark:bg-surface-dark">
          <h3 className="text-text-light dark:text-text-dark text-base font-bold">
            Món ăn bán chạy
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Cá Lóc Nướng Trui', orders: 24, trend: '+12%' },
              { name: 'Lẩu Mắm', orders: 18, trend: '+8%' },
              { name: 'Gỏi Cuốn Tôm Thịt', orders: 15, trend: '+5%' },
            ].map((dish) => (
              <div key={dish.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 rounded-lg size-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">restaurant</span>
                  </div>
                  <div>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      {dish.name}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-xs">
                      {dish.orders} đơn
                    </p>
                  </div>
                </div>
                <p className="text-success dark:text-success-dark text-sm font-medium">
                  {dish.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
        <h3 className="text-text-light dark:text-text-dark text-base font-bold p-6">
          Các lượt đặt bàn gần đây
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5">
                <th className="px-6 py-3 text-text-light dark:text-text-dark text-sm font-bold">
                  Tên khách hàng
                </th>
                <th className="px-6 py-3 text-text-light dark:text-text-dark text-sm font-bold">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-text-light dark:text-text-dark text-sm font-bold">
                  Số người
                </th>
                <th className="px-6 py-3 text-text-light dark:text-text-dark text-sm font-bold">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Nguyễn Văn A', date: '28/11/2024 - 19:00', people: 4, status: 'Đã xác nhận' },
                { name: 'Trần Thị B', date: '28/11/2024 - 20:00', people: 2, status: 'Đang chờ' },
                { name: 'Lê Văn C', date: '29/11/2024 - 18:30', people: 6, status: 'Đã xác nhận' },
              ].map((booking, i) => (
                <tr key={i} className="border-t border-border-light dark:border-border-dark">
                  <td className="px-6 py-4 text-text-light dark:text-text-dark text-sm">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 text-text-light dark:text-text-dark text-sm">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 text-text-light dark:text-text-dark text-sm">
                    {booking.people}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'Đã xác nhận'
                          ? 'bg-success/20 text-success dark:bg-success-dark/20 dark:text-success-dark'
                          : 'bg-primary/20 text-primary'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

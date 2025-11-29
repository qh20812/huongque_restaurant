"use client";
import React, { useState } from "react";
import Button from "../components/Button";

export default function QuanLyMonAn() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả danh mục");

  // Demo data (static). Later, replace with server data.
  const dishes = [
    {
      name: "Canh chua cá lóc",
      desc: "Vị chua thanh của me, ngọt của dứa và cá lóc tươi ngon.",
      price: "120.000đ",
      category: "Món chính",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnJtiNkVZHB7_rL7kmqT4xA0o6Qfs66DdKo6Q3L9WuhoBmCxgECmivFVo0INOrwn719R0pYRMRm8aGUT6jixzL6NpxSb8UFgfO-ZlHW8WsQIxeeXjyySJTED3pfqlYXdkS0blLUczOKeYNZllNGkew7_-5vtjUI7VrwvNwV5GsbDdrMz63FYkJHGsFYPZGMaKrf0KY5h02TkHkPgQAga3EiiW3B4c3nhJsCHJRQHMDQvLl87bk_L_sg3EkiUeLEpPPkdHTrOuQJEM",
    },
    {
      name: "Cá kho tộ",
      desc: "Cá basa kho trong tộ đất, đậm đà hương vị miền Tây.",
      price: "150.000đ",
      category: "Món chính",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUYGdBaAmNKGEPXx6NGznGZfslh9CRcWGuUOdSd4FMqpwBL_qO5tYuutPCNa19Bu-QnpNdH_eIFgVO7dZMsx5erBLBmNhJLNPAob4Z5RNls8TfksoNpNIxdYJO5Vuy-JkS1sHJImugA6h8mxfdwAKkB8IDjHqbdl6hquVsgworjFUI8eJYFN5Hpsj74vVRlmxM4pKcC6LS-ami9n8nQGS--StcxYbH7velKathJdi48K8nutPUyaYzcsWqhqwgLs-uWIlL6Vg_OJY",
    },
    {
      name: "Lẩu mắm",
      desc: "Đặc sản miền Tây với nước lẩu đậm đà từ mắm cá linh.",
      price: "250.000đ",
      category: "Món chính",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQJHALPtzEx0sJeoiqJ_kcRJ--KYxJRrLUH1svji1HFas7Qq85jewNZqBWPv20Xaww4ob9FHVeox5VB22O8uTqMA9nYVF7BTrv2A_53N7XA_bFv04PGXRfDVViyXm0WYvkKp81RvY3eFSdb4THQ3hRVdwdE7jiQbqLwA7wFU6oC-E40ryK91DJo4fJCYwxc5fEhDv4E3SmWFTEBR8_W5z8K5uQv8MKTDzO1ibtywP6wNsGQpZxrwwswbJCcy0-5qytoiCRFa0SHXc",
    },
    {
      name: "Gỏi cuốn tôm thịt",
      desc: "Tôm, thịt, bún và rau sống cuốn trong bánh tráng.",
      price: "60.000đ",
      category: "Khai vị",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Cvq0JBEK4afSBzdWRPaSPFQaoT-tFOef0lRSAP_ahK2PdoMnLXNLlYtfzg38Ntfd-sd5PGw1Np2Q4TPSTWtMNH1UnDeoa8GQGfMLJpRdvX6asr2lHZ7GU-nVrQ0j-yXnjn-jx9RcgPBq_EHcVBoI1jwocHep6iz5iu9XQJmDVLtbH12tGf0Id6_DV1Bt9gkFBcvU1VkiE7Rt5XEvjD7cZzS1IAxbErPGDtzK4pSKa7nilrJ02AgZLLrce_64-C0d7zI2mzL_3uE",
    },
    {
      name: "Bánh xèo",
      desc: "Bánh xèo giòn rụm với nhân tôm, thịt, giá đỗ.",
      price: "80.000đ",
      category: "Khai vị",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCp93mwEj5OTeWwkPPLvaGyPEJ04-vhUOkWgAbqga-aoT0jVl0ebOzMUoxI-AnLycCEpNOE59VNaG0pom3_3ZtU0XPwcKObwug2sHGSBbCH-mjr_E4xgARVVgvSTA-Gn_sWha5TFGDyjwd79HFq5bTXpMbneYTlgNyVYqs4ZA--qk3ywEtIuJForPK8vj8l8lcp1or3vGoX04HeHmd3bA9fTBI9bhw4Ag_1stQQjkPzmrynZnJ8Id_f9lRssAbnpe34YzfAoqI-_O8",
    },
    {
      name: "Chè bà ba",
      desc: "Chè thập cẩm với nước cốt dừa béo ngậy, ngọt thanh.",
      price: "35.000đ",
      category: "Tráng miệng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLmeJ1kC1itdULBtzh_5-eCz0gRqzObU5z9ftB-0HxmvYEpORnruV8xoQyfXa7-3-5xre0Dr3RqEXGlIxtC8TAP5J_xJlvG_gu_YVQj25ZMzUu3CXwmtVhJWL_LOoFHb5bhsIL8u5rQ160S-onXe9OkPZ1hPNcv6N8eJE5tOSgFa0Ih3oLa43Xe9DpmMLRdrR-GXsxPwUBrn8MxH9VbaOFg2prXJiGabvfXZkJeLQlThhVtgSTUY0y_SpwrRMkGD-ZsO1lPEVgpxs",
    },
  ];

  const filtered = dishes.filter((d) => {
    const byQuery = query
      ? d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.desc.toLowerCase().includes(query.toLowerCase())
      : true;
    const byCat =
      category === "Tất cả danh mục" ? true : d.category === category;
    return byQuery && byCat;
  });

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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Tất cả danh mục</option>
              <option>Khai vị</option>
              <option>Món chính</option>
              <option>Tráng miệng</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              expand_more
            </span>
          </div>
        </div>
        <Button icon="add" iconPosition="left" className="w-full sm:w-auto">
          Thêm món mới
        </Button>
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
              {filtered.map((dish) => (
                <tr key={dish.name}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12"
                        style={{ backgroundImage: `url('${dish.image}')` }}
                      />
                      <div>
                        <p className="font-medium text-text-light dark:text-text-dark">{dish.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted-light dark:text-text-muted-dark max-w-xs truncate">
                    {dish.desc}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-light dark:text-text-dark">
                    {dish.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ` +
                        (dish.category === "Khai vị"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : dish.category === "Tráng miệng"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200")
                      }
                    >
                      {dish.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted-light dark:text-text-muted-dark" aria-label="Sửa">
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-red-600 dark:text-red-400" aria-label="Xóa">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
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

# Nhà hàng Hương Quê – Nơi lưu giữ hương vị quê nhà

**Website chính thức nhà hàng Hương Quê**  
URL: http://localhost:3000 (sau khi deploy sẽ thay bằng domain thật)

## Giới thiệu

> “Nơi lưu giữ hương vị – nâng tầm giá trị ẩm thực Việt”

Tại Hương Quê, chúng tôi tin rằng ẩm thực không chỉ là món ăn, mà còn là ký ức, văn hóa và chiếc cầu nối đưa con người trở về với những giá trị bình dị nhưng thiêng liêng nhất. Mỗi món ăn đều được chế biến bằng cái tâm, nguyên liệu tươi sạch từ miền Tây sông nước, mang đậm hồn quê Việt Nam.

**Khai trương chính thức:** 15/10  
**Đội ngũ ban đầu:** 14 thành viên – tất cả đều chung tinh thần “làm nghề bằng cái tâm”.

## Sứ mệnh
- Gìn giữ tinh hoa ẩm thực quê nhà, chuẩn vị như cách người Việt nấu cho nhau bao đời.  
- Lan tỏa văn hóa Việt qua trải nghiệm ẩm thực chỉn chu, tận tâm.  
- Đặt cái tâm lên từng món ăn, xem ẩm thực là nghệ thuật, bếp là trái tim.

## Tầm nhìn
Trở thành một trong những nhà hàng ẩm thực truyền thống uy tín và được yêu mến nhất khu vực, xây dựng hệ thống hiện đại nhưng vẫn giữ trọn hồn quê.

## Giá trị cốt lõi
**Tận tâm – Tinh tế – Tôn trọng truyền thống**  
- Nguyên liệu tươi sạch từ nguồn địa phương  
- Quy trình chế biến truyền thống  
- Chất lượng ổn định mỗi ngày

## Phong cách ẩm thực
- Hồn miền Tây: chua – cay – mặn – ngọt cân bằng, vị ngọt thanh từ nguyên liệu tự nhiên  
- Tối giản nhưng tinh tế: ít món nhưng chuẩn vị, như bữa cơm gia đình Việt  
- Không cầu kỳ, chỉ chân thật trong hương vị và cảm xúc

## Không gian
Mộc mạc – ấm áp – tinh tế  
Chất liệu chính: gỗ, tre, nứa – ánh đèn vàng dịu – không gian thoáng đãng mang hơi thở làng quê Việt.

## Thực đơn mẫu (đang cập nhật đầy đủ)
### Món khai vị
- **Gỏi Ngó Sen Tôm Thịt**  
  Ngó sen giòn thanh, tôm sú tươi ngọt, thịt heo mềm béo, rau thơm, nước mắm chua ngọt cân bằng.  
  Ăn kèm: Bánh phồng tôm – Nem lai vung

(Các món chính, lẩu, tráng miệng… sẽ tiếp tục bổ sung từ file PDF 50 trang)

## Tính năng website
- Trang chủ & Giới thiệu  
- Thực đơn phân theo danh mục + chi tiết món  
- Bộ sưu tập ảnh nhà hàng & món ăn  
- Đặt bàn online  
- Trang quản trị (Admin): thêm/sửa/xóa món ăn, danh mục, ảnh, xem đặt bàn  
- Responsive 100%, SEO-friendly

## Công nghệ sử dụng
- Next.js 14 (App Router + Server Components)  
- Prisma + MySQL  
- Tailwind CSS  
- NextAuth.js (admin login)  
- UploadThing (upload ảnh)  
- Deploy: Vercel

## Cài đặt & chạy local
```bash
git clone https://github.com/username/huongque-restaurant.git
cd huongque-restaurant
npm install
npx prisma db push
npx prisma db seed   # tạo admin: admin@huongque.vn / admin123
npm run dev
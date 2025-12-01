import { PrismaClient, ReservationStatus, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed categories
  const categories = [
    { name: 'Khai vị', slug: 'khai-vi', order: 1 },
    { name: 'Món chính', slug: 'mon-chinh', order: 2 },
    { name: 'Tráng miệng', slug: 'trang-mieng', order: 3 },
    { name: 'Set Menu', slug: 'set-menu', order: 4 },
  ];
  await prisma.category.createMany({ data: categories, skipDuplicates: true });

  // Restaurant info (singleton)
  await prisma.restaurantInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      address: '123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh',
      phone: '0123 456 789',
      email: 'lienhe@huongque.vn',
      openHours: '10:00 - 22:00',
      about: 'Nhà hàng Hương Quê mang hương vị miền Tây sông nước.',
      mission: 'Mang đến trải nghiệm ẩm thực chân thực.',
      vision: 'Trở thành điểm đến ẩm thực đặc sản hàng đầu.',
      setMenuPrice: 2500000,
      themeMode: 'light',
    },
  });

  // Sample dishes
  const mainCategory = await prisma.category.findUnique({ where: { slug: 'mon-chinh' } });
  if (mainCategory) {
    await prisma.dish.upsert({
      where: { slug: 'lau-ca-linh-bong-dien-dien' },
      update: {},
      create: {
        name: 'Lẩu cá linh bông điên điển',
        slug: 'lau-ca-linh-bong-dien-dien',
        categoryId: mainCategory.id,
        description: 'Lẩu đặc sản miền Tây với vị chua thanh của me và hương thơm của bông điên điển.',
        imageUrl: 'https://example.com/images/lau-ca-linh.jpg',
        price: 250000,
      },
    });
  }

  // Sample set menus
  const setMenusSeed = [
    {
      name: 'Set Menu Sum Vầy',
      slug: 'set-menu-sum-vay',
      description: 'Thích hợp cho các buổi họp mặt gia đình, bạn bè.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBUYGdBaAmNKGEPXx6NGznGZfslh9CRcWGuUOdSd4FMqpwBL_qO5tYuutPCNa19Bu-QnpNdH_eIFgVO7dZMsx5erBLBmNhJLNPAob4Z5RNls8TfksoNpNIxdYJO5Vuy-JkS1sHJImugA6h8mxfdwAKkB8IDjHqbdl6hquVsgworjFUI8eJYFN5Hpsj74vVRlmxM4pKcC6LS-ami9n8nQGS--StcxYbH7velKathJdi48K8nutPUyaYzcsWqhqwgLs-uWIlL6Vg_OJY',
      price: 899000,
      servesMin: 4,
      servesMax: 6,
      isActive: true,
    },
    {
      name: 'Set Menu Hẹn Hò',
      slug: 'set-menu-hen-ho',
      description: 'Bữa ăn lãng mạn dành cho các cặp đôi.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDnJtiNkVZHB7_rL7kmqT4xA0o6Qfs66DdKo6Q3L9WuhoBmCxgECmivFVo0INOrwn719R0pYRMRm8aGUT6jixzL6NpxSb8UFgfO-ZlHW8WsQIxeeXjyySJTED3pfqlYXdkS0blLUczOKeYNZllNGkew7_-5vtjUI7VrwvNwV5GsbDdrMz63FYkJHGsFYPZGMaKrf0KY5h02TkHkPgQAga3EiiW3B4c3nhJsCHJRQHMDQvLl87bk_L_sg3EkiUeLEpPPkdHTrOuQJEM',
      price: 499000,
      servesMin: 2,
      servesMax: 2,
      isActive: true,
    },
    {
      name: 'Set Menu Tiệc Lớn',
      slug: 'set-menu-tiec-lon',
      description: 'Đầy đủ các món đặc sắc cho buổi tiệc thịnh soạn.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQJHALPtzEx0sJeoiqJ_kcRJ--KYxJRrLUH1svji1HFas7Qq85jewNZqBWPv20Xaww4ob9FHVeox5VB22O8uTqMA9nYVF7BTrv2A_53N7XA_bFv04PGXRfDVViyXm0WYvkKp81RvY3eFSdb4THQ3hRVdwdE7jiQbqLwA7wFU6oC-E40ryK91DJo4fJCYwxc5fEhDv4E3SmWFTEBR8_W5z8K5uQv8MKTDzO1ibtywP6wNsGQpZxrwwswbJCcy0-5qytoiCRFa0SHXc',
      price: 1599000,
      servesMin: 8,
      servesMax: 10,
      isActive: true,
    },
    {
      name: 'Set Menu Đồng Quê',
      slug: 'set-menu-dong-que',
      description: 'Trải nghiệm hương vị mộc mạc của ẩm thực miền Tây.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Cvq0JBEK4afSBzdWRPaSPFQaoT-tFOef0lRSAP_ahK2PdoMnLXNLlYtfzg38Ntfd-sd5PGw1Np2Q4TPSTWtMNH1UnDeoa8GQGfMLJpRdvX6asr2lHZ7GU-nVrQ0j-yXnjn-jx9RcgPBq_EHcVBoI1jwocHep6iz5iu9XQJmDVLtbH12tGf0Id6_DV1Bt9gkFBcvU1VkiE7Rt5XEvjD7cZzS1IAxbErPGDtzK4pSKa7nilrJ02AgZLLrce_64-C0d7zI2mzL_3uE',
      price: 650000,
      servesMin: 3,
      servesMax: 4,
      isActive: false,
    },
  ];

  for (const sm of setMenusSeed) {
    await prisma.setMenu.upsert({
      where: { slug: sm.slug },
      update: {},
      create: sm,
    });
  }

  // Sample reservations
    // Seed tables (matching the layout in buoc-2 page)
    const tables = [
      // Quiet area - top row (2-person tables)
      { name: 'B1', type: 'table-2', capacity: 2, area: 'quiet', positionTop: '5%', positionBottom: null, positionLeft: '5%', shape: 'square' },
      { name: 'B2', type: 'table-2', capacity: 2, area: 'quiet', positionTop: '5%', positionBottom: null, positionLeft: '30%', shape: 'square' },
      { name: 'B3', type: 'table-2', capacity: 2, area: 'quiet', positionTop: '5%', positionBottom: null, positionLeft: '55%', shape: 'square' },
      { name: 'B4', type: 'table-2', capacity: 2, area: 'quiet', positionTop: '5%', positionBottom: null, positionLeft: '80%', shape: 'square' },
      // Quiet area - middle row (4-person tables)
      { name: 'B5', type: 'table-4', capacity: 4, area: 'quiet', positionTop: '35%', positionBottom: null, positionLeft: '10%', shape: 'rounded' },
      { name: 'B6', type: 'table-4', capacity: 4, area: 'quiet', positionTop: '35%', positionBottom: null, positionLeft: '45%', shape: 'rounded' },
      { name: 'B7', type: 'table-4', capacity: 4, area: 'quiet', positionTop: '35%', positionBottom: null, positionLeft: '75%', shape: 'rounded' },
      // Bottom row - large tables (6+ person)
      { name: 'C1', type: 'table-large', capacity: 6, area: 'view', positionTop: null, positionBottom: '10%', positionLeft: '5%', shape: 'circle' },
      { name: 'C2', type: 'table-large', capacity: 6, area: 'view', positionTop: null, positionBottom: '10%', positionLeft: '30%', shape: 'circle' },
      { name: 'C3', type: 'table-large', capacity: 6, area: 'private', positionTop: null, positionBottom: '10%', positionLeft: '55%', shape: 'circle' },
      { name: 'C4', type: 'table-large', capacity: 6, area: 'private', positionTop: null, positionBottom: '10%', positionLeft: '80%', shape: 'circle' },
    ];
  
    for (const table of tables) {
      await prisma.table.upsert({
        where: { name: table.name },
        update: {},
        create: table,
      });
    }

    // Sample reservations
  await prisma.reservation.createMany({
    data: [
      {
        code: 'HQ10001',
        name: 'Trần Văn An',
        phone: '0905123456',
        email: 'an@example.com',
        date: new Date(Date.now() + 2 * 60 * 60 * 1000),
        people: 4,
        tableId: 6, // B6
        message: 'Bàn gần cửa sổ.',
        status: ReservationStatus.pending,
      },
      {
        code: 'HQ10002',
        name: 'Nguyễn Thị Cẩm',
        phone: '0912345678',
        email: 'cam@example.com',
        date: new Date(Date.now() + 26 * 60 * 60 * 1000),
        people: 6,
        tableId: 9, // C2
        message: 'Thêm ly nước chanh.',
        status: ReservationStatus.confirmed,
      },
    ],
    skipDuplicates: true,
  });

  // Sample notifications
  await prisma.notification.createMany({
    data: [
      {
        type: NotificationType.NEW_RESERVATION,
        title: 'Đặt bàn mới #DB1052',
        message: 'Khách hàng Trần Văn An vừa đặt bàn cho 4 người vào lúc 19:00 hôm nay.',
        read: false,
      },
      {
        type: NotificationType.LOW_STOCK,
        title: 'Món "Gà nướng lu" sắp hết hàng',
        message: 'Số lượng tồn kho của món "Gà nướng lu" chỉ còn dưới 5 suất. Vui lòng kiểm tra và cập nhật.',
        read: false,
      },
      {
        type: NotificationType.CANCEL_RESERVATION,
        title: 'Hủy đặt bàn #DB1048',
        message: 'Khách hàng Lê Thị Bích đã hủy đặt bàn cho 2 người vào lúc 20:00 hôm nay.',
        read: true,
      },
      {
        type: NotificationType.SYSTEM,
        title: 'Cảnh báo hệ thống: Lỗi thanh toán',
        message: 'Ghi nhận 3 giao dịch thanh toán qua cổng VNPAY thất bại. Vui lòng kiểm tra cấu hình.',
        read: true,
      },
      {
        type: NotificationType.NEW_RESERVATION,
        title: 'Đặt bàn mới #DB1051',
        message: 'Khách hàng Nguyễn Thị Cẩm vừa đặt bàn cho 6 người vào lúc 18:30 ngày mai.',
        read: true,
      },
      {
        type: NotificationType.UPDATE,
        title: 'Hệ thống đã được cập nhật',
        message: 'Hệ thống quản lý đã được cập nhật lên phiên bản 1.2.0 với các bản vá bảo mật mới.',
        read: true,
      },
    ],
  });

  // Admin user (default)
  await prisma.user.upsert({
    where: { email: 'admin@huongque.vn' },
    update: {},
    create: {
      email: 'admin@huongque.vn',
      password: 'hashed_password_placeholder', // Replace with actual hashed password in real seed
      name: 'Admin',
      role: 'admin',
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

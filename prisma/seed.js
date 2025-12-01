"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, mainCategory, tables, _i, tables_1, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categories = [
                        { name: 'Khai vị', slug: 'khai-vi', order: 1 },
                        { name: 'Món chính', slug: 'mon-chinh', order: 2 },
                        { name: 'Tráng miệng', slug: 'trang-mieng', order: 3 },
                        { name: 'Set Menu', slug: 'set-menu', order: 4 },
                    ];
                    return [4 /*yield*/, prisma.category.createMany({ data: categories, skipDuplicates: true })];
                case 1:
                    _a.sent();
                    // Restaurant info (singleton)
                    return [4 /*yield*/, prisma.restaurantInfo.upsert({
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
                        })];
                case 2:
                    // Restaurant info (singleton)
                    _a.sent();
                    return [4 /*yield*/, prisma.category.findUnique({ where: { slug: 'mon-chinh' } })];
                case 3:
                    mainCategory = _a.sent();
                    if (!mainCategory) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.dish.upsert({
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
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    tables = [
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
                    _i = 0, tables_1 = tables;
                    _a.label = 6;
                case 6:
                    if (!(_i < tables_1.length)) return [3 /*break*/, 9];
                    table = tables_1[_i];
                    return [4 /*yield*/, prisma.table.upsert({
                            where: { name: table.name },
                            update: {},
                            create: table,
                        })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: 
                // Sample reservations
                return [4 /*yield*/, prisma.reservation.createMany({
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
                                status: client_1.ReservationStatus.pending,
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
                                status: client_1.ReservationStatus.confirmed,
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 10:
                    // Sample reservations
                    _a.sent();
                    // Sample notifications
                    return [4 /*yield*/, prisma.notification.createMany({
                            data: [
                                {
                                    type: client_1.NotificationType.NEW_RESERVATION,
                                    title: 'Đặt bàn mới #DB1052',
                                    message: 'Khách hàng Trần Văn An vừa đặt bàn cho 4 người vào lúc 19:00 hôm nay.',
                                    read: false,
                                },
                                {
                                    type: client_1.NotificationType.LOW_STOCK,
                                    title: 'Món "Gà nướng lu" sắp hết hàng',
                                    message: 'Số lượng tồn kho của món "Gà nướng lu" chỉ còn dưới 5 suất. Vui lòng kiểm tra và cập nhật.',
                                    read: false,
                                },
                                {
                                    type: client_1.NotificationType.CANCEL_RESERVATION,
                                    title: 'Hủy đặt bàn #DB1048',
                                    message: 'Khách hàng Lê Thị Bích đã hủy đặt bàn cho 2 người vào lúc 20:00 hôm nay.',
                                    read: true,
                                },
                                {
                                    type: client_1.NotificationType.SYSTEM,
                                    title: 'Cảnh báo hệ thống: Lỗi thanh toán',
                                    message: 'Ghi nhận 3 giao dịch thanh toán qua cổng VNPAY thất bại. Vui lòng kiểm tra cấu hình.',
                                    read: true,
                                },
                                {
                                    type: client_1.NotificationType.NEW_RESERVATION,
                                    title: 'Đặt bàn mới #DB1051',
                                    message: 'Khách hàng Nguyễn Thị Cẩm vừa đặt bàn cho 6 người vào lúc 18:30 ngày mai.',
                                    read: true,
                                },
                                {
                                    type: client_1.NotificationType.UPDATE,
                                    title: 'Hệ thống đã được cập nhật',
                                    message: 'Hệ thống quản lý đã được cập nhật lên phiên bản 1.2.0 với các bản vá bảo mật mới.',
                                    read: true,
                                },
                            ],
                        })];
                case 11:
                    // Sample notifications
                    _a.sent();
                    // Admin user (default)
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@huongque.vn' },
                            update: {},
                            create: {
                                email: 'admin@huongque.vn',
                                password: 'hashed_password_placeholder', // Replace with actual hashed password in real seed
                                name: 'Admin',
                                role: 'admin',
                            },
                        })];
                case 12:
                    // Admin user (default)
                    _a.sent();
                    console.log('Seed data inserted successfully');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

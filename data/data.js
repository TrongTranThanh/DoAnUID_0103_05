
const bannerData = [
    {
        img: './data/images/banner1.jpg',
        badge: 'THÀNH VIÊN ỨNG DỤNG',
        title: 'Quần Easy Shorts Vải Cotton',
        desc: 'Chất liệu 100% cotton tự nhiên, mềm mại. Đa dạng lựa chọn với các thiết kế màu trơn, denim và kẻ sọc.',
        price: '293.000 VND',
        oldPrice: '391.000 VND',
        promo: 'Ưu Đãi Dành Riêng Cho Thành Viên Ứng Dụng Từ 17.07 - 23.07.2026'
    },
    {
        img: './data/images/banner2.jpg',
        badge: 'KHUYẾN MÃI CÓ HẠN',
        title: 'Áo Thun Cổ Tròn',
        desc: 'Chất liệu dệt kim 100% cotton mềm mượt. Đa dạng với 10 màu sắc và thêm kích cỡ lựa chọn khi mua online!',
        price: '195.000 VND',
        oldPrice: '293.000 VND',
        promo: 'Khuyến Mãi Có Hạn Từ 17.07 - 23.07.2026'
    },
    {
        img: './data/images/banner3.jpg',
        badge: 'KHUYẾN MÃI CÓ HẠN',
        title: 'AIRism Áo Khoác Chống Tia UV Siêu Co Giãn Kéo Khóa',
        desc: 'Ngăn chặn hơn 90% tia UV.* Phối cùng Quần Short Geared (unisex) để sẵn sàng cho mọi hoạt động ngoài trời.',
        price: '489.000 VND',
        oldPrice: '588.000 VND',
        promo: 'Khuyến Mãi Có Hạn Từ 17.07 - 23.07.2026'
    },
    {
        img: './data/images/banner.jpg',
        badge: "HÀNG MỚI VỀ",
    title: "Quần Smart Pants Dáng Rộng Ống Suông",
    desc: "Thoải mái nhưng vẫn thời trang. Thiết kế quần phom rộng phù hợp với mọi hoàn cảnh.",
    price: "784.000 VND",
        oldPrice: null,
        promo: null
    }
];

// Thêm mảng dữ liệu đồ Nữ
const womensData = [
    {
        id: 301,
        name: "Áo Kiểu Vải Rayon",
        price: "588.000 Đ",
        oldPrice: null,
        badge: "Sản phẩm được làm từ chất liệu tái chế",
        img: "./data/images/nu1.jpg"
    },
    {
        id: 302,
        name: "Áo Kiểu Vải Rayon | Kẻ Sọc",
        price: "588.000 Đ",
        oldPrice: null,
        badge: null,
        img: "./data/images/nu2.jpg"
    },
    {
        id: 303,
        name: "Áo Kiểu Vải Rayon",
        price: "588.000 Đ",
        oldPrice: null,
        badge: null,
        img: "./data/images/nu3.jpg"
    },
    {
        id: 304,
        name: "Áo Kiểu Vải Rayon",
        price: "489.000 Đ",
        oldPrice: "588.000 Đ",
        badge: "Giá mới, Màu/Kích Cỡ Nhất Định<br>Sản phẩm được làm từ chất liệu tái chế",
        img: "./data/images/nu4.jpg"
    },
    {
        id: 305,
        name: "Áo Sơ Mi Vải Linen Cao Cấp",
        price: "784.000 Đ",
        oldPrice: null,
        badge: "<b>Hàng bán chạy</b>",
        img: "./data/images/nu5.jpg"
    },
    {
        id: 306,
        name: "Áo Sơ Mi Vải Linen Cao Cấp",
        price: "784.000 Đ",
        oldPrice: null,
        badge: null,
        img: "./data/images/nu6.jpg"
    },
    {
        id: 307,
        name: "Áo Sơ Mi Vải Linen Cao Cấp",
        price: "588.000 Đ",
        oldPrice: "784.000 Đ",
        badge: "<b>Hàng bán chạy</b><br>Giá mới, Màu/Kích Cỡ Nhất Định",
        img: "./data/images/nu7.jpg"
    },
    {
        id: 308,
        name: "Áo Sơ Mi Vải Linen Cao Cấp",
        price: "784.000 Đ",
        oldPrice: null,
        badge: null,
        img: "./data/images/nu8.jpg"
    }
];

// Thêm mảng dữ liệu đồ Nam
const mensData = [
    {
        id: 201,
        name: "Áo Sơ Mi Vải Denim",
        price: "784.000 Đ",
        oldPrice: null,
        badge: null,
        img: "./data/images/nam1.jpg"
    },
    {
        id: 202,
        name: "Áo Sơ Mi Vải Cotton Linen",
        price: "489.000 Đ",
        oldPrice: "588.000 Đ",
        badge: "Ưu đãi có giới hạn từ 17 thg 7 - 23 thg 7 2026<br>Unisex",
        img: "./data/images/nam2.jpg"
    },
    {
        id: 203,
        name: "Áo Sơ Mi Vải Cotton Linen Cổ Trụ",
        price: "588.000 Đ",
        oldPrice: null,
        badge: "Unisex",
        img: "./data/images/nam3.jpg"
    },
    {
        id: 204,
        name: "Áo Sơ Mi Vải Cotton Linen Cổ Trụ | Kẻ Sọc",
        price: "588.000 Đ",
        oldPrice: null,
        badge: "Unisex",
        img: "./data/images/nam4.jpg"
    },
    {
        id: 205,
        name: "Áo Sơ Mi Vải Cotton Linen",
        price: "489.000 Đ",
        oldPrice: "588.000 Đ",
        badge: "Giá mới, Màu/Kích Cỡ Nhất Định<br>Unisex",
        img: "./data/images/nam5.jpg"
    },
    {
        id: 206,
        name: "Áo Sơ Mi Dáng Boxy",
        price: "391.000 Đ",
        oldPrice: "588.000 Đ",
        badge: "Giá mới<br>Unisex",
        img: "./data/images/nam6.jpg"
    },
    {
        id: 207,
        name: "Áo Sơ Mi Oxford Dáng Rộng",
        price: "588.000 Đ",
        oldPrice: "784.000 Đ",
        badge: "Giá mới<br>Unisex, Chỉ có tại một số cửa hàng giới hạn",
        img: "./data/images/nam7.jpg"
    },
    {
        id: 208,
        name: "Áo Sơ Mi Oxford Dáng Rộng",
        price: "588.000 Đ",
        oldPrice: "784.000 Đ",
        badge: "Giá mới<br>Unisex, Chỉ có tại một số cửa hàng giới hạn",
        img: "./data/images/nam8.jpg"
    }
];
const productsData = [
    { 
        id: 1, 
        name: "Áo Thun Cổ Henley", 
        price: "293.000 Đ", 
        img: "./data/images/ao-1.jpg" 
    },
    { 
        id: 2, 
        name: "Áo Thun Tay Lỡ", 
        price: "391.000 Đ", 
        img: "./data/images/ao-2.jpg" 
    },
    { 
        id: 3, 
        name: "Áo Thun Kẻ Sọc", 
        price: "391.000 Đ", 
        img: "./data/images/ao-3.jpg" 
    },
    { 
        id: 4, 
        name: "Áo Thun Tay Dài", 
        price: "391.000 Đ", 
        img: "./data/images/ao-4.jpg" 
    },
    { 
        id: 5, 
        name: "Áo Thun Không Tay", 
        price: "195.000 Đ", 
        img: "./data/images/ao-5.jpg" 
    },
    { 
        id: 6, 
        name: "Áo Sơ Mi Kẻ Sọc", 
        price: "500.000 Đ", 
        img: "./data/images/ao-6.jpg" 
    }
];
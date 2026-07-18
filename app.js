
// ==========================================
// 1. QUẢN LÝ DỮ LIỆU GIỎ HÀNG (LocalStorage)
// ==========================================
let cart = JSON.parse(localStorage.getItem('uniqlo_cart')) || [];

function saveCart() {
    localStorage.setItem('uniqlo_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.innerText = `(${totalItems})`;
    }
}

function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/\D/g, ''));
}

function formatPrice(priceNum) {
    return priceNum.toLocaleString('vi-VN') + ' Đ';
}

function goToDetail(id) {
    window.location.href = `chitiet.html?id=${id}`;
}

// ==========================================
// 2. LOGIC TÀI KHOẢN
// ==========================================
function handleLogin(event) {
    if(event) event.preventDefault();
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    if (!usernameInput || !passwordInput) return;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        Swal.fire({ icon: 'warning', title: 'Cảnh báo', text: 'Vui lòng nhập đầy đủ thông tin!', confirmButtonColor: '#000', confirmButtonText: 'OK' });
        return;
    }
    localStorage.setItem('uniqlo_isLoggedIn', 'true');
    localStorage.setItem('uniqlo_username', username);
    Swal.fire({ icon: 'success', title: `Chào mừng ${username}!`, confirmButtonColor: '#000', confirmButtonText: 'OK', timer: 2000, timerProgressBar: true }).then(() => { window.location.href = 'index.html'; });
}

function handleLogout() {
    localStorage.removeItem('uniqlo_isLoggedIn');
    localStorage.removeItem('uniqlo_username');
    Swal.fire({ icon: 'info', title: 'Đã đăng xuất', confirmButtonColor: '#000', confirmButtonText: 'OK', timer: 2000, timerProgressBar: true }).then(() => { window.location.href = 'dangnhap.html'; });
}

function handleNewsletterSignup(event) {
    if (event) event.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput) return;
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        Swal.fire({ icon: 'warning', title: 'Email không hợp lệ', text: 'Vui lòng nhập một địa chỉ email hợp lệ.', confirmButtonColor: '#000', confirmButtonText: 'OK' });
        return;
    }

    Swal.fire({ icon: 'success', title: 'Đăng ký thành công!', text: 'Cảm ơn bạn đã đồng hành cùng UNIQLO. Ưu đãi mới sẽ được gửi đến email của bạn.', confirmButtonColor: '#000', confirmButtonText: 'OK', timer: 2500, timerProgressBar: true });
    emailInput.value = '';
}

// ==========================================
// 3. CÁC HÀM RENDER GIAO DIỆN
// ==========================================
function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const currentPath = window.location.pathname;
    const isHome = currentPath.includes('index.html') || currentPath.endsWith('/');
    const isNam = currentPath.includes('nam.html');
    const isNu = currentPath.includes('nu.html');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const isLoggedIn = localStorage.getItem('uniqlo_isLoggedIn') === 'true';
    const avatarSrc = isLoggedIn ? './data/images/avatar.jpg' : 'https://via.placeholder.com/35/cccccc/ffffff?text=U';

    const devAlert = "Swal.fire({icon: 'info', title: 'Tính năng đang phát triển!', confirmButtonColor: '#000', confirmButtonText: 'OK', timer: 2000})";

    const userMenuHTML = isLoggedIn ? `
        <a href="hoso.html">Thông tin tài khoản</a>
        <a href="#" onclick="${devAlert}">Đơn hàng của tôi</a>
        <a href="#" onclick="handleLogout()" style="color: var(--red);">Đăng xuất</a>
    ` : `<a href="dangnhap.html">Đăng nhập</a><a href="dangky.html">Đăng ký</a>`;

    headerContainer.innerHTML = `
        <header class="header">
            <div class="header-left">
                <a href="index.html" class="logo-link"><img src="./data/images/logo.jpg" alt="Uniqlo Logo" class="logo-img"></a>
                <nav class="nav-links">
                    <a href="index.html" class="${isHome ? 'active' : ''}">Trang chủ</a>
                    <a href="nam.html" class="${isNam ? 'active' : ''}">Nam</a>
                    <a href="nu.html" class="${isNu ? 'active' : ''}">Nữ</a>
                </nav>
            </div>
            <div class="header-right">
                <a href="thanhtoan.html">Thanh toán</a>
                <a href="giohang.html">Giỏ hàng <span id="cart-count" style="color:var(--red);">(${totalItems})</span></a>
                <div class="user-menu-container" onclick="toggleUserMenu(event)">
                    <img src="${avatarSrc}" class="avatar-img" onerror="this.src='https://via.placeholder.com/35/cccccc/ffffff?text=U'">
                    <div class="user-dropdown" id="user-dropdown">${userMenuHTML}</div>
                </div>
            </div>
        </header>
    `;
}

function toggleUserMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

window.addEventListener('click', function() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && dropdown.classList.contains('show')) dropdown.classList.remove('show');
});

function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    footerContainer.innerHTML = `<footer class="footer"><div><strong>CÔNG TY TNHH UNIQLO VIỆT NAM</strong><br>Giấy chứng nhận đăng ký doanh nghiệp số 0315304731, cấp lần đầu ngày 02/10/2018.</div><div>Địa chỉ trụ sở chính: Tầng 16, Saigon Centre, 67 Đường Lê Lợi, Quận 1, TP.HCM.<br>Số Điện thoại: 028 3861 4613</div></footer>`;
}

// ==== RENDER BANNER CẬP NHẬT HIỆU ỨNG & GIÁ KHUYẾN MÃI ====
// ==== RENDER BANNER (HIỆU ỨNG TRƯỢT NGANG) ====
let currentBannerIndex = 0;
let bannerTimer;

function renderBanner() {
    const bannerSection = document.getElementById('banner-container');
    if (!bannerSection || !Array.isArray(bannerData)) return;

    // Bọc tất cả slide bằng rãnh trượt banner-track
    let trackHTML = '<div class="banner-track" id="banner-track">';
    let dotsHTML = '<div class="slider-dots">';

    bannerData.forEach((banner, index) => {
        const isActive = index === 0 ? 'active' : '';
        const badgeHTML = banner.badge ? `<span class="badge">${banner.badge}</span>` : '';
        const oldPriceHTML = banner.oldPrice ? `<div style="text-decoration: line-through; color: #888; font-size: 18px; margin-top: 5px; font-weight: normal;">${banner.oldPrice}</div>` : '';
        const promoHTML = banner.promo ? `<div style="color: var(--red); font-size: 15px; margin-top: 10px; font-weight: bold;">${banner.promo}</div>` : '';

        trackHTML += `
            <div class="banner-slide ${isActive}" style="background-image: url('${banner.img}')">
                <div class="banner-content">
                    ${badgeHTML}
                    <h2 style="margin-bottom:15px; font-size: 32px; font-weight: bold;">${banner.title}</h2>
                    <p style="margin-bottom:20px; color:#555; line-height:1.6; font-size: 16px;">${banner.desc}</p>
                    <h3 style="font-size: 36px; color: var(--red); font-weight: bold; line-height: 1;">${banner.price}</h3>
                    ${oldPriceHTML}
                    ${promoHTML}
                </div>
            </div>
        `;
        dotsHTML += `<div class="dot ${isActive}" onclick="changeBanner(${index})"></div>`;
    });
    
    trackHTML += '</div>';
    dotsHTML += '</div>';
    
    bannerSection.innerHTML = trackHTML + dotsHTML;
    startBannerAutoPlay();
}

function changeBanner(index) {
    const track = document.getElementById('banner-track');
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || slides.length === 0) return;

    // Xóa class active của slide hiện tại
    slides[currentBannerIndex].classList.remove('active');
    dots[currentBannerIndex].classList.remove('active');

    // Cập nhật vị trí
    currentBannerIndex = index;

    // HIỆU ỨNG TRƯỢT: Dịch chuyển rãnh banner sang trái một khoảng tương ứng %
    track.style.transform = `translateX(-${currentBannerIndex * 100}%)`;

    // Kích hoạt slide mới để phần chữ bên trong nổi lên
    slides[currentBannerIndex].classList.add('active');
    dots[currentBannerIndex].classList.add('active');
    
    startBannerAutoPlay();
}

function startBannerAutoPlay() {
    if (bannerTimer) clearInterval(bannerTimer);
    bannerTimer = setInterval(() => {
        let nextIndex = (currentBannerIndex + 1) % bannerData.length;
        changeBanner(nextIndex);
    }, 4500); 
}

// ==== KHỐI DANH MỤC NỔI BẬT (NAM / NỮ) — dùng ảnh sản phẩm có sẵn trong data.js ====
function renderCategoryShowcase() {
    const container = document.getElementById('category-section');
    if (!container) return;

    const menImg = (typeof mensData !== 'undefined' && mensData.length) ? mensData[0].img : './data/images/bonus1.jpg';
    const womenImg = (typeof womensData !== 'undefined' && womensData.length) ? womensData[0].img : './data/images/bonus2.jpg';

    container.innerHTML = `
        <a href="nam.html" class="category-card reveal">
            <div class="category-img" style="background-image: url('${menImg}')"></div>
            <div class="category-overlay">
                <span class="category-eyebrow">Bộ sưu tập</span>
                <h3>Thời trang Nam</h3>
                <span class="category-link">Khám phá ngay <span class="arrow">→</span></span>
            </div>
        </a>
        <a href="nu.html" class="category-card reveal" style="transition-delay: 0.15s;">
            <div class="category-img" style="background-image: url('${womenImg}')"></div>
            <div class="category-overlay">
                <span class="category-eyebrow">Bộ sưu tập</span>
                <h3>Thời trang Nữ</h3>
                <span class="category-link">Khám phá ngay <span class="arrow">→</span></span>
            </div>
        </a>
    `;
}

function buildProductCardHTML(product, categoryText) {
    const oldPriceHTML = product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : '';
    const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    const devAlert = "Swal.fire({icon: 'info', title: 'Tính năng đang phát triển!', confirmButtonColor: '#000', confirmButtonText: 'OK'})";

    return `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${product.img}')" onclick="goToDetail(${product.id})"></div>
            <div class="product-info">
                <div class="product-category">${categoryText}</div>
                <div class="product-name" onclick="goToDetail(${product.id})">${product.name}</div>
                <div class="product-price-row">
                    <span class="product-price">${product.price}</span>
                    ${oldPriceHTML}
                </div>
                ${badgeHTML}
            </div>
            <div class="card-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id}, 'M')">Thêm vào giỏ</button>
                <button class="btn-buy-now" onclick="${devAlert}">Mua ngay</button>
            </div>
        </div>
    `;
}

function renderProducts() {
    const gridContainer = document.getElementById('product-grid');
    if (gridContainer && typeof productsData !== 'undefined') {
        gridContainer.innerHTML = productsData.map(p => buildProductCardHTML(p, "Thời trang Nam/Nữ")).join('');
    }
}

function renderMensProducts() {
    const gridContainer = document.getElementById('mens-product-grid');
    if (gridContainer && typeof mensData !== 'undefined') {
        gridContainer.innerHTML = mensData.map(p => buildProductCardHTML(p, "Nam, S-XXL")).join('');
    }
}

function renderWomensProducts() {
    const gridContainer = document.getElementById('womens-product-grid');
    if (gridContainer && typeof womensData !== 'undefined') {
        gridContainer.innerHTML = womensData.map(p => buildProductCardHTML(p, "Nữ, XS-XXL")).join('');
    }
}

let currentSelectedSize = null;
function selectSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSelectedSize = size;
    document.getElementById('selected-size-text').innerText = size;
    document.getElementById('selected-size-text').style.color = "var(--black)";
    document.getElementById('selected-size-text').style.fontWeight = "bold";
}

function addDetailToCart(productId) {
    if (!currentSelectedSize) {
        Swal.fire({ icon: 'warning', title: 'Chưa chọn size', text: 'Vui lòng chọn kích cỡ áo trước khi thêm vào giỏ!', confirmButtonColor: '#000' });
        return;
    }
    addToCart(productId, currentSelectedSize);
}

function renderProductDetail() {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    let product = null;
    if (typeof productsData !== 'undefined') product = productsData.find(p => p.id === productId);
    if (!product && typeof mensData !== 'undefined') product = mensData.find(p => p.id === productId);
    if (!product && typeof womensData !== 'undefined') product = womensData.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<h2 style="text-align:center; width:100%; margin-top:50px;">Không tìm thấy sản phẩm!</h2>';
        return;
    }

    const oldPriceHTML = product.oldPrice ? `<span class="old-price" style="font-size: 20px; margin-left: 15px;">${product.oldPrice}</span>` : '';
    const badgeHTML = product.badge ? `<div class="product-badge" style="font-size:16px; margin-bottom:20px;">${product.badge}</div>` : '';
    const desc = "Sản phẩm mang phong cách tối giản (Minimalism) đặc trưng của UNIQLO. Chất liệu vải mềm mịn, thoáng mát, thấm hút mồ hôi tốt. Đường may tỉ mỉ, form dáng chuẩn phù hợp với nhiều dáng người, dễ dàng phối đồ cho cả đi làm lẫn đi chơi.";

    container.innerHTML = `
        <div class="detail-left">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="detail-right">
            <h1 class="detail-title">${product.name}</h1>
            ${badgeHTML}
            <div class="detail-price-box">
                <span class="detail-price">${product.price}</span>
                ${oldPriceHTML}
            </div>
            
            <div>
                <h4 style="margin-bottom: 10px;">Kích cỡ: <span id="selected-size-text" style="color: var(--red); font-weight: normal;">Vui lòng chọn</span></h4>
                <div class="size-selector">
                    <button class="size-btn" onclick="selectSize(this, 'S')">S</button>
                    <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
                    <button class="size-btn" onclick="selectSize(this, 'L')">L</button>
                    <button class="size-btn" onclick="selectSize(this, 'XL')">XL</button>
                </div>
            </div>

            <button class="btn-order" style="margin-top: 40px; font-size: 18px; padding: 20px;" onclick="addDetailToCart(${product.id})">THÊM VÀO GIỎ HÀNG</button>
            
            <div class="desc-box">
                <h3 style="margin-bottom: 15px;">Mô tả chi tiết</h3>
                <p>${desc}</p>
                <ul style="margin-top: 15px; padding-left: 20px; color: #444;">
                    <li>Chất liệu: 100% Vải sợi tự nhiên cao cấp</li>
                    <li>Hướng dẫn giặt: Giặt máy chế độ nhẹ, không dùng chất tẩy mạnh</li>
                    <li>Mã sản phẩm: UNQ-${product.id}</li>
                </ul>
            </div>
        </div>
    `;
}

// ==========================================
// 4. LOGIC XỬ LÝ GIỎ HÀNG 
// ==========================================
function addToCart(productId, size) {
    let product = null;
    if (typeof productsData !== 'undefined') product = productsData.find(p => p.id === productId);
    if (!product && typeof mensData !== 'undefined') product = mensData.find(p => p.id === productId);
    if (!product && typeof womensData !== 'undefined') product = womensData.find(p => p.id === productId);
    if (!product) return;

    const cartId = productId + '-' + size;
    const existingItem = cart.find(item => item.cartId === cartId);
    
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ 
        cartId: cartId, 
        id: product.id, 
        name: `${product.name} (Size: ${size})`, 
        price: product.price, 
        img: product.img, 
        quantity: 1 
    });
    
    saveCart();
    
    Swal.fire({
        toast: true, position: 'top-end', icon: 'success',
        title: `Đã thêm ${product.name} (Size ${size})!`,
        showConfirmButton: false, showCloseButton: true, timer: 2500, timerProgressBar: true
    });
}

// Sửa lỗi: dùng index trong mảng cart thay vì cartId để xóa/sửa số lượng,
// tránh trường hợp dữ liệu cart cũ trong localStorage thiếu trường cartId
// khiến nút xóa không hoạt động.
function updateQuantity(index, delta) {
    const item = cart[index];
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeItem(index);
        else { saveCart(); renderCartPage(); }
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartPage();
}

function renderCartPage() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;
    if (cart.length === 0) {
        cartContent.innerHTML = `<p class="empty-cart-text">Không có sản phẩm nào trong giỏ hàng của bạn.</p>`;
        return;
    }

    let cartHTML = `<div class="cart-layout"><div class="cart-list">`;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = parsePrice(item.price) * item.quantity;
        totalPrice += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.img}')"></div>
                <div class="cart-item-info">
                    <h3 style="margin-bottom:10px;">${item.name}</h3>
                    <p style="font-weight:bold; color:var(--red); font-size:18px;">${item.price}</p>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <span class="btn-remove" onclick="removeItem(${index})">Xóa khỏi giỏ</span>
                </div>
                <div class="cart-item-total" style="display:flex; align-items:center;">
                    <p style="font-weight:bold; font-size:18px;">${formatPrice(itemTotal)}</p>
                </div>
            </div>
        `;
    });

    cartHTML += `</div><div class="cart-summary">
            <h3 style="margin-bottom:20px;">Tóm tắt đơn hàng</h3>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--gray);">
            <div class="cart-total-row"><span>Tổng cộng:</span><span style="color:var(--red);">${formatPrice(totalPrice)}</span></div>
            <button class="btn-checkout" onclick="window.location.href='thanhtoan.html'">TIẾN HÀNH THANH TOÁN</button>
        </div></div>`;
    cartContent.innerHTML = cartHTML;
}

// ==========================================
// 5. LOGIC TRANG THANH TOÁN
// ==========================================
function renderCheckoutPage() {
    const checkoutContainer = document.getElementById('checkout-summary-container');
    if (!checkoutContainer) return;
    if (cart.length === 0) {
        checkoutContainer.innerHTML = `<p style="text-align:center; font-size: 16px; margin-bottom: 20px;">Giỏ hàng trống.</p><button class="btn-order" style="background:var(--black);" onclick="window.location.href='index.html'">Quay lại mua sắm</button>`;
        return;
    }

    let summaryHTML = `<h3>Tóm tắt đơn hàng</h3>`;
    let totalPrice = 0;
    cart.forEach(item => {
        const itemTotal = parsePrice(item.price) * item.quantity;
        totalPrice += itemTotal;
        summaryHTML += `
            <div class="summary-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="summary-info">
                    <strong>${item.name}</strong>
                    <span style="color: #666;">Số lượng: ${item.quantity}</span><br>
                    <span style="font-weight: bold; color: var(--red); display: block; margin-top: 5px;">${formatPrice(itemTotal)}</span>
                </div>
            </div>
        `;
    });

    summaryHTML += `
        <div style="margin-top: 20px;">
            <div class="total-row"><span>Tạm tính:</span><span>${formatPrice(totalPrice)}</span></div>
            <div class="total-row"><span>Phí giao hàng:</span><span>Miễn phí</span></div>
            <div class="total-row" style="font-weight:bold; font-size:18px; border-top:1px solid var(--gray); padding-top:15px; margin-top:10px; color:var(--black);">
                <span>Tổng cộng:</span><span style="color:var(--red);">${formatPrice(totalPrice)}</span>
            </div>
        </div>
        <button class="btn-order" onclick="processPayment()">XÁC NHẬN ĐẶT HÀNG</button>
    `;
    checkoutContainer.innerHTML = summaryHTML;
}

function processPayment() {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !phone || !address) {
        Swal.fire({ icon: 'error', title: 'Thiếu thông tin', text: 'Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ giao hàng!', confirmButtonColor: '#000000', confirmButtonText: 'OK', showCloseButton: true });
        return;
    }

    Swal.fire({ icon: 'success', title: 'Đặt hàng thành công!', text: `Tuyệt vời! Đơn hàng của ${name} đã được ghi nhận. Cảm ơn bạn đã mua sắm tại Uniqlo!`, confirmButtonColor: '#FF0000', confirmButtonText: 'Về trang chủ', showCloseButton: true, timer: 3000, timerProgressBar: true }).then(() => {
        cart = []; saveCart(); window.location.href = 'index.html'; 
    });
}
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Khoảng cách mọc lên khi cuộn tới

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Gắn sự kiện lắng nghe khi cuộn chuột
    window.addEventListener('scroll', checkReveal);
    // Chạy thử 1 lần ngay khi load trang để ktra các phần tử ở trên cùng
    checkReveal(); 
}

// KHỞI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderBanner();
    renderCategoryShowcase();
    renderProducts();
    renderMensProducts(); 
    renderWomensProducts();
    renderProductDetail();
    renderCartPage();
    renderFooter();
    renderCheckoutPage();
    initScrollReveal();
});

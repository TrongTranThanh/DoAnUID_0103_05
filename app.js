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

// ==========================================
// 2. CÁC HÀM RENDER GIAO DIỆN
// ==========================================
function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const currentPath = window.location.pathname;
    const isHome = currentPath.includes('index.html') || currentPath.endsWith('/');
    const isNam = currentPath.includes('nam.html');
    const isNu = currentPath.includes('nu.html');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const headerHTML = `
        <header class="header">
            <div class="header-left">
                <a href="index.html" class="logo-link">
                    <img src="./data/images/logo.jpg" alt="Uniqlo Logo" class="logo-img">
                </a>
                <nav class="nav-links">
                    <a href="index.html" class="${isHome ? 'active' : ''}">Trang chủ</a>
                    <a href="nam.html" class="${isNam ? 'active' : ''}">Nam</a>
                    <a href="nu.html" class="${isNu ? 'active' : ''}">Nữ</a>
                </nav>
            </div>
            <div class="header-right">
                <a href="#">Thanh toán</a>
                <a href="giohang.html">Giỏ hàng <span id="cart-count" style="color:var(--red);">(${totalItems})</span></a>
                
                <!-- Khu vực Avatar và Dropdown -->
                <div class="user-menu-container" onclick="toggleUserMenu(event)">
                    <img src="./data/images/avatar.jpg" alt="Avatar" class="avatar-img" onerror="this.src='https://via.placeholder.com/35/cccccc/ffffff?text=U'">
                    <div class="user-dropdown" id="user-dropdown">
                        <a href="#" onclick="alert('Tính năng đang được phát triển!')">Thông tin tài khoản</a>
                        <a href="#" onclick="alert('Tính năng đang được phát triển!')">Đơn hàng của tôi</a>
                        <a href="dangnhap.html">Đăng nhập</a>
                        <a href="dangnhap.html" onclick="handleLogout()" style="color: var(--red);">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </header>
    `;
    headerContainer.innerHTML = headerHTML;
}

function toggleUserMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

window.addEventListener('click', function() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

function handleLogout() {
    alert('Bạn đã đăng xuất tài khoản thành công!');
}

function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    footerContainer.innerHTML = `
        <footer class="footer">
            <div>
                <strong>CÔNG TY TNHH UNIQLO VIỆT NAM</strong><br>
                Giấy chứng nhận đăng ký doanh nghiệp số 0315304731, cấp lần đầu ngày 02/10/2018.
            </div>
            <div>
                Địa chỉ trụ sở chính: Tầng 16, Saigon Centre, 67 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM.<br>
                Số Điện thoại: 028 3861 4613
            </div>
        </footer>
    `;
}

function renderBanner() {
    const bannerSection = document.getElementById('banner-container');
    if (!bannerSection) return;
    bannerSection.style.backgroundImage = `url('${bannerData.img}')`;
    bannerSection.innerHTML = `
        <div class="banner-content">
            <span class="badge">${bannerData.badge}</span>
            <h2 style="margin-bottom:10px; font-size: 28px;">${bannerData.title}</h2>
            <p style="margin-bottom:15px; color:#555; line-height:1.5;">${bannerData.desc}</p>
            <h3 style="font-size: 22px;">${bannerData.price}</h3>
        </div>
    `;
}

function renderProducts() {
    const gridContainer = document.getElementById('product-grid');
    if (!gridContainer) return;

    let productsHTML = '';
    productsData.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <div class="product-img" style="background-image: url('${product.img}')"></div>
                <div class="product-info">
                    <div class="product-category">Thời trang Nam/Nữ</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                </div>
                <!-- Hai nút Thêm giỏ hàng và Mua ngay -->
                <div class="card-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                    <button class="btn-buy-now" onclick="alert('Chức năng Mua ngay đang được phát triển!')">Mua ngay</button>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = productsHTML;
}

// ==========================================
// 3. LOGIC XỬ LÝ GIỎ HÀNG
// ==========================================
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
    
    saveCart();
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeItem(productId);
        else { saveCart(); renderCartPage(); }
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
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

    let cartHTML = `<div class="cart-layout"> <div class="cart-list">`;
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = parsePrice(item.price) * item.quantity;
        totalPrice += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.img}')"></div>
                <div class="cart-item-info">
                    <h3 style="margin-bottom:10px;">${item.name}</h3>
                    <p style="font-weight:bold; color:var(--red); font-size:18px;">${item.price}</p>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <span class="btn-remove" onclick="removeItem(${item.id})">Xóa khỏi giỏ</span>
                </div>
                <div class="cart-item-total" style="display:flex; align-items:center;">
                    <p style="font-weight:bold; font-size:18px;">${formatPrice(itemTotal)}</p>
                </div>
            </div>
        `;
    });

    cartHTML += `</div> <div class="cart-summary">
            <h3 style="margin-bottom:20px;">Tóm tắt đơn hàng</h3>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--gray);">
            <div class="cart-total-row">
                <span>Tổng cộng:</span>
                <span style="color:var(--red);">${formatPrice(totalPrice)}</span>
            </div>
            <button class="btn-checkout" onclick="alert('Tính năng thanh toán đang được phát triển!')">TIẾN HÀNH THANH TOÁN</button>
        </div>
    </div>`;
    cartContent.innerHTML = cartHTML;
}

// KHỞI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderBanner();
    renderProducts();
    renderCartPage();
    renderFooter();
});
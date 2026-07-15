// Hàm chuyển đổi từ Màn hình Home (Landing) sang Giao diện Split và ngược lại
function navigateTo(targetView) {
    // Ẩn màn hình landing chính
    document.getElementById('screen-landing').classList.remove('active');
    
    // Hiển thị khung bố cục chia đôi
    document.getElementById('screen-split').classList.add('active');
    
    // Kích hoạt subview tương ứng bên trong panel phải
    switchSubView(targetView);
}

// Hàm hoán đổi các khung nhỏ bên trong thanh Sidebar bên phải
function switchSubView(viewKey) {
    // 1. Ẩn toàn bộ các subview hiện tại
    const subviews = document.querySelectorAll('.subview');
    subviews.forEach(view => view.classList.remove('active'));
    
    // 2. Bỏ trạng thái active trên tất cả các tab menu sidebar
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // 3. Hiển thị subview mục tiêu
    const targetSubview = document.getElementById(`subview-${viewKey}`);
    if (targetSubview) {
        targetSubview.classList.add('active');
    }
    
    // 4. Highlight thanh menu tương ứng (Không áp dụng cho view trung gian 'themthe')
    const targetMenu = document.getElementById(`menu-${viewKey}`);
    if (targetMenu) {
        targetMenu.classList.add('active');
    } else if (viewKey === 'themthe') {
        // Nếu đang ở màn hình Thêm thẻ mới, vẫn giữ active ở tab 'Thẻ của tôi'
        document.getElementById('menu-the').classList.add('active');
    }
}

// Quay về màn hình Menu tổng khi click vào Logo Uniqlo
function goHome() {
    document.getElementById('screen-split').classList.remove('active');
    document.getElementById('screen-landing').classList.add('active');
}
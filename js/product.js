// ===== 1. DATA: 8 sản phẩm (lấy từ products.html cũ) =====
const products = [
    {
        id: "bo-034",
        name: "Bơ 034",
        desc: "Bơ sáp béo dẻo, hái trực tiếp từ vườn theo đơn đặt hàng.",
        price: 39000,
        unit: "1Kg",
        img: "assets/images/bo.png",
        alt: "Bơ 034 tươi hái từ vườn nông dân Việt Nam",
        category: "Trái cây",
        hot: true,
    },
    {
        id: "chuoi-rung",
        name: "Chuối Rừng Tây Nguyên",
        desc: "Chuối rừng sấy nguyên trái, vị ngọt tự nhiên, dai bùi đặc trưng.",
        price: 500000,
        unit: "1Kg",
        img: "assets/images/chuoi-rung.png",
        alt: "Chuối rừng Tây Nguyên đóng gói 1kg",
        category: "Trái cây",
        hot: false,
    },
    {
        id: "hat-dieu",
        name: "Hạt Điều Rang Muối",
        desc: "Hạt điều rang giòn, ướp muối vừa ăn, không dùng chất bảo quản.",
        price: 200000,
        unit: "Hộp",
        img: "assets/images/hat-dieu.png",
        alt: "Hạt điều rang muối đóng hộp 500g",
        category: "Hạt / Sấy khô",
        hot: false,
    },
    {
        id: "mac-ca",
        name: "Hạt Mắc Ca Nứt Vỏ",
        desc: "Mắc ca nứt vỏ sẵn, nhân béo bùi, thu hoạch tại nông trại Tây Nguyên.",
        price: 300000,
        unit: "1Kg",
        img: "assets/images/mac-ca.png",
        alt: "Hạt mắc ca nứt vỏ Tây Nguyên",
        category: "Hạt / Sấy khô",
        hot: false,
    },
    {
        id: "mang-kho",
        name: "Măng Khô",
        desc: "Măng rừng phơi khô tự nhiên, giữ trọn vị đậm đà đặc trưng núi rừng.",
        price: 400000,
        unit: "1Kg",
        img: "assets/images/mang-kho.png",
        alt: "Măng khô Tây Nguyên đóng gói 1kg",
        category: "Khác",
        hot: true,
    },
    {
        id: "mat-ong-rung",
        name: "Mật Ong Rừng Tự Nhiên",
        desc: "Mật ong nguyên chất khai thác từ rừng nguyên sinh, không pha tạp.",
        price: 600000,
        unit: "1L",
        img: "assets/images/mat-ong-rung.png",
        alt: "Mật ong rừng tự nhiên Tây Nguyên đóng chai 1 lít",
        category: "Khác",
        hot: true,
    },
    {
        id: "mit-say-thang-hoa",
        name: "Mít Sấy Thăng Hoa",
        desc: "Mít sấy giữ nguyên hương vị và dinh dưỡng nhờ công nghệ sấy thăng hoa.",
        price: 250000,
        unit: "1Kg",
        img: "assets/images/mit-say-thang-hoa.png",
        alt: "Mít sấy thăng hoa Tây Nguyên đóng gói 1kg",
        category: "Hạt / Sấy khô",
        hot: false,
    },
    {
        id: "tieu-do",
        name: "Tiêu Đỏ Tây Nguyên",
        desc: "Hạt tiêu đỏ chín cây, cay nồng, thơm đặc trưng đất đỏ bazan.",
        price: 80000,
        unit: "Lọ",
        img: "assets/images/tieu-do.png",
        alt: "Tiêu đỏ Tây Nguyên đóng lọ 500g",
        category: "Gia vị",
        hot: false,
    },
];

let cart = [];

let currentCategories = ["all"];
let currentSearch = "";

function formatPrice(n) {
    return n.toLocaleString("vi-VN") + " VNĐ";
}

function renderProductCard(product) {
    return `
    <article class="product-card" data-id="${product.id}">
      ${product.hot ? '<span class="hot-tag">Bán chạy</span>' : ""}
      <img src="${product.img}" alt="${product.alt}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <span class="price">${formatPrice(product.price)} / ${product.unit}</span>
      <div class="card-footer">
        <a href="product-detail.html">Xem chi tiết</a>
        <button type="button" class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
      </div>
    </article>
  `;
}

function renderProducts(list) {
    const grid = document.getElementById("productGrid");
    if (list.length === 0) {
        grid.innerHTML = `<p>Không tìm thấy sản phẩm phù hợp.</p>`;
        return;
    }
    grid.innerHTML = list.map(renderProductCard).join("");
}

function getFilteredProducts() {
    return products.filter((p) => {
        const matchCategory =
            currentCategories.includes("all") || currentCategories.includes(p.category);
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });
}

function updateProductList() {
    renderProducts(getFilteredProducts());
}

function searchProductByName(keyword) {
    currentSearch = keyword.trim();
    updateProductList();
}

function setupFilterCheckboxes() {
    const checkboxes = document.querySelectorAll(".filter-cb");
    const allCb = document.querySelector('.filter-cb[data-category="all"]');

    checkboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
            if (cb.dataset.category === "all") {
                checkboxes.forEach((c) => {
                    if (c !== cb) c.checked = false;
                });
                currentCategories = ["all"];
            } else {
                allCb.checked = false;
                const checked = Array.from(checkboxes)
                    .filter((c) => c.dataset.category !== "all" && c.checked)
                    .map((c) => c.dataset.category);
                currentCategories = checked.length ? checked : ["all"];
                if (!checked.length) allCb.checked = true;
            }
            updateProductList();
        });
    });
}

function addToCart(id) {
    const item = cart.find((c) => c.id === id);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id, qty: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter((c) => c.id !== id);
    renderCart();
}

function changeQty(id, delta) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    renderCart();
}

function renderCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");
    const cartCountEl = document.getElementById("cartCount");

    let total = 0;
    let totalQty = 0;

    cartItemsEl.innerHTML = cart
        .map((c) => {
            const product = products.find((p) => p.id === c.id);
            const lineTotal = product.price * c.qty;
            total += lineTotal;
            totalQty += c.qty;
            return `
        <li class="cart-item" data-id="${c.id}">
          <img src="${product.img}" alt="${product.alt}">
          <div class="cart-item-info">
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-price">${formatPrice(lineTotal)}</span>
          </div>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn" data-id="${c.id}" data-delta="-1">-</button>
            <span>${c.qty}</span>
            <button type="button" class="qty-btn" data-id="${c.id}" data-delta="1">+</button>
          </div>
          <button type="button" class="cart-remove-btn" data-id="${c.id}">&times;</button>
        </li>
      `;
        })
        .join("");

    cartTotalEl.textContent = formatPrice(total);
    cartCountEl.textContent = totalQty;
}

function setupAddToCart() {
    document.getElementById("productGrid").addEventListener("click", (e) => {
        const btn = e.target.closest(".add-to-cart-btn");
        if (!btn) return;
        addToCart(btn.dataset.id);
    });
}

function setupCartControls() {
    document.getElementById("cartItems").addEventListener("click", (e) => {
        const qtyBtn = e.target.closest(".qty-btn");
        if (qtyBtn) {
            changeQty(qtyBtn.dataset.id, Number(qtyBtn.dataset.delta));
            return;
        }
        const removeBtn = e.target.closest(".cart-remove-btn");
        if (removeBtn) {
            removeFromCart(removeBtn.dataset.id);
        }
    });
}

function setupCartToggle() {
    const panel = document.getElementById("cartPanel");
    document.getElementById("cartToggle").addEventListener("click", () => {
        panel.classList.toggle("open");
    });
    document.getElementById("cartClose").addEventListener("click", () => {
        panel.classList.remove("open");
    });
}

function setupSearch() {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        searchProductByName(input.value);
    });
    input.addEventListener("input", () => searchProductByName(input.value));
}

function validateForm() {
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();

    const nameError = document.getElementById("custNameError");
    const phoneError = document.getElementById("custPhoneError");
    const addressError = document.getElementById("custAddressError");

    nameError.textContent = "";
    phoneError.textContent = "";
    addressError.textContent = "";

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Vui lòng nhập họ tên.";
        isValid = false;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Số điện thoại không hợp lệ (VD: 0912345678).";
        isValid = false;
    }

    if (address === "") {
        addressError.textContent = "Vui lòng nhập địa chỉ.";
        isValid = false;
    }

    return isValid;
}

function setupOrderForm() {
    document.getElementById("orderForm").addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống, hãy thêm sản phẩm trước khi đặt hàng.");
            return;
        }

        // TODO: gửi cart + thông tin khách hàng lên server tại đây
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");

        cart = [];
        renderCart();
        e.target.reset();
        document.getElementById("cartPanel").classList.remove("open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateProductList();
    setupFilterCheckboxes();
    setupAddToCart();
    setupCartControls();
    setupCartToggle();
    setupSearch();
    setupOrderForm();
    renderCart();
});
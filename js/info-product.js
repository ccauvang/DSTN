const JSON_PATH = '../data/products.json';
const IMG_PREFIX = '../';

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    return isNaN(id) ? 0 : id;
}

function renderProduct(product) {
    const wrap = document.getElementById('info-product-wrap');
    wrap.innerHTML = `
        <div class="left">
            <img src="${IMG_PREFIX}${product.image}" alt="${product.name}">
        </div>
        <div class="right">
            <h1>${product.name}</h1>
            <div class="product-price">${product.price}</div>
            <button class="buy-btn" id="buy-btn">Mua Ngay</button>
        </div>
    `;

    const table = document.getElementById('info-table');
    table.innerHTML = `
        <tr><td>Xuất xứ</td><td>${product.info['brand']}</td></tr>
        <tr><td>Hạn sử dụng</td><td>${product.info['date']}</td></tr>
        <tr><td>Sản xuất tại</td><td>${product.info['made-in']}</td></tr>
        <tr><td>Khối lượng</td><td>${product.info['weight']}</td></tr>
    `;
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getIdFromUrl();

    fetch(JSON_PATH)
        .then(res => res.json())
        .then(data => {
            const product = data.find(p => p.id === id) || data[0];
            renderProduct(product);

            document.getElementById('buy-btn').addEventListener('click', showToast);
        })
        .catch(err => console.error('Load product fail:', err));
});
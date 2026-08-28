const JSON_PATH = '../data/products.json';
const IMG_PREFIX = '../';

let allProducts = [];

function buildCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.type = product.type;

    card.innerHTML = `
        ${product.isHot ? '<span class="hot-tag">Bán Chạy</span>' : ''}
        <a href="info-product.html?id=${product.id}">
            <img src="${IMG_PREFIX}${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
        </a>
        <button class="buy-btn" data-id="${product.id}">Mua Ngay</button>
    `;

    return card;
}

function renderProducts(list) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    list.forEach(p => grid.appendChild(buildCard(p)));
}

function filterByType(type) {
    document.getElementById('products').classList.remove('hidden');
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });

    const filtered = type === 'all' ? allProducts : allProducts.filter(p => p.type === type);
    renderProducts(filtered);
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(JSON_PATH)
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            renderProducts(allProducts);
        })
        .catch(err => console.error('Load products fail:', err));

    // nav dropdown -> filter + scroll to product section
    document.querySelectorAll('.dropdown-menu li').forEach(li => {
        li.addEventListener('click', () => filterByType(li.dataset.type));
    });

    // filter bar buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterByType(btn.dataset.type));
    });

    // buy now (event delegation, cards render dynamically)
    document.getElementById('product-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) {
            e.preventDefault();
            showToast();
        }
    });
});
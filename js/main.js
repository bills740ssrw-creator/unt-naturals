// UNT Naturals - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initFilters();
  initModals();
  initHeader();
  initForms();
  initSmoothScroll();
});

// ===== Cart Functionality =====
let cart = [];

function initCart() {
  const cartBtn = document.querySelector('.cart-btn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.querySelector('.cart-close');

  cartBtn?.addEventListener('click', () => cartSidebar.classList.add('open'));
  cartClose?.addEventListener('click', () => cartSidebar.classList.remove('open'));

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      addToCart(name, price);
    });
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showToast(`${name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.querySelector('.cart-count');
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  countEl.textContent = cart.length;

  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    totalEl.textContent = '₹0';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img"></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">₹${item.price}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = `₹${total}`;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ===== Product Filters =====
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      products.forEach(product => {
        if (filter === 'all' || product.dataset.category === filter) {
          product.style.display = '';
          product.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

// ===== Quick View Modal =====
function initModals() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const img = card.querySelector('.product-image img').src;
      const category = card.querySelector('.product-category').textContent;
      const name = card.querySelector('.product-name').textContent;
      const desc = card.querySelector('.product-desc').textContent;
      const price = card.querySelector('.product-price').textContent;

      modal.querySelector('.modal-image img').src = img;
      modal.querySelector('.modal-image img').alt = name;
      modal.querySelector('.modal-info h2').textContent = name;
      modal.querySelector('.modal-info .product-category').textContent = category;
      modal.querySelector('.modal-desc').textContent = desc;
      modal.querySelector('.modal-price').textContent = price;

      modal.classList.add('open');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  backdrop.addEventListener('click', () => modal.classList.remove('open'));
}

// ===== Header Scroll Effect =====
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== Forms =====
function initForms() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! (Demo - form will connect to real backend)');
      form.reset();
    });
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
// Luxurious furniture site interactions (pure JS)
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

const productsData = [
  {
    id:1,
    name:'Elysian Sofa',
    price:450000,
    desc:'Hand-stitched full-leather sofa with walnut legs. Seats 3 comfortably.',
    imgSVG: createProductSVG('#b89b7a','#cfa883','Elysian'),
    imgPath: 'assets/images/blue_chair.jpg'
  },
  {
    id:2,
    name:'Capri Dining Chairs (Set of 4)',
    price:220000,
    desc:'Comfortable dining chairs with a curved profile.',
    imgSVG: createProductSVG('#8b6b48','#d6b892','Capri'),
    imgPath: 'assets/images/yellow_chair.jpg'
  },
  {
    id:3,
    name:'Marquis Dining Table',
    price:610000,
    desc:'Solid teak dining table — mid-century profile, seats 8.',
    imgSVG: createProductSVG('#a07854','#e0caa3','Marquis'),
    imgPath: 'assets/images/gold_dining.jpg'
  },
  {
    id:4,
    name:'Serene Bedframe',
    price:780000,
    desc:'Upholstered king bed with storage and silk headboard.',
    imgSVG: createProductSVG('#6f4f38','#c9a57f','Serene'),
    imgPath: 'assets/images/blue_bed.jpg'
  },
  {
    id:5,
    name:'Isla Prep Island',
    price:420000,
    desc:'Prep island with integrated storage and seating.',
    imgSVG: createProductSVG('#d6b892','#a07854','Isla'),
    imgPath: 'assets/images/wooden_kitchen.jpg'
  },
  {
    id:6,
    name:'Haven Lounger',
    price:150000,
    desc:'Lightweight outdoor lounger with weatherproof weave.',
    imgSVG: createProductSVG('#8b6b48','#c9a57f','Haven'),
    imgPath: 'assets/images/red_blue.jpg'
  },
  {
    id:7,
    name:'Aria Nightstand',
    price:95000,
    desc:'Compact nightstand with soft-close drawer.',
    imgSVG: createProductSVG('#cfa883','#b89b7a','Aria'),
    imgPath: 'assets/images/white_bed.jpg'
  }
];

function createProductSVG(color1, color2, label){
  return `
  <svg width="320" height="180" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label} image">
    <defs>
      <linearGradient id="grad${label}" x1="0" x2="1">
        <stop offset="0" stop-color="${color1}"/>
        <stop offset="1" stop-color="${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="12" fill="url(#grad${label})" />
    <g transform="translate(24,70)">
      <rect x="0" y="0" width="110" height="48" rx="10" fill="#fff" opacity="0.08"/>
      <rect x="125" y="-6" width="150" height="60" rx="10" fill="#fff" opacity="0.06"/>
    </g>
    <text x="18" y="28" font-family="Georgia, serif" font-size="18" fill="#ffffff" opacity="0.95">${label}</text>
  </svg>`;
}

const productsEl = document.getElementById('products');

function formatCurrency(n){ return '₦' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function renderProducts(){
  if(!productsEl) return;
  productsEl.innerHTML = '';
  productsData.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    const imgHtml = p.imgPath ? `<img src="${p.imgPath}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">` : p.imgSVG;
    card.innerHTML = `
      <div class="badge-small">Limited</div>
      <div class="product-visual">${imgHtml}</div>
      <h4 class="product-title">${p.name}</h4>
      <div class="product-price">${formatCurrency(p.price)}</div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button id="view-btn-${p.id}" class="btn" data-id="${p.id}" onclick="openModal(${p.id})">View</button>
        <button id="add-btn-${p.id}" class="btn primary" onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    `;
    productsEl.appendChild(card);
  });
}

renderProducts();

/* Modal */
let cart = [];
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModal');
function openModal(id){
  const p = productsData.find(x=>x.id===id);
  if(!p){ return; }
  if(modalBody){
    const largeImg = p.imgPath ? `<img src="${p.imgPath}" alt="${p.name}" style="width:100%;height:auto;border-radius:10px;box-shadow:var(--shadow)">` : p.imgSVG;
    modalBody.innerHTML = `
      <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
        <div style="flex:1;min-width:280px">${largeImg}</div>
        <div style="flex:1;min-width:260px">
          <h2 style="margin-top:0">${p.name}</h2>
          <p style="color:#6b5b50">${p.desc}</p>
          <p style="font-weight:700">${formatCurrency(p.price)}</p>
          <div style="margin-top:12px;display:flex;gap:8px">
            <button class="btn primary" onclick="addToCart(${p.id}); closeModal();">Add to cart</button>
            <button class="btn" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  } else {
    // fallback for pages without modal: show quick alert
    alert(p.name + " — " + p.desc + " — " + formatCurrency(p.price));
    return;
  }
  if(modal){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
}
function closeModal(){ if(modal){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } }
if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

/* Cart */
const cartPanel = document.getElementById('cartPanel');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
if(cartBtn && cartPanel){ cartBtn.addEventListener('click', ()=>{ cartPanel.classList.add('open'); cartPanel.setAttribute('aria-hidden','false'); }); }
if(closeCart && cartPanel){ closeCart.addEventListener('click', ()=>{ cartPanel.classList.remove('open'); cartPanel.setAttribute('aria-hidden','true'); }); }

function addToCart(id){
  const p = productsData.find(x=>x.id===id);
  if(!p) return;
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.q += 1; } else { cart.push({id:id,name:p.name,price:p.price,q:1,svg:p.imgSVG}); }
  updateCartUI();
  flashCartCount();
}

function updateCartUI(){
  if(cartItemsEl) cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.q;
    const div = document.createElement('div'); div.className = 'cart-item';
    div.innerHTML = `
      <div style="flex:0 0 72px">${item.svg}</div>
      <div style="flex:1">
        <div style="font-weight:700">${item.name}</div>
        <div style="color:#6b5b50">${formatCurrency(item.price)} · Qty: ${item.q}</div>
        <div style="margin-top:8px"><button class="btn" onclick="decrease(${item.id})">−</button> <button class="btn" onclick="increase(${item.id})">+</button> <button class="btn" onclick="removeItem(${item.id})">Remove</button></div>
      </div>
    `;
    if(cartItemsEl) cartItemsEl.appendChild(div);
  });
  if(cartCountEl) cartCountEl.textContent = cart.reduce((s,i)=>s+i.q,0);
  if(cartTotalEl) cartTotalEl.textContent = formatCurrency(total);
}

function increase(id){ const it = cart.find(i=>i.id===id); if(it){ it.q++; updateCartUI(); } }
function decrease(id){ const it = cart.find(i=>i.id===id); if(it){ it.q = Math.max(1,it.q-1); updateCartUI(); } }
function removeItem(id){ cart = cart.filter(i=>i.id!==id); updateCartUI(); }
function flashCartCount(){ if(cartCountEl && cartCountEl.animate){ cartCountEl.animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:350}); } }

/* Modal close on outside click */
if(modal){ modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); }); }

/* Signup */
const signupForm = document.getElementById('signupForm');
if(signupForm){ signupForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const em = document.getElementById('emailInput') ? document.getElementById('emailInput').value : '';
  alert('Thanks — ' + em + ' added to our list.');
}); }

/* Accessibility: keyboard */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ closeModal(); if(cartPanel) cartPanel.classList.remove('open'); }
});

/* Simple search (header) */
const searchBtn = document.getElementById('searchBtn');
if(searchBtn){ searchBtn.addEventListener('click', ()=>{
  const q = prompt('Search products — type a name');
  if(!q) return;
  const found = productsData.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));
  if(found.length===0){ alert('No results'); return; }
  openModal(found[0].id);
}); }

/* Checkout button (demo) */
const checkoutBtn = document.getElementById('checkoutBtn');
if(checkoutBtn){ checkoutBtn.addEventListener('click', ()=>{
  if(cart.length===0){ alert('Your cart is empty'); return; }
  alert('Checkout demo — we would redirect to a secure checkout.');
}); }

/* small helpers */
if(cartCountEl) cartCountEl.textContent = '0';

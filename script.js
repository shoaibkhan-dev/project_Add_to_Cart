const products = [
  { id: 1, name: "Samsung Z Flip 3", price: 210000, image: "https://learning-axis.com/wp-content/uploads/2025/05/gg-1.webp" },
  { id: 2, name: "Airpods Pro", price: 35000, image: "https://learning-axis.com/wp-content/uploads/2025/05/hh-2.webp" },
  { id: 3, name: "Canon DSLR Camera", price: 150000, image: "https://learning-axis.com/wp-content/uploads/2025/05/ee-3.webp" },
  { id: 4, name: "Dragon HeadPhone", price: 45000, image: "https://learning-axis.com/wp-content/uploads/2025/05/aa-1.webp" },
];


const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartIcon = document.getElementById("cart-icon");
const cartItems = document.getElementById("cart-items");
const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []; 
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCount) cartCount.textContent = count;
}

function getCart(){
   return JSON.parse(localStorage.getItem("cart"))
}

function setCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart))
}

function renderProducts() {
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Rs ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  let cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index > -1) {
    cart[index].qty++;
  } else {
    const product = products.find((p) => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }
  setCart(cart);
  updateCartCount();
}

function renderCart() {
  if (!cartItems) return;
  let cart = getCart();
  cartItems.innerHTML = "";
  let totalQ = 0;
  let totalP = 0;

  cart.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        Rs ${item.price} x ${item.qty}
      </div>
      <div>
        <button class="qty" onclick="changeQty(${idx}, -1)">-</button>
        <button class="qty" onclick="changeQty(${idx}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(div);
    totalQ += item.qty;
    totalP += item.qty * item.price;
  });

  if (totalQty) totalQty.textContent = totalQ;
  if (totalPrice) totalPrice.textContent = totalP;
}

function changeQty(index, delta) {
  let cart = getCart();
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  setCart(cart);
  renderCart();
  updateCartCount();
}

// Init
if (productList) {
  renderProducts();
  updateCartCount();
  cartIcon.onclick = () => (window.location.href = "cart.html");
} else if (cartItems) {
  renderCart();
  updateCartCount();
}


function renderCart() {
  if (!cartItems) return;
  let cart = getCart();
  cartItems.innerHTML = "";
  let totalQ = 0;
  let totalP = 0;

  cart.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-content">
        <strong>${item.name}</strong><br>
        Rs ${item.price} x ${item.qty}
      </div>
      <div>
        <button class="qty" onclick="changeQty(${idx}, -1)">-</button>
        <button class="qty" onclick="changeQty(${idx}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(div);
    totalQ += item.qty;
    totalP += item.qty * item.price;
  });

  if (totalQty) totalQty.textContent = totalQ;
  if (totalPrice) totalPrice.textContent = totalP;
}


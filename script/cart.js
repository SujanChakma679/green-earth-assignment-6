// All plants button
const allPlantsBtn = document.getElementById('all-plants-btn');

// Plants container (your product cards)
const allPlants = document.getElementById('cart-container');

// Cart container (new: where cart items will be shown)
const cartContainer = document.getElementById('cart-items');

// Total price element
const totalEl = document.getElementById('cart-total');

// Cart array
let cart = [];

// ===================== FETCH & DISPLAY PRODUCTS =====================
const loadAllPlants = () => {
  manageSpinner(true);

  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      allPlantsBtn.classList.add('active');
      displayAllPlants(json.plants);
      manageSpinner(false);
    });
};

const displayAllPlants = (trees) => {
  allPlants.innerHTML = ""; 

  for (let tree of trees) {
    const plant = document.createElement('div');
    plant.innerHTML = `
      <div class="p-2 mb-4 bg-white rounded-lg">
        <div class="space-y-2">
          <img class="md:h-[150px] w-auto" src="${tree.image}" alt="" />
          <h1 onclick="loadPlantsDetails(${tree.id})" class="font-bold">${tree.name}</h1>
          <p class="md:text-[10px] md:h-[100px]">${tree.description}</p>
        </div>
        <div class="flex justify-between items-center pb-2">
          <h3 class="font-semibold bg-green-200 text-green-600 text-[10px] rounded-3xl p-2">
            ${tree.category}
          </h3>
          <p>$<span>${tree.price}</span></p>
        </div>
        <button class="add-btn btn w-full bg-green-600 text-white rounded-3xl" 
                onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">
          Add to Cart
        </button>
      </div>
    `;
    allPlants.appendChild(plant);
  }
};

// ===================== CART FUNCTIONS =====================
function addToCart(id, name, price) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  displayCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    displayCart();
  }
}

function clearCart() {
  cart = [];
  displayCart();
}

// ===================== RENDER CART =====================
function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-500'>Cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = "flex justify-between items-center border-b py-2";
      div.innerHTML = `
        <div>
          <p class="font-medium">${item.name}</p>
          <p class="text-sm text-gray-500">$${item.price} × ${item.qty} = $${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <div>
          <button class="px-2 bg-green-500 text-white rounded" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="px-2 bg-yellow-500 text-white rounded" onclick="changeQty(${item.id}, -1)">-</button>
          <button class="px-2 bg-red-500 text-white rounded" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartContainer.appendChild(div);
    });
  }

  updateTotal();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalEl.innerText = "Total: $" + total.toFixed(2);
}

// ===================== START =====================
loadAllPlants();

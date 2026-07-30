/* ===================================
   THE ANIME STORE v2.0
   CART.JS
=================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

/* Update Cart Count */

function updateCartCount() {
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

/* Save Cart */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Calculate Total */

function calculateTotal() {

    let sum = 0;

    cart.forEach(item => {

        const qty = item.quantity || 1;

        sum += item.price * qty;

    });

    subtotal.innerText = `₹${sum}`;
    total.innerText = `₹${sum}`;
}

/* Render Cart */

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div class="empty-cart">
            <h2>🛒 Your cart is empty</h2>
            <p>Add some amazing anime products.</p>
        </div>
        `;

        calculateTotal();
        updateCartCount();
        return;
    }

    cart.forEach((item, index) => {

        if (!item.quantity) item.quantity = 1;

        const card = document.createElement("div");

        card.className = "cart-card";

        card.innerHTML = `

        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">

            <div>

                <h3>${item.name}</h3>

                <div class="cart-category">

                    ${item.category}

                </div>

                <div class="cart-price">

                    ₹${item.price}

                </div>

            </div>

            <div class="quantity">

                <button onclick="decrease(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increase(${index})">+</button>

            </div>

            <button class="remove-btn"

            onclick="removeItem(${index})">

            🗑 Remove

            </button>

        </div>

        `;

        cartItems.appendChild(card);

    });

    calculateTotal();
    updateCartCount();
}

/* Increase Quantity */

function increase(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

/* Decrease Quantity */

function decrease(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    saveCart();

    renderCart();

}

/* Remove Item */

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

/* Coupon */

document.getElementById("applyCoupon").onclick=function(){

    const code=document.getElementById("coupon").value;

    let sum=0;

    cart.forEach(item=>{

        sum+=item.price*(item.quantity||1);

    });

    if(code==="ANIME20"){

        const discount=sum*0.20;

        total.innerText=`₹${sum-discount}`;

        alert("🎉 Coupon Applied!");

    }

    else{

        alert("❌ Invalid Coupon");

    }

}

/* Start */

renderCart();

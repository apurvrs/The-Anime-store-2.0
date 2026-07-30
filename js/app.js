/* ===========================
   THE ANIME STORE v2.0
   APP.JS
=========================== */

// Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Elements

const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cartCount");

// Update Cart Counter

function updateCartCount(){

    if(cartCount){

        cartCount.innerText = cart.length;

    }

}

// Render Products

function renderProducts(productList = products){

    if(!productsContainer) return;

    productsContainer.innerHTML = "";

    productList.forEach(product=>{

        const card = document.createElement("div");

        card.className = "product";

        card.innerHTML = `

        <div class="badge">${product.badge}</div>

        <div class="wishlist" data-id="${product.id}">
        ❤️
        </div>

        <img src="${product.image}" alt="${product.name}">

        <div class="product-content">

            <div class="product-category">

                ${product.category}

            </div>

            <h3>${product.name}</h3>

            <div class="product-rating">

                ⭐ ${product.rating}

            </div>

            <div class="product-price">

                ₹${product.price}

            </div>

            <div class="product-buttons">

                <button class="view-product"
                data-id="${product.id}">
                View
                </button>

                <button class="add-cart"
                data-id="${product.id}">
                Add Cart
                </button>

            </div>

        </div>

        `;

        productsContainer.appendChild(card);

    });

}

// Add To Cart

document.addEventListener("click",function(e){

    if(e.target.classList.contains("add-cart")){

        const id = Number(e.target.dataset.id);

        const product = products.find(p=>p.id===id);

        cart.push(product);

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

        updateCartCount();

        e.target.innerText = "✓ Added";

        setTimeout(()=>{

            e.target.innerText="Add Cart";

        },1200);

    }

});

// Wishlist

document.addEventListener("click",function(e){

    if(e.target.classList.contains("wishlist")){

        const id = Number(e.target.dataset.id);

        const product = products.find(p=>p.id===id);

        const exists = wishlist.find(item=>item.id===id);

        if(!exists){

            wishlist.push(product);

            e.target.innerHTML="💖";

        }else{

            wishlist = wishlist.filter(item=>item.id!==id);

            e.target.innerHTML="❤️";

        }

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

    }

});

// Product Page

document.addEventListener("click",function(e){

    if(e.target.classList.contains("view-product")){

        const id = e.target.dataset.id;

        localStorage.setItem("selectedProduct",id);

        window.location.href="product.html";

    }

});

// Search

const search = document.getElementById("search");

if(search){

search.addEventListener("input",()=>{

const keyword =

search.value.toLowerCase();

const filtered =

products.filter(product=>

product.name

.toLowerCase()

.includes(keyword)

||

product.category

.toLowerCase()

.includes(keyword)

||

product.anime

.toLowerCase()

.includes(keyword)

);

renderProducts(filtered);

});

}

// Category Filter

const category = document.getElementById("category");

if(category){

category.addEventListener("change",()=>{

const value = category.value;

if(value==="All"){

renderProducts(products);

return;

}

const filtered =

products.filter(

product=>product.category===value

);

renderProducts(filtered);

});

}

// Price Sort

const sort = document.getElementById("sort");

if(sort){

sort.addEventListener("change",()=>{

let sorted=[...products];

if(sort.value==="low"){

sorted.sort((a,b)=>a.price-b.price);

}

if(sort.value==="high"){

sorted.sort((a,b)=>b.price-a.price);

}

renderProducts(sorted);

});

}

// Initialize

updateCartCount();

renderProducts();

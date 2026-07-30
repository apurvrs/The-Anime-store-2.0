/* ===========================
   THE ANIME STORE v2.0
   WISHLIST.JS
=========================== */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("wishlistContainer");
const clearBtn = document.getElementById("clearWishlist");
const cartCount = document.getElementById("cartCount");

/* Update Cart Counter */

function updateCartCount(){

    if(cartCount){

        cartCount.innerText = cart.length;

    }

}

/* Render Wishlist */

function renderWishlist(){

    container.innerHTML = "";

    if(wishlist.length === 0){

        container.innerHTML = `
        <div class="empty">
            <h2>❤️ Your wishlist is empty</h2>
            <p>Browse the shop and add your favourite anime products.</p>
        </div>
        `;

        return;
    }

    wishlist.forEach(product=>{

        const card = document.createElement("div");

        card.className = "wishlist-card";

        card.innerHTML = `

        <img src="${product.image}" alt="${product.name}">

        <div class="wishlist-content">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <div class="wishlist-price">
                ₹${product.price}
            </div>

            <div class="wishlist-buttons">

                <button
                class="move-cart"
                data-id="${product.id}">
                🛒 Move to Cart
                </button>

                <button
                class="remove"
                data-id="${product.id}">
                🗑 Remove
                </button>

            </div>

        </div>

        `;

        container.appendChild(card);

    });

}

/* Remove Item */

document.addEventListener("click",function(e){

    if(e.target.classList.contains("remove")){

        const id = Number(e.target.dataset.id);

        wishlist = wishlist.filter(item=>item.id!==id);

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

        renderWishlist();

    }

});

/* Move To Cart */

document.addEventListener("click",function(e){

    if(e.target.classList.contains("move-cart")){

        const id = Number(e.target.dataset.id);

        const product = wishlist.find(item=>item.id===id);

        if(product){

            cart.push(product);

            wishlist = wishlist.filter(item=>item.id!==id);

            localStorage.setItem("cart",JSON.stringify(cart));
            localStorage.setItem("wishlist",JSON.stringify(wishlist));

            updateCartCount();

            renderWishlist();

            alert("✅ Product moved to Cart");

        }

    }

});

/* Clear Wishlist */

clearBtn.addEventListener("click",()=>{

    if(confirm("Clear your wishlist?")){

        wishlist = [];

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

        renderWishlist();

    }

});

/* Start */

updateCartCount();

renderWishlist();

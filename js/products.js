const products = [
{
    id:1,
    name:"Naruto Premium Hoodie",
    category:"Hoodies",
    anime:"Naruto",
    price:1999,
    image:"images/products/naruto-hoodie.jpg",
    rating:5,
    badge:"NEW"
},
{
    id:2,
    name:"Akatsuki Hoodie",
    category:"Hoodies",
    anime:"Naruto",
    price:2199,
    image:"images/products/akatsuki-hoodie.jpg",
    rating:5,
    badge:"HOT"
},
{
    id:3,
    name:"Gojo Oversized T-Shirt",
    category:"T-Shirts",
    anime:"Jujutsu Kaisen",
    price:999,
    image:"images/products/gojo-tshirt.jpg",
    rating:4.8,
    badge:"SALE"
},
{
    id:4,
    name:"Sukuna Hoodie",
    category:"Hoodies",
    anime:"Jujutsu Kaisen",
    price:2499,
    image:"images/products/sukuna-hoodie.jpg",
    rating:5,
    badge:"NEW"
},
{
    id:5,
    name:"Luffy Hoodie",
    category:"Hoodies",
    anime:"One Piece",
    price:2099,
    image:"images/products/luffy-hoodie.jpg",
    rating:5,
    badge:"HOT"
},
{
    id:6,
    name:"Zoro T-Shirt",
    category:"T-Shirts",
    anime:"One Piece",
    price:1099,
    image:"images/products/zoro-shirt.jpg",
    rating:4.9,
    badge:"NEW"
},
{
    id:7,
    name:"One Piece Figure",
    category:"Figures",
    anime:"One Piece",
    price:3499,
    image:"images/products/luffy-figure.jpg",
    rating:5,
    badge:"LIMITED"
},
{
    id:8,
    name:"Levi Figure",
    category:"Figures",
    anime:"Attack on Titan",
    price:3299,
    image:"images/products/levi-figure.jpg",
    rating:5,
    badge:"HOT"
},
{
    id:9,
    name:"Mikasa Figure",
    category:"Figures",
    anime:"Attack on Titan",
    price:3399,
    image:"images/products/mikasa-figure.jpg",
    rating:4.9,
    badge:"NEW"
},
{
    id:10,
    name:"Demon Slayer Poster",
    category:"Posters",
    anime:"Demon Slayer",
    price:499,
    image:"images/products/demonslayer-poster.jpg",
    rating:4.8,
    badge:"SALE"
},
{
    id:11,
    name:"Tanjiro Hoodie",
    category:"Hoodies",
    anime:"Demon Slayer",
    price:2299,
    image:"images/products/tanjiro-hoodie.jpg",
    rating:5,
    badge:"HOT"
},
{
    id:12,
    name:"Anime Gaming Headset",
    category:"Accessories",
    anime:"Gaming",
    price:4299,
    image:"images/products/headset.jpg",
    rating:5,
    badge:"BEST"
}
];

/* ===================================
   PRODUCT PAGE LOGIC
=================================== */

// Get selected product ID from localStorage
const selectedId = Number(localStorage.getItem("selectedProduct"));

// Find product
const product = products.find(p => p.id === selectedId);

// Elements
const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const productCategory = document.getElementById("productCategory");
const productTitle = document.getElementById("productTitle");
const productRating = document.getElementById("productRating");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const tabContent = document.getElementById("tabContent");
const relatedProducts = document.getElementById("relatedProducts");
const toast = document.getElementById("toast");

// Quantity
let quantity = 1;

// Default descriptions
const descriptions = {
    "Naruto":"Premium Naruto merchandise made from soft cotton with HD anime artwork and an oversized modern fit.",
    "One Piece":"Official-style One Piece inspired apparel and collectibles designed for true Straw Hat fans.",
    "Jujutsu Kaisen":"Dark luxury Jujutsu Kaisen collection featuring premium prints, embroidery and streetwear aesthetics.",
    "Attack on Titan":"High-quality Attack on Titan collectibles with detailed craftsmanship and premium finishing.",
    "Demon Slayer":"Stylish Demon Slayer apparel and accessories with vibrant anime-inspired designs."
};

// Load product
function loadProduct(){

    if(!product){

        window.location.href = "shop.html";
        return;

    }

    // Main info
    productCategory.innerText = product.category;
    productTitle.innerText = product.name;
    productRating.innerHTML = `⭐ ${product.rating} / 5`;
    productPrice.innerText = `₹${product.price.toLocaleString("en-IN")}`;

    productDescription.innerText =
        descriptions[product.anime] ||
        "Premium anime merchandise crafted for collectors and fans.";

    // Main image
    mainImage.src = product.image;

    // Create thumbnails (demo)
    thumbnailContainer.innerHTML = "";

    for(let i=0;i<4;i++){

        const thumb = document.createElement("img");

        thumb.src = product.image;

        thumb.onclick = () => {

            mainImage.src = thumb.src;

        };

        thumbnailContainer.appendChild(thumb);

    }

    // Tab content
    tabContent.innerHTML = `
        <strong>Anime:</strong> ${product.anime}<br>
        <strong>Category:</strong> ${product.category}<br>
        <strong>Rating:</strong> ${product.rating}/5<br>
        <strong>Material:</strong> Premium Cotton / Resin (depending on product type)<br>
        <strong>Shipping:</strong> Free on orders above ₹999
    `;

}

// Quantity controls
document.getElementById("plus").onclick = () => {

    quantity++;
    document.getElementById("quantity").innerText = quantity;

};

document.getElementById("minus").onclick = () => {

    if(quantity > 1){

        quantity--;
        document.getElementById("quantity").innerText = quantity;

    }

};

// Toast
function showToast(message){

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// Add to Cart
document.getElementById("addCart").onclick = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already exists
    const existing = cart.find(item => item.id === product.id);

    if(existing){

        existing.qty += quantity;

    }else{

        cart.push({
            ...product,
            qty: quantity
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("🛒 Added to Cart");

    // Update cart counter
    document.getElementById("cartCount").innerText = cart.length;

};

// Buy Now
document.getElementById("buyNow").onclick = () => {

    document.getElementById("addCart").click();

    setTimeout(()=>{

        window.location.href = "checkout.html";

    },600);

};

// Wishlist
document.getElementById("wishlistBtn").onclick = function(){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.id === product.id);

    if(exists){

        wishlist = wishlist.filter(item => item.id !== product.id);

        this.innerHTML = "❤️ Wishlist";

        showToast("💔 Removed from Wishlist");

    }else{

        wishlist.push(product);

        this.innerHTML = "💖 Added";

        showToast("❤️ Added to Wishlist");

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

};

// Related products
function loadRelated(){

    const related = products
        .filter(p => p.anime === product.anime && p.id !== product.id)
        .slice(0,4);

    relatedProducts.innerHTML = "";

    related.forEach(item => {

        const card = document.createElement("div");

        card.className = "product";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="product-content">
                <h3>${item.name}</h3>
                <div class="product-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </div>
                <button class="btn-primary open-related"
                data-id="${item.id}">
                View Product
                </button>
            </div>
        `;

        relatedProducts.appendChild(card);

    });

}

// Open related product
document.addEventListener("click", function(e){

    if(e.target.classList.contains("open-related")){

        const id = e.target.dataset.id;

        localStorage.setItem("selectedProduct", id);

        window.location.href = "product.html";

    }

});

// Tabs
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {

    tab.onclick = () => {

        tabs.forEach(t => t.classList.remove("active"));

        tab.classList.add("active");

        if(tab.innerText === "Description"){

            tabContent.innerHTML = productDescription.innerText;

        }

        if(tab.innerText === "Specifications"){

            tabContent.innerHTML = `
                <strong>Anime:</strong> ${product.anime}<br>
                <strong>Category:</strong> ${product.category}<br>
                <strong>Rating:</strong> ${product.rating}/5<br>
                <strong>Material:</strong> Premium Quality<br>
                <strong>Delivery:</strong> 3–7 Days
            `;

        }

        if(tab.innerText === "Reviews"){

            tabContent.innerHTML = `
                ⭐⭐⭐⭐⭐ Amazing quality!<br><br>
                ⭐⭐⭐⭐⭐ Worth every rupee.<br><br>
                ⭐⭐⭐⭐ Fast delivery and great packaging.
            `;

        }

    };

});

// Initialize
loadProduct();
loadRelated();

// Update cart counter on page load
const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").innerText = existingCart.length;


/* ===========================================
   PREMIUM PRODUCT FEATURES
=========================================== */

/* ---------- Full Screen Image Viewer ---------- */

const imageViewer = document.createElement("div");
imageViewer.className = "image-viewer";

imageViewer.innerHTML = `
    <span class="close-viewer">&times;</span>
    <img id="viewerImage">
`;

document.body.appendChild(imageViewer);

const viewerImage = document.getElementById("viewerImage");

mainImage.addEventListener("click", () => {

    viewerImage.src = mainImage.src;

    imageViewer.classList.add("show");

});

document.querySelector(".close-viewer").onclick = () => {

    imageViewer.classList.remove("show");

};

imageViewer.onclick = (e)=>{

    if(e.target===imageViewer){

        imageViewer.classList.remove("show");

    }

};

/* ---------- Toast ---------- */

function toast(message){

    const toast=document.getElementById("toast");

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

}

/* ---------- Share Product ---------- */

const shareBtn=document.createElement("button");

shareBtn.innerHTML="📤 Share";

shareBtn.className="btn-secondary";

document.querySelector(".action-buttons").appendChild(shareBtn);

shareBtn.onclick=()=>{

    if(navigator.share){

        navigator.share({

            title:product.name,

            text:"Check out this anime product!",

            url:window.location.href

        });

    }else{

        navigator.clipboard.writeText(window.location.href);

        toast("🔗 Link Copied");

    }

};

/* ---------- Loading Animation ---------- */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

/* ---------- Scroll Reveal ---------- */

const revealItems=document.querySelectorAll(

".features,.tabs,.related"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

});

revealItems.forEach(item=>observer.observe(item));

/* ---------- Floating Particles ---------- */

for(let i=0;i<20;i++){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*100+"vw";

    particle.style.animationDuration=

    5+Math.random()*8+"s";

    particle.style.animationDelay=

    Math.random()*5+"s";

    document.body.appendChild(particle);

}

/* Submit Review */

const reviewBtn=document.getElementById("submitReview");

if(reviewBtn){

reviewBtn.onclick=()=>{

const name=document.getElementById("reviewName").value;

const text=document.getElementById("reviewText").value;

if(name && text){

const card=document.createElement("div");

card.className="review-card";

card.innerHTML=`
<h3>⭐⭐⭐⭐⭐</h3>
<p>${text}</p>
<span>- ${name}</span>
`;

document.querySelector(".review-list").appendChild(card);

document.getElementById("reviewName").value="";
document.getElementById("reviewText").value="";

toast("✅ Review Added");

}else{

toast("⚠ Please fill all fields");

}

};

}

/* Coupon Popup */

window.addEventListener("load",()=>{

setTimeout(()=>{

const popup=document.getElementById("couponPopup");

if(popup){

popup.style.display="flex";

}

},2500);

});

document.getElementById("closeCoupon").onclick=()=>{

document.getElementById("couponPopup").style.display="none";

};

/* Recently Viewed */

const recent=document.getElementById("recentProducts");

if(recent){

recent.innerHTML=`
<div class="product">
<div class="product-content">
<h3>Gojo Hoodie</h3>
<p>₹2299</p>
</div>
</div>

<div class="product">
<div class="product-content">
<h3>Levi Figure</h3>
<p>₹3299</p>
</div>
</div>
`;

}

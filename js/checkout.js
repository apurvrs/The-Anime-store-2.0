/* ===================================
   THE ANIME STORE v2.0
   CHECKOUT.JS
=================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const summaryItems = document.getElementById("summaryItems");
const orderTotal = document.getElementById("orderTotal");

/* Render Order Summary */

function renderSummary() {

    if(cart.length===0){

        summaryItems.innerHTML=`
        <p>Your cart is empty.</p>
        `;

        orderTotal.innerText="₹0";
        return;
    }

    let total=0;

    summaryItems.innerHTML="";

    cart.forEach(item=>{

        const qty=item.quantity || 1;

        const itemTotal=item.price*qty;

        total+=itemTotal;

        summaryItems.innerHTML+=`

        <div class="summary-item">

            <span>

            ${item.name}

            × ${qty}

            </span>

            <span>

            ₹${itemTotal}

            </span>

        </div>

        `;

    });

    orderTotal.innerText=`₹${total}`;

}

/* Place Order */

document.getElementById("placeOrder").addEventListener("click",()=>{

    const name=document.getElementById("name").value.trim();

    const email=document.getElementById("email").value.trim();

    const phone=document.getElementById("phone").value.trim();

    const address=document.getElementById("address").value.trim();

    const city=document.getElementById("city").value.trim();

    const state=document.getElementById("state").value.trim();

    const pincode=document.getElementById("pincode").value.trim();

    if(cart.length===0){

        alert("🛒 Your cart is empty!");

        return;

    }

    if(!name || !email || !phone || !address || !city || !state || !pincode){

        alert("⚠ Please fill all required fields.");

        return;

    }

    const payment=document.querySelector('input[name="payment"]:checked').value;

    const order={

        customer:{
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode
        },

        payment,

        items:cart,

        total:orderTotal.innerText,

        orderDate:new Date().toLocaleString()

    };

    localStorage.setItem("lastOrder",JSON.stringify(order));

    localStorage.removeItem("cart");

    alert("🎉 Order Placed Successfully!");

    window.location.href="success.html";

});

/* Initialize */

renderSummary();

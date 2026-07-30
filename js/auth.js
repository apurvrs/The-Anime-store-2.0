/* ===================================
   THE ANIME STORE v2.1
   AUTH.JS
=================================== */

// ---------- SIGN UP ----------

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", () => {

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        if (!name || !email || !password) {

            alert("Please fill all fields.");
            return;

        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(user => user.email === email);

        if (exists) {

            alert("Account already exists.");
            return;

        }

        users.push({

            name,
            email,
            password

        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("🎉 Account created successfully!");

        window.location.href = "login.html";

    });

}

// ---------- LOGIN ----------

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const remember = document.getElementById("remember").checked;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>

            u.email === email &&
            u.password === password

        );

        if (!user) {

            alert("Invalid email or password.");

            return;

        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        if (remember) {

            localStorage.setItem("rememberUser", "true");

        }

        alert("🎉 Welcome " + user.name + "!");

        window.location.href = "index.html";

    });

}

// ---------- AUTO LOGIN ----------

const currentUser = JSON.parse(

    localStorage.getItem("currentUser")

);

if (

    currentUser &&

    window.location.pathname.includes("login.html")

) {

    window.location.href = "index.html";

}

// ---------- LOGOUT ----------

function logout() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("rememberUser");

    window.location.href = "login.html";

}

// ---------- SHOW USER ----------

function showUser() {

    const user = JSON.parse(

        localStorage.getItem("currentUser")

    );

    const userName = document.getElementById("userName");

    if (user && userName) {

        userName.innerText =

            "Hi, " + user.name;

    }

}

showUser();

/* ==========================
   PROFILE PAGE
========================== */

const currentUser = JSON.parse(

localStorage.getItem("currentUser")

);

if(!currentUser){

window.location.href="login.html";

}

const profileName=document.getElementById("profileName");

const profileEmail=document.getElementById("profileEmail");

const profileImage=document.getElementById("profileImage");

profileName.innerText=currentUser.name;

profileEmail.innerText=currentUser.email;

profileImage.src=

`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=7B61FF&color=fff&size=200`;

/* Edit Name */

document.getElementById("editProfile").onclick=()=>{

const newName=prompt(

"Enter your new name",

currentUser.name

);

if(newName){

currentUser.name=newName;

localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);

profileName.innerText=newName;

profileImage.src=

`https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=7B61FF&color=fff&size=200`;

alert("✅ Profile Updated");

}

};

/* Logout */

document.getElementById("logoutBtn").onclick=()=>{

if(confirm("Logout?")){

localStorage.removeItem("currentUser");

window.location.href="login.html";

}

};

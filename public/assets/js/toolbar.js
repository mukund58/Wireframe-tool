
document.querySelector(".dropbtn").addEventListener("click", function() {
    let menu = document.getElementById("dropdown-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});
// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropbtn")) {
        document.getElementById("dropdown-menu").style.display = "none";
    }
});

document.querySelector(".brush-dropbtn").addEventListener("click", function() {
    let menu = document.getElementById("brush-dropdown-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});
window.addEventListener("click", function(event) {
    if (!event.target.matches(".brush-dropbtn")) {
        document.getElementById("brush-dropdown-menu").style.display = "none";
    }
});

document.getElementById("user-profile").addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent closing immediately
    let menu = document.getElementById("profile-menu");
    if (menu.style.visibility === "visible") {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    } else {
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    }
});

// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
    let menu = document.getElementById("profile-menu");
    if (menu.style.visibility === "visible" && !event.target.closest(".profile-dropdown")) {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    }
});

document.querySelector(".file-drop-down h3").addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent closing immediately
    let menu = document.querySelector(".drop-dron-menu");
    if (menu.style.visibility === "visible") {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    } else {
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    }
});

// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
    let menu = document.querySelector(".drop-dron-menu");
    if (menu.style.visibility === "visible" && !event.target.closest(".file-drop-down")) {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    }
});

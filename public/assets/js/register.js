var mo = document.getElementById("signUpModal");
var btn = document.getElementById("signUpopenModal");
var closeBtn = document.querySelector(".close");
btn.onclick = function() {
    mo.style.display = "flex";
}
closeBtn.onclick = function() {
    mo.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modeal) {
        mo.style.display = "none";
    }
}

function validateForm(event) {
    event.preventDefault(); // Prevent form submission for demo
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    let passwordPattern = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

    if (!email.includes("@")) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    if (!passwordPattern.test(password)) {
        errorMessage.textContent = "Password must be 8-32 characters long and contain at least one letter and one number.";
        return false;
    }

    errorMessage.textContent = "Login successful!";
    errorMessage.style.color = "green";

    return true;
}
document.addEventListener("DOMContentLoaded", () => {
var mo = document.getElementById("signUpModal");
var btn = document.getElementById("signUpopenModal");
var closeBtn = document.querySelector(".close-signup");

btn.onclick = function() {
    mo.style.display = "flex";
}
closeBtn.onclick = function() {
    mo.style.display = "none";
}
var moda = document.getElementById("loginModal");
window.onclick = function(event) {
    if (event.target == (mo)) {
        mo.style.display = "none";
    }
    if (event.target == (moda)) {
        moda.style.display = "none";
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

// Autosave functionality
function autosaveDraft(title, content) {
    fetch('public/wireframe/draft.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `autosave=true&title=${title}&content=${content}`
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error autosaving draft:', error));
}

// Call autosaveDraft function periodically
setInterval(() => {
    const title = "Autosave Draft";
    const content = "Register Page Content"; // Replace with actual content if needed
    autosaveDraft(title, content);
}, 30000); // Autosave every 30 seconds

});

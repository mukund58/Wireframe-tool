document.addEventListener("DOMContentLoaded", () => {
var moda = document.getElementById("loginModal");
var signUpModal = document.getElementById("signUpModal");

var btn = document.getElementById("loginOpenModal");
var closeButton = document.querySelector(".close-login");
var switchToSignup = document.getElementById("switchToSignup");
var switchToSignin = document.getElementById("switchToSignin");
btn.onclick = function() {
    moda.style.display = "flex";
}
closeButton.onclick = function() {
    moda.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == moda) {
        moda.style.display = "none";
    }
}
switchToSignup.onclick = function() {
    moda.style.display = "none";
    signUpModal.style.display = "flex";
};
switchToSignin.onclick = function() {
    moda.style.display = "flex";
    signUpModal.style.display = "none";
};
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

function togglePwd() {
	// get the object password in a varible
  var pwd = document.getElementById("password");
  if (pwd.type === "password") 
    pwd.type = "text";
  else 
    pwd.type = "password";
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    let formData = new FormData(this);
    
    fetch("/php/process_login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("Incorrect Email id or Password")) {
            alert("Login failed. Please check your credentials.");
        } else {
            window.location.href = "/wireframe/setting.php"; // Redirect on success
        }
    })
    .catch(error => console.error("Error:", error));
});
});

const toggle = document.querySelector(".toggle"),
      input = document.querySelector(".password");
    toggle.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
      } else {
        input.type = "password";
      }
    });


function handleCredentialResponse(response) {
  // Send token to your backend
  fetch("../../php/google_register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "id_token=" + encodeURIComponent(response.credential)
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);
    // Redirect or show message
  });
}



document.addEventListener("DOMContentLoaded", function () {
  let profilePic = document.getElementById("profile-pic");
  let inputFile = document.getElementById("input-file");

  inputFile.addEventListener("change", function () {
    let file = inputFile.files[0];

    if (file) {
      // Validate file type (only images)
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file!");
        inputFile.value = ""; // Reset input
        return;
      }

      // Display the selected image
      profilePic.src = URL.createObjectURL(file);
    }
  });
});



var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var addressError = document.getElementById("address-error");
var bioError = document.getElementById("bio-error");
var submitError = document.getElementById("submit-error");
var profileError = document.getElementById("profile-error"); // Fixed space in ID
var userNameError = document.getElementById("username-error");

function validateUserName() {
  var name = document.getElementById("userName").value;
  if (name.length == 0) {
    userNameError.innerHTML = "Username is required";
    return false;
  }
  if (!name.match(/^[a-z][a-z0-9]{3,15}$/)) {
    userNameError.innerHTML =
      "Use 4-16 lowercase letters and digits. Start with a letter.";
    return false;
  }
  userNameError.innerHTML = "<i class='bx bx-check-circle'></i>";
  return true;
}

// function validateName() {
//   var name = document.getElementById("fullName").value;
//   if (name.length == 0) {
//     nameError.innerHTML = "Name is required";
//     return false;
//   }
//   if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
//     nameError.innerHTML = "Write full name (first and last)";
//     return false;
//   }
//   nameError.innerHTML = "<i class='bx bx-check-circle'></i>";
//   return true;
// }

// function validatePhone() {
//   var phone = document.getElementById("phone").value;
//   if (phone.length == 0) {
//     phoneError.innerHTML = "Phone number is required";
//     return false;
//   }
//   if (phone.length != 10 || !phone.match(/^[0-9]{10}$/)) {
//     phoneError.innerHTML = "Enter a valid 10-digit phone number";
//     return false;
//   }
//   phoneError.innerHTML = "<i class='bx bx-check-circle'></i>";
//   return true;
// }

function validateEmail() {
  var email = document.getElementById("email").value;
  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }
  if (
    !email.match(/^[A-Za-z][A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
  ) {
    emailError.innerHTML = "Email is invalid";
    return false;
  }
  emailError.innerHTML = "<i class='bx bx-check-circle'></i>";
  return true;
}

// function validateBio() {
//   var bio = document.getElementById("bio").value;
//   var required = 30;
//   var left = required - bio.length;
//   if (left > 0) {
//     bioError.innerHTML = left + " more characters required";
//     return false;
//   }
//   bioError.innerHTML = "<i class='bx bx-check-circle'></i>";
//   return true;
// }

function validateForm() {
  if (
    // !validateName() ||
    // !validateBio() ||
    !validateEmail() ||
    // !validatePhone() ||
    !validateUserName()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix the errors to save changes";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}


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

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting normally
  alert("Changes saved successfully!");
});
var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var addressError = document.getElementById("address-error");
var bioError = document.getElementById("bio-error");
var submitError = document.getElementById("submit-error");
var profileError = document.getElementById("profile -error");

function validateName() {
  var name = document.getElementById("fullName").value;
  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = " Write Full Name";
    return false;
  }
  nameError.innerHTML = "Valid";
  return true;
}
function validatePhone() {
  var phone = document.getElementById("phone").value;
  if (phone.length == 0) {
    phoneError.innerHTML = "Phone number is required";
    return false;
  }
  if (phone.length != 10) {
    phoneError.innerHTML = "Phone number should be 10 digits";
    return false;
  }
  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = "Phone number is required";
    return false;
  }
  phoneError.innerHTML = "Valid";
  return true;
}
function validateEmail() {
  var email = document.getElementById("email").value;
  if (email.length == 0) {
    emailError.innerHTML = "email is required";
    return false;
  }
  if (!email.match(/^[A-Za-z]\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.innerHTML = "email invalid";
    return false;
  }
  emailError.innerHTML = "Valid";
  return true;
}
function validateBio() {
  var bio = document.getElementById("bio").value;
  var required = 30;
  var left = required - bio.length;
  if (left > 0) {
    bioError.innerHTML = left + "more characters required";
    return false;
  }
  bioError.innerHTML = "Valid";
  return true;
}
function validateForm() {
  if (
    !validateName() ||
    !validateBio() ||
    !validateEmail() ||
    !validatePhone()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix error to Save";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
}

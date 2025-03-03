document.addEventListener("DOMContentLoaded", function () {
    let profilePic = document.getElementById("profile-pic");
    let inputFile = document.getElementById("input-file");
    let restPic = document.getElementById("rest-pic");
    
    restPic.addEventListener(this.onclick,function(){
      profilePic.src = "../uploads/profile.svg";
      inputFile.value ="";
    })
    
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
  
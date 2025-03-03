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
      const content = "Autosave content for settings";
      autosaveDraft(title, content);
  }, 30000); // Autosave every 30 seconds

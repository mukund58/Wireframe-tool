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


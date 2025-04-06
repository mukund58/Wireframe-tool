document.getElementById("create-draft-btn").addEventListener("click", async () => {
    const title = document.getElementById("draft-title").value;
    if (!title) {
        alert("Please enter a title");
        return;
    }

    const canvasJSON = JSON.stringify(window.canvas.toJSON());

    const response = await fetch("../php/draft/create_draft.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: canvasJSON })
    });

    const result = await response.json();
    if (result.success) {
        alert("Draft saved!");
        location.reload();
    } else {
        alert("Error saving draft.");
    }
});

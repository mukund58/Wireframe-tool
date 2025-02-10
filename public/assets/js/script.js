document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let drawing = false;
    let tool = "brush";

    document.getElementById("brush").addEventListener("click", () => tool = "brush");
    document.getElementById("shape").addEventListener("click", () => tool = "shape");
    document.getElementById("photo").addEventListener("click", () => tool = "photo");
    document.getElementById("erase").addEventListener("click", () => tool = "erase");
    document.getElementById("save").addEventListener("click", saveCanvas);

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        if (tool === "brush") {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (tool === "erase") {
            ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
        }
    });

    canvas.addEventListener("mouseup", () => drawing = false);

    function drawRectangle(x, y, width, height) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fillRect(x, y, width, height);
    }

    canvas.addEventListener("click", (e) => {
        if (tool === "shape") {
            drawRectangle(e.offsetX - 25, e.offsetY - 25, 50, 50);
        }
    });

    function uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                ctx.drawImage(img, 50, 50, 100, 100);
            };
        }
    }

    function saveCanvas() {
        const link = document.createElement("a");
        link.download = "canvas.png";
        link.href = canvas.toDataURL();
        link.click();
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);

    document.getElementById("photo").addEventListener("click", () => input.click());
    input.addEventListener("change", uploadImage);
});

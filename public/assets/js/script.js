document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save existing drawing
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        ctx.putImageData(tempImage, 0, 0); // Restore drawing after resize
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let drawing = false;
    let tool = "brush";
    let startX, startY;
    let shapes = [];
    let undoStack = [];

    document.getElementById("brush").addEventListener("click", () => tool = "brush");
    document.getElementById("shape").addEventListener("click", () => tool = "shape");
    document.getElementById("photo").addEventListener("click", () => tool = "photo");
    document.getElementById("erase").addEventListener("click", () => tool = "erase");
    document.getElementById("undo").addEventListener("click", undoLastAction);
    document.getElementById("save").addEventListener("click", saveCanvas);

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        if (tool === "brush") {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        if (tool === "brush") {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (tool === "erase") {
            ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
        } else if (tool === "shape") {
            redrawCanvas();
            drawRectangle(startX, startY, e.offsetX - startX, e.offsetY - startY);
        }
    });

    canvas.addEventListener("mouseup", (e) => {
        if (tool === "shape") {
            shapes.push({ x: startX, y: startY, width: e.offsetX - startX, height: e.offsetY - startY });
        }
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        drawing = false;
    });

    function drawRectangle(x, y, width, height) {
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.strokeRect(x, y, width, height);
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => drawRectangle(shape.x, shape.y, shape.width, shape.height));
    }

    function uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                ctx.drawImage(img, 50, 50, 100, 100);
                undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            };
        }
    }

    function undoLastAction() {
        if (undoStack.length > 1) {
            undoStack.pop(); // Remove last action
            ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
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

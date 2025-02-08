document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    let drawing = false;
    let tool = "brush";
    let scale = 1;

    document.getElementById("brush").addEventListener("click", () => tool = "brush");
    document.getElementById("shape").addEventListener("click", () => tool = "shape");
    document.getElementById("photo").addEventListener("click", () => tool = "photo");
    document.getElementById("erase").addEventListener("click", () => tool = "erase");
    document.getElementById("save").addEventListener("click", saveCanvas);
    document.getElementById("zoom-in").addEventListener("click", zoomIn);
    document.getElementById("zoom-out").addEventListener("click", zoomOut);
    document.getElementById("text").addEventListener("click", () => tool = "text");
    document.getElementById("line").addEventListener("click", () => tool = "line");

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX / scale, e.offsetY / scale);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        if (tool === "brush") {
            ctx.lineTo(e.offsetX / scale, e.offsetY / scale);
            ctx.stroke();
        } else if (tool === "erase") {
            ctx.clearRect((e.offsetX / scale) - 10, (e.offsetY / scale) - 10, 20, 20);
        } else if (tool === "line") {
            ctx.lineTo(e.offsetX / scale, e.offsetY / scale);
            ctx.stroke();
        }
    });

    canvas.addEventListener("mouseup", () => drawing = false);

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const { offsetX, offsetY } = getTouchPos(touch);
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(offsetX / scale, offsetY / scale);
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!drawing) return;
        const touch = e.touches[0];
        const { offsetX, offsetY } = getTouchPos(touch);
        if (tool === "brush") {
            ctx.lineTo(offsetX / scale, offsetY / scale);
            ctx.stroke();
        } else if (tool === "erase") {
            ctx.clearRect((offsetX / scale) - 10, (offsetY / scale) - 10, 20, 20);
        } else if (tool === "line") {
            ctx.lineTo(offsetX / scale, offsetY / scale);
            ctx.stroke();
        }
    });

    canvas.addEventListener("touchend", () => drawing = false);

    function drawRectangle(x, y, width, height) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fillRect(x, y, width, height);
    }

    canvas.addEventListener("click", (e) => {
        if (tool === "shape") {
            drawRectangle((e.offsetX / scale) - 25, (e.offsetY / scale) - 25, 50, 50);
        } else if (tool === "text") {
            const text = prompt("Enter text:");
            if (text) {
                ctx.font = "20px Arial";
                ctx.fillText(text, e.offsetX / scale, e.offsetY / scale);
            }
        }
    });

    function uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                ctx.drawImage(img, 50 / scale, 50 / scale, 100 / scale, 100 / scale);
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

    function getTouchPos(touch) {
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        };
    }

    function zoomIn() {
        scale *= 1.1;
        ctx.scale(1.1, 1.1);
        ctx.translate(-canvas.width * 0.05, -canvas.height * 0.05);
        ctx.drawImage(canvas, 0, 0);
    }

    function zoomOut() {
        scale /= 1.1;
        ctx.scale(0.9, 0.9);
        ctx.translate(canvas.width * 0.05, canvas.height * 0.05);
        ctx.drawImage(canvas, 0, 0);
    }

    canvas.addEventListener("wheel", (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        }
    });
});

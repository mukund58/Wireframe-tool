document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let scale = 1;
    let originX = 0;
    let originY = 0;
    let isPanning = false;
    let startX, startY;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function draw() {
        ctx.setTransform(scale, 0, 0, scale, originX, originY);
        ctx.clearRect(-originX / scale, -originY / scale, canvas.width / scale, canvas.height / scale);
        // Draw elements here
    }

    canvas.addEventListener("mousedown", (e) => {
        if (e.target.id === "canvas") {
            isPanning = true;
            startX = e.clientX - originX;
            startY = e.clientY - originY;
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        if (isPanning) {
            originX = e.clientX - startX;
            originY = e.clientY - startY;
            draw();
        }
    });

    canvas.addEventListener("mouseup", () => isPanning = false);
    canvas.addEventListener("mouseleave", () => isPanning = false);

    document.getElementById("zoom-in").addEventListener("click", () => {
        scale *= 1.1;
        draw();
    });

    document.getElementById("zoom-out").addEventListener("click", () => {
        scale /= 1.1;
        draw();
    });

    document.getElementById("place-element").addEventListener("click", () => {
        canvas.addEventListener("click", placeElement);
    });

    function placeElement(e) {
        const x = (e.clientX - originX) / scale;
        const y = (e.clientY - originY) / scale;
        ctx.fillRect(x - 25, y - 25, 50, 50);
        canvas.removeEventListener("click", placeElement);
    }
});

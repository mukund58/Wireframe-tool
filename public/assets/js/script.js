document.addEventListener("DOMContentLoaded", () => {
    const canvas = new fabric.Canvas('canvas');

    function resizeCanvas() {
        canvas.setWidth(canvas.getElement().parentElement.clientWidth);
        canvas.setHeight(canvas.getElement().parentElement.clientHeight);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    document.getElementById("cursor").addEventListener("click", () => canvas.isDrawingMode = false);
    document.getElementById("shapes").addEventListener("click", () => addShape());
    document.getElementById("text").addEventListener("click", () => addText());
    document.getElementById("reset").addEventListener("click", () => canvas.clear());
    document.getElementById("delete").addEventListener("click", () => deleteSelected());

    function addShape() {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 60,
            height: 70
        });
        canvas.add(rect);
    }

    function addText() {
        const text = new fabric.Textbox('Hello World', {
            left: 100,
            top: 100,
            width: 150,
            fontSize: 20
        });
        canvas.add(text);
    }

    function deleteSelected() {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    }

    document.getElementById("save").addEventListener("click", saveCanvas);

    function saveCanvas() {
        const link = document.createElement("a");
        link.download = "canvas.png";
        link.href = canvas.toDataURL({
            format: 'png',
            multiplier: 2
        });
        link.click();
    }

    // Implement functionality to change canvas color using the color picker
    document.getElementById("color-picker").addEventListener("input", (event) => {
        canvas.setBackgroundColor(event.target.value, canvas.renderAll.bind(canvas));
    });

    // Implement functionality to change canvas width and height using input elements
    document.getElementById("canvas-width").addEventListener("input", (event) => {
        canvas.setWidth(parseInt(event.target.value, 10));
        resizeCanvas();
    });

    document.getElementById("canvas-height").addEventListener("input", (event) => {
        canvas.setHeight(parseInt(event.target.value, 10));
        resizeCanvas();
    });

    // Add panning functionality
    let isPanning = false;
    let startX, startY;

    canvas.on('mouse:down', (event) => {
        isPanning = true;
        startX = event.e.clientX;
        startY = event.e.clientY;
    });

    canvas.on('mouse:move', (event) => {
        if (isPanning) {
            const deltaX = event.e.clientX - startX;
            const deltaY = event.e.clientY - startY;
            canvas.relativePan({ x: deltaX, y: deltaY });
            startX = event.e.clientX;
            startY = event.e.clientY;
        }
    });

    canvas.on('mouse:up', () => {
        isPanning = false;
    });

    // Add zooming functionality
    canvas.on('mouse:wheel', (event) => {
        const delta = event.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
        event.e.preventDefault();
        event.e.stopPropagation();
    });

    // Add minimize functionality for toolbar and setting panel
    document.getElementById("minimize-toolbar").addEventListener("click", () => {
        const toolbar = document.getElementById("toolbar");
        toolbar.style.display = toolbar.style.display === "none" ? "flex" : "none";
    });

    document.getElementById("minimize-settings").addEventListener("click", () => {
        const settingsPanel = document.getElementById("settings-panel");
        settingsPanel.style.display = settingsPanel.style.display === "none" ? "flex" : "none";
    });
});

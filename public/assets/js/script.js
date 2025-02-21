import { PencilBrush, CircleBrush, SprayBrush } from 'fabric-brush';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = new fabric.Canvas('canvas');

    const pencilBrush = new PencilBrush(canvas);
    const circleBrush = new CircleBrush(canvas);
    const sprayBrush = new SprayBrush(canvas);

    function resizeCanvas() {
        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);
    
        drawGrid();
        canvas.renderAll();
    }

    function drawGrid(gridSize = 50) {
        canvas.clear(); // Clear previous objects
        const width = canvas.width;
        const height = canvas.height;
    
        // Draw vertical lines
        for (let x = 0; x < width; x += gridSize) {
            canvas.add(new fabric.Line([x, 0, x, height], {
                stroke: '#ddd',
                selectable: false, // Prevent grid from being selected
                evented: false
            }));
        }
    
        // Draw horizontal lines
        for (let y = 0; y < height; y += gridSize) {
            canvas.add(new fabric.Line([0, y, width, y], {
                stroke: '#ddd',
                selectable: false,
                evented: false
            }));
        }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    document.getElementById("cursor").addEventListener("click", () => canvas.isDrawingMode = false);
    document.getElementById("rectangle").addEventListener("click", () => addRect());
    document.getElementById("circle").addEventListener("click", () => addCircle());
    document.getElementById("triangle").addEventListener("click", () => addTriangle());
    document.getElementById("line").addEventListener("click", () => addLine(x1, y1, x2, y2));
    document.getElementById("text").addEventListener("click", () => addText());
    document.getElementById("reset").addEventListener("click", () => canvas.clear());
    document.getElementById("delete").addEventListener("click", () => deleteSelected());
    document.getElementById("brush-1").addEventListener("click", () => setBrushThickness(1));
    document.getElementById("brush-2").addEventListener("click", () => setBrushThickness(5));
    document.getElementById("brush-3").addEventListener("click", () => setBrushThickness(10));

    document.getElementById("pencil-brush").addEventListener("click", () => canvas.freeDrawingBrush = pencilBrush);
    document.getElementById("circle-brush").addEventListener("click", () => canvas.freeDrawingBrush = circleBrush);
    document.getElementById("spray-brush").addEventListener("click", () => canvas.freeDrawingBrush = sprayBrush);

    function addRect() {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'white',
            stroke: 'black',
            width: 60,
            height: 70
        });
        canvas.add(rect);
    }

    function addCircle() {
        var cir = new fabric.Circle({
            top: 10,
            left: 100,
            radius: 50,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2
        });
        canvas.add(cir);
    }

    function addTriangle() {
        var tri = new fabric.Triangle({
            top: 10,
            left: 200,
            width: 150, 
            height: 100,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2
        });
        canvas.add(tri);
    }

    function addLine(x1, y1, x2, y2) {
        let line = new fabric.Line([x1, y1, x2, y2], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: false, // Prevent direct selection of line
            evented: false
        });
    
        // Calculate initial midpoint
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;
    
        let midpoint = new fabric.Circle({
            left: midX,
            top: midY,
            radius: 6,
            fill: 'red',
            hasControls: false,
            hasBorders: false,
            selectable: true
        });
    
        canvas.add(line);
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

    document.getElementById("color-picker").addEventListener("input", (event) => {
        canvas.setBackgroundColor(event.target.value, canvas.renderAll.bind(canvas));
    });

    document.getElementById("canvas-width").addEventListener("input", (event) => {
        canvas.setWidth(parseInt(event.target.value, 10));
        resizeCanvas();
    });

    document.getElementById("canvas-height").addEventListener("input", (event) => {
        canvas.setHeight(parseInt(event.target.value, 10));
        resizeCanvas();
    });

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

    document.getElementById("minimize-toolbar").addEventListener("click", () => {
        const toolbar = document.getElementById("toolbar");
        toolbar.style.display = toolbar.style.display === "none" ? "flex" : "none";
    });

    document.getElementById("minimize-settings").addEventListener("click", () => {
        const settingsPanel = document.getElementById("settings-panel");
        settingsPanel.style.display = settingsPanel.style.display === "none" ? "flex" : "none";
    });

    function setBrushThickness(thickness) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = thickness;
        }
    }
});

document.querySelector(".dropbtn").addEventListener("click", function() {
    let menu = document.getElementById("dropdown-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropbtn")) {
        document.getElementById("dropdown-menu").style.display = "none";
    }
});

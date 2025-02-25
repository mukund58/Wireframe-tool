document.addEventListener("DOMContentLoaded", () => {
    const canvas = new fabric.Canvas('canvas');
    let undoStack = [];
    let redoStack = [];

    function resizeCanvas() {
        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);
        canvas.renderAll();
    }

    // Remove these event listeners if they exist
    canvas.off('after:render');

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    document.getElementById("cursor").addEventListener("click", () => canvas.isDrawingMode = false);
    document.getElementById("rectangle").addEventListener("click", () => addRect());
    document.getElementById("circle").addEventListener("click", () => addCircle());
    document.getElementById("triangle").addEventListener("click", () => addTriangle());
    document.getElementById("line").addEventListener("click", () => addLine(x1, y1, x2, y2));
    document.getElementById("text").addEventListener("click", () => addText());
    document.getElementById("reset").addEventListener("click", () => {
        canvas.clear();
    });
    document.getElementById("delete").addEventListener("click", () => deleteSelected());

    // Add event listeners for brush options
    document.getElementById("brush-1").addEventListener("click", () => setBrush(1));
    document.getElementById("brush-2").addEventListener("click", () => setBrush(2));
    document.getElementById("brush-3").addEventListener("click", () => setBrush(3));
    document.getElementById("pencil-brush").addEventListener("click", () => setBrush('pencil'));
    document.getElementById("circle-brush").addEventListener("click", () => setBrush('circle'));
    document.getElementById("spray-brush").addEventListener("click", () => setBrush('spray'));

    // Add event listeners for undo and redo buttons
    document.getElementById("undo").addEventListener("click", () => canvas.historyUndo());
    document.getElementById("redo").addEventListener("click", () => canvas.historyRedo());

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

    // Implement brush tool activation logic
    function setBrush(brushType) {
        canvas.isDrawingMode = true;
        switch (brushType) {
            case 1:
                canvas.freeDrawingBrush.width = 1;
                break;
            case 2:
                canvas.freeDrawingBrush.width = 5;
                break;
            case 3:
                canvas.freeDrawingBrush.width = 10;
                break;
            case 'pencil':
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                break;
            case 'circle':
                canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
                break;
            case 'spray':
                canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
                break;
            default:
                canvas.freeDrawingBrush.width = 1;
        }
    }

    function saveState() {
        redoStack = []; // Clear redo stack on new action
        undoStack.push(JSON.stringify(canvas));
    }
    // Update canvas initialization to include history tracking
    canvas.historyUndo = function() {
        // Implement undo functionality
        if (undoStack.length > 0) {
            redoStack.push(JSON.stringify(canvas));
            let previousState = undoStack.pop();
            canvas.loadFromJSON(previousState, canvas.renderAll.bind(canvas));
        }
    };

    canvas.historyRedo = function() {
        // Implement redo functionality
        if (redoStack.length > 0) {
            undoStack.push(JSON.stringify(canvas));
            let nextState = redoStack.pop();
            canvas.loadFromJSON(nextState, canvas.renderAll.bind(canvas));
        }
    };
    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);
});


document.querySelector(".dropbtn").addEventListener("click", function() {
    let menu = document.getElementById("dropdown-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});
// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropbtn")) {
        document.getElementById("dropdown-menu").style.display = "none";
    }
});

document.querySelector(".brush-dropbtn").addEventListener("click", function() {
    let menu = document.getElementById("brush-dropdown-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});
window.addEventListener("click", function(event) {
    if (!event.target.matches(".brush-dropbtn")) {
        document.getElementById("brush-dropdown-menu").style.display = "none";
    }
});

document.querySelector(".user-toolbar-btns").addEventListener("click", function() {
    let menu = document.querySelector(".profile");
    menu.style.display = (menu.style.visibility === "visible") ? "none" : "visible";
});
// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
    if (!event.target.matches(".user-toolbar-btns")) {
        document.querySelector(".profile").style.visibility = "hidden";
    }
});

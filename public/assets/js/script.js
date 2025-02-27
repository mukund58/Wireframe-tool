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
    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("redo").addEventListener("click", redo);

    document.getElementById("savePNG").addEventListener("click", saveCanvasAsPNG);
    document.getElementById("saveJSON").addEventListener("click", saveCanvasAsJSON);
    document.getElementById("loadJSON").addEventListener("click", loadCanvasFromJSON);


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


    function saveCanvasAsPNG() {
        var dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0
        });

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        link.click();
    }
    function saveCanvasAsJSON() {
        var json = JSON.stringify(canvas.toJSON());

        var blob = new Blob([json], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'canvas.json';
        link.click();
    }

    // Load JSON from File Input
    function loadCanvasFromJSON() {
        var input = document.getElementById('jsonFileInput');
        var file = input.files[0];
        if (!file) {
            alert("Please select a JSON file first!");
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event) {
            var json = event.target.result;
            canvas.loadFromJSON(json, function() {
                canvas.renderAll();
            });
        };
        reader.readAsText(file);
    }

    function saveState() {
        undoStack.push(JSON.stringify(canvas.toJSON()));
        // redoStack = []; // Clear redo stack on new action
    }

    // Undo Function
    function undo() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop()); // Move current state to redo stack
            var previousState = undoStack[undoStack.length - 1];
            canvas.loadFromJSON(previousState, function() {
                canvas.renderAll();
            });
        }
    }

    // Redo Function (Fixed)
    function redo() {
        if (redoStack.length > 0) {
            var nextState = redoStack.pop();
            undoStack.push(nextState); // Save redo state back to undo stack
            canvas.loadFromJSON(nextState, function() {
                canvas.renderAll();
            });
        }
    }

    canvas.on('object:modified', saveState);
    canvas.on('object:added', saveState);

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

    // Function to export the canvas as JSON and download it as a file
    function exportCanvasAsJSON() {
        const json = JSON.stringify(canvas.toJSON());
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'canvas.json';
        link.click();
    }

    // Function to import a JSON file and load it onto the canvas
    function importCanvasFromJSON(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const json = e.target.result;
                canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
            };
            reader.readAsText(file);
        }
    }

    // Add event listeners for the export and import buttons
    document.getElementById("export-btn").addEventListener("click", exportCanvasAsJSON);
    document.getElementById("import-btn").addEventListener("click", () => {
        document.getElementById("import-input").click();
    });

    // Add event listener for the import input element
    document.getElementById("import-input").addEventListener("change", importCanvasFromJSON);
});


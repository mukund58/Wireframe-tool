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

    // Helper function to deselect any active object and turn off drawing mode
    function clearSelection() {
        canvas.discardActiveObject().renderAll();
        canvas.isDrawingMode = false;
    
        // Remove event listeners from shapes
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
    }
    

    document.getElementById("cursor").addEventListener("click", () => {
        clearSelection();
        canvas.defaultCursor = 'default'; // Reset the cursor to default
    });

    document.getElementById("rectangle").addEventListener("click", () => {
        clearSelection();
        addRect();
    });
    document.getElementById("circle").addEventListener("click", () => {
        clearSelection();
        addCircle();
    });
    document.getElementById("triangle").addEventListener("click", () => {
        clearSelection();
        addTriangle();
    });
    document.getElementById("line").addEventListener("click", () => {
        clearSelection();
        addLine(x1, y1, x2, y2);
    });
    document.getElementById("text").addEventListener("click", () => {
        clearSelection();
        addText();
    });
    document.getElementById("reset").addEventListener("click", () => {
        clearSelection();
        canvas.clear();
    });
    document.getElementById("delete").addEventListener("click", () => {
        clearSelection();
        deleteSelected();
    });

    // Add event listeners for brush options
    document.getElementById("brush-1").addEventListener("click", () => {
        clearSelection();
        setBrush(1);
    });
    document.getElementById("brush-2").addEventListener("click", () => {
        clearSelection();
        setBrush(2);
    });
    document.getElementById("brush-3").addEventListener("click", () => {
        clearSelection();
        setBrush(3);
    });
    document.getElementById("pencil-brush").addEventListener("click", () => {
        clearSelection();
        setBrush('pencil');
    });
    document.getElementById("circle-brush").addEventListener("click", () => {
        clearSelection();
        setBrush('circle');
    });
    document.getElementById("spray-brush").addEventListener("click", () => {
        clearSelection();
        setBrush('spray');
    });

    // Add event listeners for undo and redo buttons
    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("redo").addEventListener("click", redo);

    document.getElementById("savePNG").addEventListener("click", saveCanvasAsPNG);
    document.getElementById("saveJSON").addEventListener("click", saveCanvasAsJSON);
    document.getElementById("loadJSON").addEventListener("click", loadCanvasFromJSON);

    function addRect() {
        var Rectangle = (function () {
            function Rectangle(canvas) {
                this.canvas = canvas;
                this.className = 'Rectangle';
                this.isDrawing = false;
                this.origX = 0;
                this.origY = 0;
                this.bindEvents();
            }

            Rectangle.prototype.bindEvents = function () {
                var inst = this;
                inst.canvas.on('mouse:down', function (o) {
                    inst.onMouseDown(o);
                });
                inst.canvas.on('mouse:move', function (o) {
                    inst.onMouseMove(o);
                });
                inst.canvas.on('mouse:up', function (o) {
                    inst.onMouseUp(o);
                });
                inst.canvas.on('object:moving', function (o) {
                    inst.disable();
                });
            };

            Rectangle.prototype.onMouseUp = function (o) {
                var inst = this;
                inst.disable();
            };

            Rectangle.prototype.onMouseMove = function (o) {
                var inst = this;
                if (!inst.isEnable()) return;

                var pointer = inst.canvas.getPointer(o.e);
                var activeObj = inst.canvas.getActiveObject();

                if (!activeObj) return; // Prevent errors if no object is selected

                activeObj.set({
                    stroke: 'black',
                    strokeWidth: 5,
                    fill: 'transparent',
                    width: Math.abs(inst.origX - pointer.x),
                    height: Math.abs(inst.origY - pointer.y),
                });

                if (inst.origX > pointer.x) activeObj.set({ left: Math.abs(pointer.x) });
                if (inst.origY > pointer.y) activeObj.set({ top: Math.abs(pointer.y) });

                activeObj.setCoords();
                inst.canvas.renderAll();
            };

            Rectangle.prototype.onMouseDown = function (o) {
                var inst = this;

                // Deselect any selected object before drawing a new one
                inst.canvas.discardActiveObject().renderAll();

                inst.enable();
                var pointer = inst.canvas.getPointer(o.e);
                inst.origX = pointer.x;
                inst.origY = pointer.y;

                var rect = new fabric.Rect({
                    left: inst.origX,
                    top: inst.origY,
                    originX: 'left',
                    originY: 'top',
                    width: 0,
                    height: 0,
                    angle: 0,
                    transparentCorners: false,
                    hasBorders: false,
                    hasControls: false,
                });

                inst.canvas.add(rect).setActiveObject(rect);
            };

            Rectangle.prototype.isEnable = function () {
                return this.isDrawing;
            };

            Rectangle.prototype.enable = function () {
                this.isDrawing = true;
            };

            Rectangle.prototype.disable = function () {
                this.isDrawing = false;
            };

            return Rectangle;
        })();

        // Reset cursor before drawing
        canvas.defaultCursor = 'default';

        // Initialize the Rectangle class
        new Rectangle(canvas);
    }

    function addCircle() {
        var Circle = (function () {
            function Circle(canvas) {
                this.canvas = canvas;
                this.className = 'Circle';
                this.isDrawing = false;
                this.origX = 0;
                this.origY = 0;
                this.bindEvents();
            }

            Circle.prototype.bindEvents = function () {
                var inst = this;
                inst.canvas.on('mouse:down', function (o) {
                    inst.onMouseDown(o);
                });
                inst.canvas.on('mouse:move', function (o) {
                    inst.onMouseMove(o);
                });
                inst.canvas.on('mouse:up', function (o) {
                    inst.onMouseUp(o);
                });
                inst.canvas.on('object:moving', function (o) {
                    inst.disable();
                });
            };

            Circle.prototype.onMouseUp = function (o) {
                var inst = this;
                inst.disable();
                
                // Enable selection & dragging after drawing is finished
                var activeObj = inst.canvas.getActiveObject();
                if (activeObj) {
                    activeObj.set({
                        selectable: true,
                        hasControls: true,
                        hasBorders: true
                    });
                }
            };

            Circle.prototype.onMouseMove = function (o) {
                var inst = this;
                if (!inst.isEnable()) return;

                var pointer = inst.canvas.getPointer(o.e);
                var activeObj = inst.canvas.getActiveObject();
                if (!activeObj) return;

                var radius = Math.sqrt(Math.pow(pointer.x - inst.origX, 2) + Math.pow(pointer.y - inst.origY, 2)) / 2;

                activeObj.set({
                    radius: radius,
                    left: inst.origX ,
                    top: inst.origY 
                });

                activeObj.setCoords();
                inst.canvas.renderAll();
            };

            Circle.prototype.onMouseDown = function (o) {
                var inst = this;

                // Deselect any active object
                inst.canvas.discardActiveObject().renderAll();

                inst.enable();
                var pointer = inst.canvas.getPointer(o.e);
                inst.origX = pointer.x;
                inst.origY = pointer.y;

                var circle = new fabric.Circle({
                    left: inst.origX,
                    top: inst.origY,
                    radius: 0,
                    fill: 'transparent',
                    stroke: 'black',
                    strokeWidth: 5,
                    originX: 'center',
                    originY: 'center',
                    hasBorders: false,
                    hasControls: false,
                    selectable: true // Prevent selection box while drawing
                });

                inst.canvas.add(circle).setActiveObject(circle);
            };

            Circle.prototype.isEnable = function () {
                return this.isDrawing;
            };

            Circle.prototype.enable = function () {
                this.isDrawing = true;
            };

            Circle.prototype.disable = function () {
                this.isDrawing = false;
            };

            return Circle;
        })();

        // Reset cursor before drawing
        canvas.defaultCursor = 'default';

        // Initialize the Circle class
        new Circle(canvas);
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
        canvas.defaultCursor = 'default';
        canvas.isDrawingMode = false; // Turn off drawing mode
        canvas.discardActiveObject().renderAll();
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
    }

    function undo() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop());
            var previousState = undoStack[undoStack.length - 1];
            canvas.loadFromJSON(previousState, function() {
                canvas.renderAll();
            });
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            var nextState = redoStack.pop();
            undoStack.push(nextState);
            canvas.loadFromJSON(nextState, function() {
                canvas.renderAll();
            });
        }
    }

    canvas.on('object:modified', saveState);
    canvas.on('object:added', saveState);

    function setBrush(brushType) {
        canvas.isDrawingMode = true;
        // clearSelection(); // Ensure previous tools are disabled
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
});
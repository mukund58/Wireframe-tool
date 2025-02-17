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
});

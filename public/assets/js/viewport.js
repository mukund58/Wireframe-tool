var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("canvas-container");

function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Handle right mouse button for panning
zoom.onmousedown = function (e) {
    if (e.button === 2) { // Right-click (button 2)
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    }
};

zoom.onmouseup = function () {
    panning = false;
};

zoom.onmouseleave = function () {
    panning = false;
};

zoom.onmousemove = function (e) {
    if (!panning) return;
    e.preventDefault();
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
};

// Handle zooming with the mouse wheel
zoom.onwheel = function (e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.deltaY < 0 ? 1.2 : 1 / 1.2; // Zoom in or out

    scale *= delta;
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    
    setTransform();
};

// Prevent context menu on right-click
zoom.oncontextmenu = function (e) {
    e.preventDefault();
};

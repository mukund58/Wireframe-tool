var scale = 1,
panning = false,
pointX = 0,
pointY = 0,
start = { x: 0, y: 0 },
zoom = document.getElementById("canvas-container"),
canvas = document.getElementById("canvas");
// Set initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Apply transformations
function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    drawCanvas(); // Redraw canvas after transform
    canvas.renderAll();
}

// Right-click for panning
zoom.onmousedown = function (e) {
    if (e.button === 2) {
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    }
};

zoom.onmouseup = zoom.onmouseleave = function () {
    panning = false;
};

zoom.onmousemove = function (e) {
    if (!panning) return;
    e.preventDefault();
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
};

// Zoom with the mouse wheel
zoom.onwheel = function (e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.deltaY < 0 ? 1.2 : 1 / 1.2;

    scale *= delta;
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;

    setTransform();
};

// Disable right-click menu
zoom.oncontextmenu = function (e) {
    e.preventDefault();
};

// Autosave functionality
function autosaveDraft(title, content) {
    fetch('public/wireframe/draft.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `autosave=true&title=${title}&content=${content}`
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error autosaving draft:', error));
}

// Call autosaveDraft function periodically
setInterval(() => {
    const title = "Autosave Draft";
    const content = JSON.stringify(canvas.toJSON());
    autosaveDraft(title, content);
}, 30000); // Autosave every 30 seconds

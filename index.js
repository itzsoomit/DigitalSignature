const textcolor = document.querySelector("#textcolor");
const bgcolor = document.querySelector("#bgcolor");
const canvas = document.querySelector(".canvas");
const clearbtn = document.querySelector(".clear");
const savebtn = document.querySelector(".download");
const retrievebtn = document.querySelector(".retrieve");
const ctx = canvas.getContext('2d');
const fontsize = document.querySelector("#fontsize");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let signatureData = '';

function getEventPosition(event) {
    if (event.touches && event.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
    }
    return {
        x: event.offsetX,
        y: event.offsetY
    };
}

textcolor.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const pos = getEventPosition(e);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const pos = getEventPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    signatureData = canvas.toDataURL();
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    const pos = getEventPosition(e);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) {
        const pos = getEventPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
});

canvas.addEventListener('touchend', (e) => {
    isDrawing = false;
    signatureData = canvas.toDataURL();
});

bgcolor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontsize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

clearbtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    signatureData = '';
});

savebtn.addEventListener("click", () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-signature.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrievebtn.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = savedCanvas;
    }
});

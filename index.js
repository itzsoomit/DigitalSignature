const textcolor=document.querySelector("#textcolor");
const bgcolor=document.querySelector("#bgcolor");
const canvas=document.querySelector(".canvas");
const clearbtn=document.querySelector(".clear");
const savebtn=document.querySelector(".download");
const retrievebtn=document.querySelector(".retrieve");
const ctx=canvas.getContext('2d');
const fontsize=document.querySelector("#fontsize")

textcolor.addEventListener('change',(e)=>{
    ctx.strokeStyle=e.target.value;
    ctx.fillStyle=e.target.value;
})

canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    lastX=event.offsetX;
    lastY=event.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();

        lastX=event.offsetX;
        lastY=event.offsetY;
    }
})
canvas.addEventListener('mouseup',(e)=>{
    isDrawing=false;
})

bgcolor.addEventListener('change',(e)=>{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,canvas.width,canvas.height);
})

fontsize.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value;
})

clearbtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

savebtn.addEventListener("click",()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link=document.createElement('a');
    link.download='my-signature.png';
    link.href=canvas.toDataURL();
    link.click();
})

retrievebtn.addEventListener('click',(e)=>{
    let savedCanvas=localStorage.getItem('canvasContents');
    if(savedCanvas){
        let img= new Image();
        img.src=savedCanvas;
        ctx.drawImage(img,0,0);
    }
})

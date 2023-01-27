
let sWidth = 90;
let cPadding = '20px';
let bRadius = '15px';

let cW = Math.floor((window.innerWidth - (parseInt(cPadding) * 2)) / sWidth) * sWidth;
let cH = Math.floor((window.innerHeight - (parseInt(cPadding) * 2)) / sWidth) * sWidth;
let initialX = startX = endX = setStart(cW);
let initialY = startY = endY = setStart(cH, true);
let canDraw = true;


function styleUI() {
    let root = document.querySelector(':root');
    root.style.setProperty('--radius', bRadius);
    root.style.setProperty('--spacing', cPadding);
}

function setup() {
    styleUI();
    let canvas = createCanvas(cW, cH);
    canvas.parent('canvas-container');
    clearDraw();
    strokeWeight(sWidth);
    canDraw = true;
    // colorMode(HSB, 255);
}

window.addEventListener('keyup', function(e) {
    if (e.keyCode  == 32 || e.code.toLowerCase == "space") {
        toggleDraw();
    }
})

function setStart( cGridLength, isY = false) {
    let start;
    let isGridEven = (cGridLength / sWidth) % 2 == 0;
    isGridEven = ( isY == true ) ? isGridEven : !isGridEven;

    if (isY == true) {
        start = (isGridEven == true) ? (cGridLength - sWidth) / 2 : cGridLength / 2;
    } else {
        start = (isGridEven == true) ? cGridLength / 2 : (cGridLength - sWidth) / 2;
    }
    
    return start;
}

function windowResized() {
    cW = Math.floor((windowWidth - (parseInt(cPadding) * 2)) / sWidth) * sWidth;
    cH = Math.floor((windowHeight - (parseInt(cPadding) * 2)) / sWidth) * sWidth;
    initialX = setStart(cW);
    initialY = setStart(cH, true);
    resizeCanvas(cW, cH);
    clearDraw();
}

function draw() {
    if(canDraw == true) {
        drawLine();

        if (endX < 0 || endX > cW 
            || endY < 0 || endY > cH ) {
            // toggleDraw();
            stroke(randomColor());
            startX = endX = initialX;
            startY = endY = initialY;
        }
    }
}



function toggleDraw() {
    canDraw = (canDraw != true) ? true : false;
    document.querySelectorAll('.ui').forEach(el => {
        el.classList[(canDraw != true) ? 'add' : 'remove']('paused');

    })
    document.querySelector('.resume').textContent = (canDraw != true) ? "Resume" : "Pause";
}

function clearDraw() {
    canDraw = false;
    clear();
    document.querySelectorAll('.ui').forEach(el => {
        el.classList.remove('paused');
    })
    stroke(randomColor());

    startX = endX = initialX;
    startY = endY = initialY;
}


function drawLine() {
    let direction = floor(random(0,4));
    
    switch (direction) {
        case 0:
            endY += sWidth;
            break;
        case 1:
            endX += sWidth;
            break;
        case 2:
            endY -= sWidth;
            break;
        case 3:
            endX -= sWidth;
            break;
    }

    line(startX, startY, endX, endY);
    startX = endX;
    startY = endY;
}

function randomColor() {
    let s = floor(random(60, 100));
    let l = floor(random(40, 80));

    let inh = document.getElementsByName('hue')[0].valueAsNumber;
    let range = document.getElementsByName('range')[0].valueAsNumber;
    let opacity =  document.getElementsByName('opacity')[0].valueAsNumber / 100;

    let minR = min( max(0, inh - range), 360);
    let maxR = min( max(0, inh + range), 360);
    let outh = floor(random( minR, maxR));

    let color = `hsla(${outh}, ${s}%, ${l}%, ${opacity})`

    return color;
}
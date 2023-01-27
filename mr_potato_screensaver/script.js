
const eye = document.getElementById("smile");
let parts = document.querySelector('.part');
console.log(parts)

let width,
    height,
    velocityX = 2, // 1 px/frame
    velocityY = 2, // 1 px/frame
    pause = true;

reset();
svgInit();

// for (const part in parts) {
//     const element = parts[part];
//     console.log(element);
//     // dvd(element);
// }

dvd(parts)


window.addEventListener("resize", reset, true);

function reset() {
    width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

    height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
}

function svgInit() {
    const svgs = document.getElementsByTagName("svg");
    // console.log(svgs);
    for (var i = svgs.length - 1; i >= 0; i--) {
    svgs[i].setAttribute("version", "1.1");
    svgs[i].setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
}

function dvd(part) {
    console.log(part)
var rect = part[0].getBoundingClientRect();
    var left = rect.x;
    var top = rect.y;

    if (left + rect.width >= width || left <= 0) {
    velocityX = -velocityX; // invert direction
    // eye.innerHTML= "<circle class='stroke' fill='#000000' cx='5vw' cy='5vw' r='5vw'/>";
    }
    if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY; // invert direction
    }

    // eye.style.transform =  "translate(" + ((rect.x + velocityX)) + "px," + ((rect.y + velocityY)) + "px)";
    part.style.left = rect.x + velocityX + "px";
    part.style.top = rect.y + velocityY + "px";

    requestAnimationFrame(dvd);
}
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// canvas.width = 240;
// canvas.height = 160;

function drawSquare(x, y, side) {
    context.beginPath();
    context.rect(x, y, side, side); // rect(x, y, width, height)
    context.stroke();
}

drawSquare(30, 30, 100);

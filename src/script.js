var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");

canvas.width = 200;
canvas.height = 200;

function drawSquare(x, y, side) {
    context.beginPath();
    context.rect(x, y, side, side); // rect(x, y, width, height)
    context.stroke();
}

drawSquare(30, 30, 100);
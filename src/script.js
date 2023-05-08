// YOOO MAKE SURE YOUR CANVAS HAS THIS ID:
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

function drawSquare(x, y, side) {
    cxt.beginPath();
    cxt.rect(x, y, side, side); // rect(x, y, width, height)
    cxt.stroke();
}

drawSquare(30, 30, 100);

class Floor {
    constructor() {
        this.y = canvas.height - (canvas.height * (1/4));
        this.x = 0;
        this.width = canvas.width;
        this.height = canvas.height / 2;
    }
    draw() {
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);
    }
}
  
let floor = new Floor();
floor.draw();
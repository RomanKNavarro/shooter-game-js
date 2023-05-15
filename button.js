var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

export default class Button {
    constructor(x, y, width, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 30;
        this.text = text;

        this.hover = false;
        this.clicked = false; 
    }

    draw() {
        cxt.beginPath();

        // x, y, width, height:
        cxt.rect(this.x, this.y, this.width, this.height); 
        cxt.fillStyle = 'gray'; 
        cxt.fill();

        // button outline:
        cxt.lineWidth = 2;
        cxt.strokeStyle = '#000000'; 
        cxt.stroke();
        cxt.closePath();

        // button text:
        context.font = '40pt Kremlin Pro Web';
        context.fillStyle = '#000000';
        context.fillText('Start', 345, 415);
    }

    update() {
        if (this.hover) {

        }
    }
}
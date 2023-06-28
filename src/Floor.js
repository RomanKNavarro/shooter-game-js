// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false });

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

canvas.style.width=canvas.getBoundingClientRect().width;//actual width of canvas
canvas.style.height=canvas.getBoundingClientRect().height;//actual height of canvas

var canvas_stack = new CanvasStack('canvas1');

var main_layer = canvas_stack.createLayer();
var main_layer_cxt = document.getElementById(main_layer).getContext("2d");

export default class Floor {
    constructor() {
        this.y = canvas.height - (canvas.height * (1/4));
        this.x = 0;
        this.width = canvas.width;
        this.height = canvas.height / 2;
    }
    draw() {
        cxt.beginPath();
        cxt.fillStyle = "red";
        cxt.fillRect(this.x, this.y, this.width, this.height);
    }
}
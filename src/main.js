var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.width=canvas.getBoundingClientRect().width; //actual width of canvas
// canvas.style.height=canvas.getBoundingClientRect().height; //actual height of canvas

var canvas_stack = new CanvasStack('canvas1');

var main_layer = canvas_stack.createLayer();
var main_layer_cxt = document.getElementById(main_layer).getContext("2d");

var layer2 = canvas_stack.createLayer();
var layer2_cxt = document.getElementById(layer2).getContext("2d");

main_layer_cxt.fillRect(0, 0, 100, 100);

layer2_cxt.fillStyle = "red";
layer2_cxt.fillRect(100, 100, 100, 100);

// main_layer_cxt.clearRect(0, 0, window.innerWidth, window.innerHeight);
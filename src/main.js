var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var canvas_stack = new CanvasStack('canvas1');

var main_layer = canvas_stack.createLayer();
var main_layer_cxt = document.getElementById(main_layer).getContext("2d");

var layer2 = canvas_stack.createLayer();
var layer2_cxt = document.getElementById(layer2).getContext("2d");

main_layer_cxt.fillRect(0, 0, 100, 100);

layer2_cxt.fillStyle = "red";
layer2_cxt.fillRect(100, 100, 100, 100);
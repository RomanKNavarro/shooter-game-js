var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

export default class Floor {
    constructor() {
        this.y = canvas.height - (canvas.height * (1/4));
        this.x = 0;
        this.width = canvas.width;
        this.height = canvas.height / 2;
    }
    draw() {
        cxt.fillStyle = "red";
        cxt.fillRect(this.x, this.y, this.width, this.height);
    }
}
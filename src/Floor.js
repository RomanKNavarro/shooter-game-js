var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d", { alpha: false });

export default class Floor {
    constructor(context) {
        this.y = canvas.height - (canvas.height * (1/4));
        this.x = 0;
        this.width = canvas.width;
        this.height = canvas.height / 2;
    }
    draw() {
        // cxt.beginPath();
        // cxt.fillStyle = "red";
        // cxt.fillRect(this.x, this.y, this.width, this.height);
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Pickup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;

        this.size = 10;
    }

    update() {
        // this.y -= 15;
        this.x -= 10;
    }

    draw() {
        if (!this.delete) {
            cxt.beginPath();
            cxt.fillStyle = "purple";
            cxt.fillRect(this.x, this.y, this.size, this.size);
            cxt.fill();
        };
    }
}
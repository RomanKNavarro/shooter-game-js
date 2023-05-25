export default class Pickup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;

        this.size = 10;
    }

    update() {
        this.y -= 15;
    }

    draw() {
        if (!this.delete) {
            cxt.fillStyle = "purple";
            cxt.beginPath();
            cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            cxt.fill();
        };
    }
}
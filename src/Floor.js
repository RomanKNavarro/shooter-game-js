export default class Floor {
    constructor(canvas) {
        this.canvas = canvas;
        this.y = this.canvas.height - (this.canvas.height * (1/4));
        this.x = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height / 2;
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
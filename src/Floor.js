class Flora {
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
// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false });

export default class Floor {
    constructor(canvasa, contexto) {
    // constructor() {
        this.canvasa = canvasa;
        this.contexto = contexto;
        this.y = this.canvasa.height - (this.canvasa.height * (1/4));
        this.x = 0;
        this.width = this.canvasa.width;
        this.height = this.canvasa.height / 2;
    }
    draw() {
        // cxt.beginPath();
        // cxt.fillStyle = "red";
        // cxt.fillRect(this.x, this.y, this.width, this.height);
        this.contexto.beginPath();
        this.contexto.fillStyle = "red";
        this.contexto.fillRect(this.x, this.y, this.width, this.height);
    }
}
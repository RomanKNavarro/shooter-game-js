var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class TextWall {
    constructor(text) {
        this.text = text
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // let array = this.text.
    }
}
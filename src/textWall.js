var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class TextWall {
    constructor(text) {
        this.text = text;
    }

    draw() {
        cxt.fillStyle = "white";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        // let array = this.text.
        cxt.fillStyle = "black";
        //cxt.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";

        // HOW TO CENTER TEXT IN BUTTON:
        cxt.textAlign = "center";
        cxt.textBaseline = "middle";
        cxt.fillText(this.text, canvas.width / 2, canvas.height / 2);

        // cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }
}
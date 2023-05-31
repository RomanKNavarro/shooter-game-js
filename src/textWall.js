var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

import Button from "./button.js";

export default class TextWall {
    constructor(text) {
        // this.x = 30;
        // this.y = 30;

        this.text = text;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
    }

    draw() {
        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        cxt.fillStyle = "white";
        for (let i = 0; i < this.lines.length; i++) {
            cxt.fillText(this.lines[i], canvas.width / 2, canvas.height / 5 + (i * this.lineheight));
        };
    }
}
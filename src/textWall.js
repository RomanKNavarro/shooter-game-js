var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

import Button from "./button.js";

export default class TextWall {
    constructor(text, y) {
        // this.x = 30;
        // this.y = 30;

        this.text = text;
        //this.fontSize = fontSize;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
        this.y = y
    }

    draw() {
        // cxt.fillStyle = "black";
        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        // cxt.fillStyle = "white";
        // cxt.fillStyle = "black";
        cxt.font = "30px Permanent Marker";
        for (let i = 0; i < this.lines.length; i++) {
            // cxt.fillText(this.lines[i], canvas.width / 2, canvas.height / 5 + (i * this.lineheight));
            cxt.fillText(this.lines[i], canvas.width / 2, this.y + (i * this.lineheight));
        };
    }
}
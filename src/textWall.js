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
        cxt.fillStyle = "white";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        cxt.fillStyle = "black";
        for (let i = 0; i < this.lines.length; i++) {
            cxt.fillText(this.lines[i], canvas.width / 2, canvas.height / 5 + (i * this.lineheight));
        };

        const yesButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);
        const noButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);

        yesButton.draw();
        noButton.draw();


    }
}
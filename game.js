import Button from "./button.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// ALL BUTTON INSTANCES TO BE USED HERE:
export default class Game {
    constructor() {
        this.menu = true;
        this.gameOver = false;
        this.running = false; 

        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        // signature: (x, y, width, text)
        this.startButton = new Button(canvas.width / 2, canvas.height / 2, 100, "Initiate Massacre");
    }


    init() {
        if (this.menu) {
            this.startButton.draw();

            if (this.mouseCollision(this.startButton))
        }
    }

    // what goes first? mouse or button?
    mouseCollision(first, second) {
        if (first.x >= second.x && first.x <= second.x + second.size &&
          first.y >= second.y && first.y <= second.y + second.size) {
          return true;
        }
    }
}
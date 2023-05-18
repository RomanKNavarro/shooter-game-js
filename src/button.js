var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

export default class Button {
    constructor(x, y, width, text, clickable) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 30;
        this.text = text;
        this.stroke = "black";
        this.clicked = false; 

        this.clickable = clickable;

    }

    draw() {
        if (this.clickable) {
            cxt.beginPath();

            // x, y, width, height:
            cxt.rect(this.x, this.y, this.width, this.height); 
            cxt.fillStyle = 'gray'; 
            cxt.fill();
    
            // button outline:
            cxt.lineWidth = 2;
            cxt.strokeStyle = this.stroke;
            cxt.stroke();
            //cxt.closePath();
    
            // button text:
            cxt.font = "12px serif";
    
            cxt.fillStyle = "black";
            //cxt.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
    
            // HOW TO CENTER TEXT IN BUTTON:
            cxt.textAlign = "center";
            cxt.textBaseline = "middle";
            cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
        
        else {
            // this.fadeIn(1);

            setTimeout(this.fadeIn(1), 10000);

        }
    }

    fadeIn(alpha) {
        // var alpha = 1.0,
        // interval = setInterval(function () {
        //     canvas.width = canvas.width; // Clears the canvas
        //     cxt.fillStyle = "black";
        //     cxt.font = "40px Tourney";
        //     cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        //     //cxt.fillText(text, 50, 50);

        //     alpha = alpha - 0.05; // decrease opacity (fade out)
        //     if (alpha < 0) {
        //         canvas.width = canvas.width;
        //         clearInterval(interval);
        //     }
        // }, 50);

        // cxt.fillStyle = "black";
        cxt.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        cxt.font = "40px Tourney";
        cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    delete() {
        this.alpha = 0.3;
        this.fadeIn();
    }
}

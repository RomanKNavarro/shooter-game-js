var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d", { alpha: false });

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
        this.show = true;
        this.alpha = 1;
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
        
        else if (this.show) {
            this.fadeIn();
        }
    }

    fadeIn() {
        cxt.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
        cxt.font = "30px Tourney";
        cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));

        cxt.textAlign = "center";
        cxt.textBaseline = "middle";
        cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    delete() {
        this.alpha = 0.3;
        this.fadeIn();
        cxt.clearRect(this.x, this.y, this.width, this.height);
    }
}

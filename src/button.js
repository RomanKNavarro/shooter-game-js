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
    
            // HOW TO CENTER TEXT IN BUTTON:
            cxt.textAlign = "center";
            cxt.textBaseline = "middle";
            cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
        
        else {
            cxt.fillStyle = "black";
            cxt.font = "40px Tourney";
            cxt.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
    }
}

// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false });

export default class Button {
    constructor(x, y, width, text, clickable, canvasa, contexto) {
        this.canvasa = canvasa;
        this.contexto = contexto;

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
            this.contexto.beginPath();
            this.contexto.rect(this.x, this.y, this.width, this.height); 
            this.contexto.fillStyle = 'gray'; 
            this.contexto.fill();
            
            // button outline:
            this.contexto.lineWidth = 2;
            this.contexto.strokeStyle = this.stroke;
            this.contexto.stroke();
            //this.contexto.closePath();
    
            // button text:
            this.contexto.font = "12px serif";
    
            this.contexto.fillStyle = "black";
            //this.contexto.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
    
            // HOW TO CENTER TEXT IN BUTTON:
            this.contexto.textAlign = "center";
            this.contexto.textBaseline = "middle";
            this.contexto.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
        else if (this.show) {
            this.fadeIn();
        }
    }

    fadeIn() {
        this.contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
        this.contexto.font = "30px Tourney";
        this.contexto.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));

        this.contexto.textAlign = "center";
        this.contexto.textBaseline = "middle";
        this.contexto.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    delete() {
        this.alpha = 0.3;
        this.fadeIn();
        this.contexto.clearRect(this.x, this.y, this.width, this.height);
    }
}

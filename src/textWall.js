var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class TextWall {
    constructor(text, y) {
        // this.x = 30;
        // this.y = 30;

        this.text = text;
        //this.fontSize = fontSize;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
        this.y = y;
        this.vanish = false;
    }

    draw() {
        // cxt.fillStyle = "black";
        if (!this.vanish) {
            cxt.fillStyle = "black";
            cxt.fillRect(0, 0, canvas.width, canvas.height);
    
            cxt.fillStyle = "white";
            //cxt.fillStyle = "black";
            // cxt.font = "16px Permanent Marker";
            // cxt.font = "15px Times New Roman";
            // cxt.font = "15px Blockschrift";
            cxt.font = "15px blockschrift-f-regular";
            for (let i = 0; i < this.lines.length; i++) {
                // cxt.fillText(this.lines[i], canvas.width / 2, canvas.height / 5 + (i * this.lineheight));
                cxt.fillText(this.lines[i], canvas.width / 2, this.y + (i * this.lineheight));
            }
        }
    }
}
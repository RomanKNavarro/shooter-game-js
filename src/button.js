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

    draw(context) {
        if (this.show) {
            if (this.clickable) {
                context.beginPath();
                context.rect(this.x, this.y, this.width, this.height); 
                context.fillStyle = 'gray'; 
                context.fill();
                
                // button outline:
                context.lineWidth = 2;
                context.strokeStyle = this.stroke;
                context.stroke();
                //context.closePath();
        
                // button text:
                context.font = "12.5px serif";
        
                context.fillStyle = "black";
                //context.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        
                // HOW TO CENTER TEXT IN BUTTON:
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));
            }
            else {
                context.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                context.font = "25px Tourney";
                // context.fillText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));
        
                context.textAlign = "center";
                context.textBaseline = "middle";
                // context.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
                context.fillText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));
            }
        }
    }
}

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class AirEnemy extends Enemy {
    constructor(x, y) {
        this.speed = 7;
        this.color = "orange";
  
        this.x = x;
        this.y = y;

        this.force = "air";
    }

    draw() {
        cxt.beginPath();
        cxt.fillStyle = this.color;
        cxt.fillRect(this.x, this.y, this.width, this.height);
  
        cxt.font = "20px serif";
        cxt.fillStyle = "black";
  
        cxt.textAlign = "center";
        cxt.textBaseline = "middle";
  
        if (this.number <= this.pickupOdds) {
          this.pickup = true   
        }
  
        cxt.fillText(this.force, this.x + (this.width / 2), this.y + (this.height / 2));
      }
  }
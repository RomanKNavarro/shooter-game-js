import Projectile from "./projectile.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Shooter {
    constructor(x, y) {
      this.width = 50;
      this.height = 50;
      this.x = x;
      this.y = y;

      this.shooting = false;
      this.projectiles = [];
      this.timer = 0;
    }
  
    draw() {
        console.log(this.x);
        cxt.beginPath();
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);
        // cxt.stroke();
    }
  

    update() {
      if (this.shooting) {
        // while shooting is true, increment timer. If divisible by 10, push projectile
        this.timer++;           
        if (this.timer % 10 === 0) {
          projectiles.push(new Projectile(this.x + this.width - 20, this.y + 55));
        }
      } else {
        this.timer = 0;
      }
    }
}
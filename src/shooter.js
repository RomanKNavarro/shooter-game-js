import Projectile from "./projectile.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Shooter {
    constructor(x, y) {
      this.width = 50;
      this.height = 50;
      this.x = x;
      this.y = y;

      this.name = "Warren";

      this.projectiles = [];
      this.shooting = false;
      this.timer = 0;
    }
  
    draw() {
        cxt.beginPath();
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);
    }
  
    // this.shooting set to true successful, but still will not shoot
    update() {
        console.log("erbody round me shooters");
        if (this.shooting) {
            // while shooting is true, increment timer. If divisible by 10, push projectile. Genius.
            this.timer++;           
            if (this.timer % 10 === 0) {
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 55));
                console.log(this.projectiles.length);
            }
        } 
        else {
            this.timer = 0;
        }
    }
}
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

// BULLETS
export default class Projectile {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 5;
      this.speed = 6;
    }
    
    update() {
      this.x += this.speed;
    }
  
    draw() {
      cxt.fillStyle = "black";
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      cxt.fill();
    }
}
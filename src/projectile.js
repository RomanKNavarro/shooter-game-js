var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

// BULLETS
export default class Projectile {
    constructor(x, y, direction) {
      // constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 5;
      this.speed = 6;
      this.delete = false;

      this.direction = direction;

    }
    
    update() {
      if (!this.delete) {
        switch (this.direction) {
          case "straight":
            this.x += this.speed;
            break

          case "up":
            this.x += 0;
            this.y -= this.speed;
            break;
          
          case "diagnal":
            this.x += this.speed;
            this.y -= this.speed;
          
          case "down": 
            this.x += this.speed;
            this.y = this.y + 30;
        }
      }
      if (this.x > canvas.width - 100) {
        this.delete;
      }
    }
  
    draw() {
      cxt.fillStyle = "black";
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      cxt.fill();
    }
}
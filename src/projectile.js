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
        this.x += this.speed;

        //   HERE IS THE CULPRIT MAKING MY GAME SLOW. It fixed on its own LOOOOL:
        switch (this.direction) {
          case "up":
            //this.x += this.speed;
            this.y -= this.speed;
            break;
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
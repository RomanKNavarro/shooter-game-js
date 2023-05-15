var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    constructor(x, y) {
  
      this.width = this.height = 50;

      this.speed = 5;
  
      this.x = x;
      this.y = y;
  
      this.moving = true;
      this.delete = false;

      this.color = "pink"
    }

    draw() {
      if (!this.delete) {
        cxt.beginPath();
        cxt.fillStyle = this.color;
        cxt.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  
    update() {
      this.x -= this.speed;
    }
}
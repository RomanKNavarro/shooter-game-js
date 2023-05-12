var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    constructor(x, y) {
  
      this.width = 100;
      this.height = 100;

      this.speed = 5;
  
      this.x = x;
      this.y = y;
  
      this.moving = true;
    }

    draw() {
        cxt.beginPath();
        cxt.fillStyle = "pink";
        cxt.fillRect(this.x, this.y, this.width, this.height);
      }
  
    update() {
      this.x -= this.speed;

      if(this.x + this.width < 0){
        this.x = canvas.width;
    }
    }
}
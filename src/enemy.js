var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    constructor(x, y) {
  
      this.width = this.height = 50;

      this.speed = 5;
  
      this.x = x;
      this.y = y;
  
      this.moving = true;

      this.color = "pink"
      this.delete = false;
    
      // 2/10 chance enemy will drop a pickup:
      // this.pickupOdds = Math.floor(Math.random() * 10)
      this.pickUpSpawnChance = 9;
      this.pickup = false;

    }

    draw() {
      cxt.beginPath();
      cxt.fillStyle = this.color;
      cxt.fillRect(this.x, this.y, this.width, this.height);
      
    }
  
    update() {
      this.x -= this.speed;
      
      if (this.pickUpSpawnChance <= Math.floor(Math.random() * 10)) {
        this.pickup = true;
      }

      console.log(this.pickup);
    }
}
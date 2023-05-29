var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    constructor(x, y, speed) {
  
      this.width = this.height = 50;

      // speed is initially 5:
      this.speed = speed;
  
      this.x = x;
      this.y = y;
  
      this.moving = true;

      this.color = "pink"
      this.delete = false;
      this.force = "ground";
    
      // 2/10 chance enemy will drop a pickup:

      this.pickupNum = Math.floor(Math.random() * 10);
      this.pickupOdds = 0.5;
      this.pickup = false;

      // this.types = ["stand", "crawl"];

      //this.type = _.sample(["ground", "crawl", "air"]);

      this.typeNum = Math.floor(Math.random() * 10);
      this.type = "ground";


    }

    draw() {
      cxt.beginPath();
      cxt.fillStyle = this.color;
      cxt.fillRect(this.x, this.y, this.width, this.height);

      cxt.font = "20px serif";
      cxt.fillStyle = "black";

      cxt.textAlign = "center";
      cxt.textBaseline = "middle";

      if (this.pickupNum <= this.pickupOdds) {
        this.pickup = true   
      }

      cxt.fillText(this.type, this.x + (this.width / 2), this.y + (this.height / 2));

    }
  
    update() {
      this.x -= this.speed;
    }
}
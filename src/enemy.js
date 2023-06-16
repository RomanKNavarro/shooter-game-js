import Projectile from "./projectile.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    // constructor(x, y, speed) {
    constructor(x, speed) {
  
      this.width = 50;
      this.height = 50;

      // speed is initially 5:
      this.speed = speed;
      // this.x = x;
      // this.y = y;

      this.x = x;
      this.y;
  
      this.moving = true;

      this.color = "pink"
      this.dead = false;
      this.force = "ground";

      this.pickupNum = Math.floor(Math.random() * 10);
      //this.pickupOdds = 0.5;
      this.pickupOdds = 8;
      this.pickup = false;

      this.typeNum = Math.random() * 10;

      this.groundOdds = 8;
      this.airOdds = 5;
      this.crawlOdds = 1.5;

      this.isCivie = false;

      // ground, crawl, air, civie
      // this.type = "ground";
      this.type = "ground";
      this.health = 2;

      // ENEMY GUN:
      this.projectiles = [];
      // this.fireRate = 200;
      // this.fireRate = 150;
      this.fireRate = 100;
      this.shooting = false;
      this.timer = 0;
      this.angle = "back";

      // POSITION CRAP:
      this.inPosition = false;
      this.position = 0;

      this.growl = new Audio();
      this.growl.src = "/src/assets/sounds/paco.flac";
    }

    draw() {
      cxt.beginPath();
      cxt.fillStyle = this.color;
      cxt.fillRect(this.x, this.y, this.width, this.height);

      cxt.font = "20px serif";
      cxt.fillStyle = "black";

      cxt.textAlign = "center";
      cxt.textBaseline = "middle";

      if (this.isCivie) this.color = "gray";

      if (this.pickupNum <= this.pickupOdds) {
        this.pickup = true   
      }
      if (this.typeNum <= this.crawlOdds) {
        this.type = "crawl";
        this.width = 30;
        this.height = 30;
      }
      else if (this.typeNum <= this.airOdds) this.type = "air";

      cxt.fillText(this.pickupNum, this.x + (this.width / 2), this.y + (this.height / 2));
    } // projectiles
  
    update() {
      // THIS WORKS
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
          this.speed = 0;
          this.timer++;

          let gunSound = this.type != "crawl" ? "shotty" : "growl";
          //   MIGHT HAVE TO REVERT
          // if ((this.type != "crawl") && (this.timer % this.fireRate === 0  || this.timer == 1)) {
            if (this.timer % this.fireRate === 0  || this.timer == 1) {  
            // this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, "shotty")); 
              this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, gunSound, this.dead)); 
          }
      }
    }
}


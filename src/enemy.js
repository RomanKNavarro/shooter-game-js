import Projectile from "./projectile.js";

// OVERHAUL SPEED FUNCTIONALITY:
export default class Enemy {
    constructor(x, speed, round) {
      // cxt
      // FASTER SPEED ON CRAWLIES
      this.width = 50;
      this.height = 50;

      // speed is initially 5:

      this.speed = speed;
      // this.speed = 2;

      this.x = x;
      this.y;

      this.round = round;
      //this.round = 12;

      this.color = "pink"
      this.dead = false;

      this.pickupNum = Math.floor(Math.random() * 10);
      this.pickupOdds = 0.5;
      // this.pickupOdds = 8;
      this.pickup = false;

      this.typeNum = Math.floor(Math.random() * 10);

      this.groundOdds = 10;
      this.airOdds = 4;
      this.crawlOdds = 2;
      this.bomberOdds = 2;


      this.isCivie = false;
      this.inNadeRange = false;

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

      this.dead = false;

      this.growl = new Audio();
      this.growl.src = "/src/assets/sounds/paco.flac";
      this.sound;

      // TUTORIAL CRAP:
      this.meat = false;
    }

    draw(context) {
      context.beginPath();
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);

      context.font = "20px serif";
      context.fillStyle = "black";

      context.textAlign = "center";
      context.textBaseline = "middle";

      if (this.isCivie) this.color = "gray";

      if (this.pickupNum <= this.pickupOdds) {
        this.pickup = true   
      }

      // if (this.isCivie) this.speed = -2;

      // spawn crawlies first, then airs
      if (this.typeNum <= this.crawlOdds && this.round >= 3) {
      // if (this.typeNum <= this.crawlOdds) {
          this.type = "crawl";
          this.width = 30;
          this.height = 30;
          // this.speed = -3;
          // this.speed = 3;

          if (!this.isCivie) this.speed = 4;
          else this.speed = -3;
      }
      else if (this.typeNum <= this.airOdds && this.round >= 2) this.type = "air";
      // else if (this.typeNum <= this.bomberOdds && this.round >= 9) this.type = "bomber";

      // in last round, crawlies and bombers have equal chance of spawning:
      else if (this.typeNum <= this.crawlOdds && this.round >= 9) this.type = ["crawl", "bomber"][ Math.floor(Math.random() * 2)];

      // context.fillText(this.round, this.x + (this.width / 2), this.y + (this.height / 2));
      context.fillText(this.round, this.x + (this.width / 2), this.y + (this.height / 2));
    } // projectiles
  
    update() {
      // THIS WORKS
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
          this.speed = 0;
          this.timer++;

          // REVISE FOR BOMBER AND ASSAULT SHEEP:
          // let gunSound = this.type != "crawl" ? "shotty" : "growl";

          switch(this.type) {
            case "crawl":
              this.sound = "growl";
              break;
            case "ground":
            case "air":
              this.sound = "shotty";
              break;
            case "bomber":
              this.sound = "growl";
              break;
          }

          //   MIGHT HAVE TO REVERT
          // if (this.timer % this.fireRate === 0  || this.timer == 1) {  
            if ((this.timer % this.fireRate === 0  || this.timer == 1) 
            && (this.timer >= 50 || this.type == "air")) {  
              this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.sound, this.dead)); 
          }
      }
    }
}


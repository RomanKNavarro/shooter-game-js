import Projectile from "./projectile.js";

// OVERHAUL SPEED FUNCTIONALITY:
export default class Enemy {
    // what's the speed parameter for again? to increase speed globally as rounds progress :)
    constructor(x, speed, round) {
      // cxt
      // FASTER SPEED ON CRAWLIES
      this.width = 50;
      this.height = 50;

      this.speed = speed;

      this.x = x;
      this.y;

      this.round = round;

      this.color = "pink"
      this.dead = false;

      this.pickupNum = Math.floor(Math.random() * 10);
      this.pickupOdds = 0;
      this.pickup = false;

      this.typeNum = Math.floor(Math.random() * 10);

      this.isCivie = false;
      this.inNadeRange = false;

      this.duckable = false;

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

      this.beaming = false;
      this.beamHeight = 180;
      this.openFire = 100;
      this.beamActive = false;

      // ODDS CRAP:
      // base enemies:
      // 6/10 chance to spawn ground, 4/10 ch. to spawn air, 2/10 to spawn spec (dog, bomber, sheep)
      this.groundOdds = 10;
      this.airOdds = 4;
      this.specOdds = 2;

      // initially, bombers don't spawn until round
      this.bomberOdds = 1;
      this.sheepOdds = 1;

      // sheep pushed on round 10:
      this.specOrcs = ["crawl"];
      this.specOrc = this.specOrcs[Math.floor(Math.random() * this.specOrcs.length)];


      // this.weapon = ["flammen", "grenade"][Math.floor(Math.random() * 2)];

      /* EVENTS:
        round 1: only ground enemies
        round 2: only ground and air enemies
        round 3: pickups and dogs introduced (health, ar, grenade), plus ducking
        round 4: grenades introduced
        round 5: Massacre. Natural text at end
        round 6: good and soon text at beginning. Bombers introduced. pickupOdds increased.
        round 7: flammen introduced. Should have same equality as grenade. AR becomes minority
        round 8: second shooter introduced
        round 9: crazy round
        round 10: boss fight. Sheep introduced. More civies.
      */
    }

    renderBeam(context) {
      if (this.timer >= this.openFire) {
        context.beginPath();
        context.fillStyle = "purple";
        context.fillRect(this.x + (this.width * 0.5), this.y, 30, this.beamHeight);
      }
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

      // misc. events:
      // introduce bomber:
      if (this.round >= 6) this.pickupOdds = 1;

      if (this.round >= 3) {
        this.specOrcs.push("bomber");
      }
      if (this.round == 10) {
        this.specOrcs.push("sheep");
      }
      if (this.pickupNum <= this.pickupOdds && this.round <= 4) {
        this.pickup = true   
      }

      // THIS STUFF BELOW IS SIMPLY ASSIGNMENT OF PROPERTIES DEPENDING ON ENEMY TYPE:
      // spawn crawlies first, then airs
      if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
        this.type = "air";
        this.openFire = 150;
        this.fireRate = 150;
        this.health == 1;
      }
      // if (this.typeNum <= this.crawlOdds && this.round >= 1) {
      // what's specOdds again? 2
      else if (this.typeNum <= this.specOdds) {  
        if (this.specOrc == "crawl" && this.round >= 3) {
          this.type = "crawl";
          this.width = 30;
          this.height = 30;

          if (!this.isCivie) this.speed = 4;
          else this.speed = -3;
        }
        else if (this.specOrc == "bomber" && this.round >= 6) {
          this.type = "bomber";
          this.openFire = 200;
          this.fireRate = 15;
          this.width = 70;
          this.height = 70;
          this.health == 2;
        }
      }
      // if (this.typeNum <= this.crawlOdds) {
      // 4
      else if (this.typeNum <= this.crawlOdds && this.round >= 1) {
        // if (this.typeNum <= this.crawlOdds) {
            // this.type = "crawl";
            // this.width = 30;
            // this.height = 30;
            this.type = "bomber";
            this.openFire = 200;
            this.fireRate = 15;
            this.width = 70;
            this.height = 70;
            this.health == 2;
  
            if (!this.isCivie) this.speed = 4;
            else this.speed = -3;
        }
      // else if (this.typeNum == "sheep") {
      //   // this.speed = 
      //   this.health == 2;
      // }

      // in last round, crawlies and bombers have equal chance of spawning:
      // else if (this.typeNum <= this.crawlOdds && this.round >= 9) this.type = ["crawl", "bomber"][ Math.floor(Math.random() * 2)];

      context.fillText(`${this.typeNum}`, this.x + (this.width / 2), this.y + (this.height / 2));
    } // projectiles
  
    update() {
      // THIS WORKS
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
        this.timer++;

        switch(this.type) {
          case "crawl":
            this.sound = "growl";
            break;
          case "ground":
          case "air":
            this.sound = "shotty";
            break;
          case "sheep":
            this.sound = "laser-gun";
        }

        if (this.timer >= this.openFire && this.timer % this.fireRate === 0) {
          this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.sound, this.dead)); 
          if (this.type == "bomber") this.beamActive = true;
        } 
      }
    }
}

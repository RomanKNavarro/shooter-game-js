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

      this.pickupNum = Math.floor(Math.random() * 15);
      this.pickupOdds = 0;
      this.pickup = false;

      this.isCivie = false;
      this.inNadeRange = false;

      this.duck = false;
      this.duckable = false;

      // ground, crawl, air, civie
      // this.type = "ground";
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
      

      // initially, bombers don't spawn until round

      // this.typeNum = Math.floor(Math.random() * 10);

      // this.groundOdds = 10; // 6  
      // this.airOdds = 4;     // 3
      // this.crawlOdds = 1;   // 2
      // this.bomberOdds = 1;  // 2
      // this.sheepOdds = 2;

      this.typeNum = Math.floor(Math.random() * 20);
      this.groundOdds = 20; // 8
      this.airOdds = 12;    // 6
      this.crawlOdds = 6;   // 4
      this.bossOdds = 2;    // 3  
      // ^ if on rounds 7-9, spawn only bomber. If on boss round, spawn bomber and sheep

      // sheep pushed on round 10:
      this.bossType = ["bomber", "sheep"][Math.floor(Math.random() * 2)];
      // this.specOrc = this.specOrcs[Math.floor(Math.random() * this.specOrcs.length)];
      // this.type = this.orcTypes[Math.floor(Math.random() * this.orcTypes.length)];
      this.otherOdds = 5;
      // this.type;
      // this.type = "ground";
      this.type;

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

    update() {
      // HEIRARCHY CRAP:
      // if (this.typeNum <= this.bossOdds && this.round == 9) {
      // 0-2
      if (this.typeNum <= this.bossOdds) {
        if (this.round < 6) this.type = "ground";
        else if (this.round >= 6 && this.round < 10) this.type = "bomber";
        else this.type = this.bossType;   // <- if round 10

        // this.type = "bomber";
        // this.type = "sheep";
      }
      // else if (this.typeNum <= this.crawlOdds) {
      // 3-6
      else if (this.typeNum <= this.crawlOdds && (this.round >= 3)) {
        this.type = "crawl";
      }
      // if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
      // if (this.typeNum <= this.airOdds) {
      // 6-12
      else if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
        this.type = "air";
      }
      else this.type = "ground";

      switch(this.type) {
        case "crawl":
          this.sound = "growl";
          this.width = 30;
          this.height = 30;
          this.health = 1;

          if (this.isCivie) this.speed = -4;
          else this.speed = 4;
          break;

        case "ground":
          this.sound = "shotty";
          break;

        case "air":
          this.sound = "shotty";
          // this.openFire = 150;
          this.fireRate = 150;
          this.health = 1;

          // THIS IS IN REVERSE LOOOL BUT THAT'S THE WAY IT WORKS (HTMS)
          if (this.isCivie) this.speed = -3.5;
          else this.speed = 3.5;
          break;
        
        // OPENFIRE BY DEFAULT IS 
        case "bomber":
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 70;
          this.height = 70;
          break;

        case "sheep":
          this.sound = "laser-gun";
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 60;
          this.height = 60;
          break;
      }

      // THIS WORKS
      // THIS CRAP IS SOLEY FOR AUDIO LOOOL:
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
        this.timer++;

        if (this.timer >= this.openFire && this.timer % this.fireRate === 0) {
          this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.sound, this.dead)); 
          if (this.type == "bomber") this.beamActive = true;
        } 
      }

      // THIS STUFF BELOW IS SIMPLY ASSIGNMENT OF PROPERTIES DEPENDING ON ENEMY TYPE:
      // spawn crawlies first, then airs

      // misc. events:
      // introduce bomber:
      if (this.round >= 6) this.pickupOdds = 1;
      if (this.pickupNum <= this.pickupOdds && this.round >= 3) {
        this.pickup = true   
      }
    }
    draw(context) {
      context.beginPath();
      context.fillStyle = this.color;
      // context.fillRect(this.x, this.y, this.width, this.height);

      // if (!this.duck) {
      //     context.fillRect(this.x, this.y, this.width, this.height);
      // } else {
      //     context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
      // }

      // if (this.duck && this.type == "sheep") {
      if (this.duck) {
        context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
      } else {
        context.fillRect(this.x, this.y, this.width, this.height);
      }

      context.font = "20px serif";
      context.fillStyle = "black";

      context.textAlign = "center";
      context.textBaseline = "middle";

      if (this.isCivie) this.color = "gray";
      // in last round, crawlies and bombers have equal chance of spawning:
      // else if (this.typeNum <= this.crawlOdds && this.round >= 9) this.type = ["crawl", "bomber"][ Math.floor(Math.random() * 2)];

      context.fillText(`${this.angle}`, this.x + (this.width / 2), this.y + (this.height / 2));
    } // projectiles

    renderBeam(context) {
      if (this.timer >= this.openFire) {
        context.beginPath();
        context.fillStyle = "purple";
        context.fillRect(this.x + (this.width * 0.5), this.y, 30, this.beamHeight);
      }
    }
}

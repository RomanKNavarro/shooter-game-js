// BULLETS
export default class Projectile {
    // "dead" used as determinant for playing sounds
    constructor(x, y, direction, weapon, dead) {

      // NEW HOWLER CRAP (sound fx "bucket"):
      this.sfx = {
        pistol: new Howl({
          /* accepts multiple versions of the same audio! (automatically selects the best one for the 
          current web browser */
          src: [
            "src/assets/sounds/shots/pistol.wav",
          ],
          loop: false,
          volume: 0.6
        }),
        ar: new Howl({
          src: [
            "src/assets/sounds/shots/cg1.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
          volume: 0.6
        }), 
        flammen: new Howl({
          src: [
            "src/assets/sounds/laser.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 
        shotty: new Howl({
          src: [
            "src/assets/sounds/shots/rifle.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
          volume: 0.6,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 
        growl: new Howl({
          src: [
            "/src/assets/sounds/paco.flac",
          ],
          // the "loop" flag is false by default!
          loop: false,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 
        bomber: new Howl({
          src: [
            "src/assets/sounds/ray-beam.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
        }), 
        laser: new Howl({
          src: [
            "src/assets/sounds/laser-buzz.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
        }), 


      }

      // constructor(x, y) { lol test
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.weapon = weapon;
      this.dead = dead;

      this.size = 2;

      this.speed = 10;
      // this.speed = 1;
      // this.speed =5;
      this.delete = false;
      this.randomY = [1.7, 2, 2.2, 2.4, 2.6, 2.8, 3];
      // needs to shoot in the same directon (110 y) as randomY values:
      this.randomY_duck = [1.1, 1.2, 1.3, 1.4];

      this.bulletLimit;

      // HERE IS WHERE PROJECTILE'S Y GETS CHANGED:
      // place bullet's y low when shooting down:
      // if (this.direction == "down" || this.direction == "down-back" || this.direction == "diagnal-duck") {
      //   this.y = this.y + 25;
      // }
    }

    playSound(sound) {
      if (!sound.playing()) {
        sound.play();
      }
    }
    
    update() {
      switch (this.weapon) {
        case "pistol":
          this.playSound(this.sfx.pistol);
          break;
        case "shotty":
          this.size = 5;
          if (!this.dead) {
            // this.shotty.play();
            this.playSound(this.sfx.shotty);
          } else {
            this.sfx.shotty.stop();
          } 
          break;
        case "ar":
          this.size = 5;
          this.speed = 12;
          // this.ar.play();
          this.playSound(this.sfx.ar);
          break;

        case "flammen":
          this.playSound(this.sfx.flammen);
          // this.speed = 12;
          this.speed = 11;
          break;

        case "laser-gun":
          this.playSound(this.sfx.laser);
          this.speed = 7;
          break;
      }

      // DIRECTION TO SHOOT IN:
      switch (this.direction) {
        case "straight":
          this.x += this.speed;
          // this.y += this.speed; <- yup, this works
          break

        case "up":
        case "down-up":   
          this.x += 0;
          this.y -= this.speed;
          break;
        
        case "diagnal":
          this.x += this.speed;
          this.y -= this.speed / this.randomY[Math.floor(Math.random() * this.randomY.length)];
          break;
        
        case "diagnal-duck":
          this.x += this.speed;
          this.y -= this.speed / this.randomY_duck[Math.floor(Math.random() * this.randomY_duck.length)];
          break;

        case "down":
          this.x += this.speed;
          break;
        //   this.y = this.y + 30;

        case "back":
        case "down-back":
          this.x -= this.speed;
          break;
        
        case "diagnal-back":
          this.x -= this.speed;
          this.y -= this.speed * 2  
          break;

        // THIS IS FOR AIR ENEMIES:
        case "down-diagnal":
          // this.x -= this.speed;
          // this.y += this.speed / 2;
          this.x -= this.speed / 1.3;
          this.y += this.speed / 2;
          break;

        // FOR BOMBERS:
        case "straight-down":
          this.y += this.speed;
          break;  
      }
    }
    
    draw(context) {
      if (this.weapon == "flammen") {
        context.strokeStyle = "green";
        context.beginPath();
        context.lineWidth = 3;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    } 
}
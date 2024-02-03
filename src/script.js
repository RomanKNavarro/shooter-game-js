var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false });
var cxt = canvas.getContext("2d");
canvas.style.width=canvas.getBoundingClientRect().width;//actual width of canvas
canvas.style.height=canvas.getBoundingClientRect().height;//actual height of canvas

// TODO: fix music  

document.getElementById('canvas2').style.backgroundImage="url(src/assets/images/background/background-working3.png)"; // specify the image path here

// STRICTLY FOR BULLETS:
var bullet_canvas = document.getElementById("bullet-canvas");       
var bullet_cxt = bullet_canvas.getContext("2d");        
bullet_canvas.style.width=bullet_canvas.getBoundingClientRect().width;//actual width of canvas      
bullet_canvas.style.height=bullet_canvas.getBoundingClientRect().height;//actual height of canvas   

// FOR STATICS:
var canvas2 = document.getElementById("canvas2");
var cxt2 = canvas2.getContext("2d");

// drawn on canvas (first)
class Floor {
    constructor() {
        this.canvas = canvas;
        this.y = this.canvas.height - (this.canvas.height * (1/4)); // y of floor is 225. So, floor is 75px tall.
        this.x = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height / 2;
    }
    draw(context) {
        context.beginPath();
        // context.fillStyle = "green";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Shooter {
    // constructor(x) { 
    constructor(x, y) { 
        this.canvas = canvas;
        this.width = 44;
        this.height = 34;
        this.y = y;

        this.bulletY;   // this to be added to the y. Standing: 5, Duck: 10
        this.bulletX = 19;

        this.init = false;

        this.x = x;
        this.secondX = 200;

        this.isSecond = false;
        this.initSecond = false;
        this.secondReady = false;

        this.secondStream = false;

        this.name = "Warren";
        this.disabled = true;
        this.health = 3;
        this.delete = false;
        this.dead = false;

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not-shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;
        this.timer = 0;

        // used in input handler:
        this.duckable = true;
        this.duck = false;

        this.angle = "straight";

        // pistol, ar, and flamethrower
        this.weapon = "pistol";
        this.fireRate = 0;
        this.specialAmmo = 0;
        
        // this.weapon = "flammen";
        // // this.weapon = "ar";
        // this.fireRate = 10;
        // this.specialAmmo = 100;

        this.throwBoom = false; 
        this.secondNade = false;

      // mouse stuff in here lol, used in script.js
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        this.flammen = new Audio();
        this.flammen.src = "src/assets/sounds/flammen2.mp3";

        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";

        this.toggleMusic = false;

        // IMAGES:
        // 44×40
        this.grenade_stand = new Image();
        this.grenade_stand.src = "src/assets/images/CLEARS/nade/nade_stand.png";

        this.grenade_crouch = new Image();
        this.grenade_crouch.src = "src/assets/images/CLEARS/nade/sheep-nade-crouch.png";

        this.dead_warren = new Image();
        this.dead_warren.src = "src/assets/images/CLEARS/dead-warren/dead-warren-clear.png";

        // FIX THIS CRAP:
        this.pistol_stand = new Image();
        this.pistol_stand.src = "src/assets/images/CLEARS/pistol/sheep-pistol-clear-elevate.png";
        
        // 43x36, diagnal
        // FIRE: 43×40
        this.pistol_stand_up = new Image();
        this.pistol_stand_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-clear.png";

        // 44x36
        // FIRE: 44x36
        this.pistol_stand_top = new Image();
        this.pistol_stand_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-top-clear.png";

        // 50x28
        // FIRE: 50×28
        this.pistol_crouch = new Image();
        this.pistol_crouch.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-clear-new.png";

        // 49x30
        // FIRE: 49x34
        this.pistol_crouch_up = new Image();
        this.pistol_crouch_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-crouch-clear.png";

        // 50x30
        // FIRE: 50×33
        this.pistol_crouch_top = new Image();
        this.pistol_crouch_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-top-clear.png";

        //rifle:
        // 44x40
        this.rifle_stand = new Image();
        this.rifle_stand.src = "src/assets/images/CLEARS/rifle/sheep-rifle-clear-elevate.png";

        // 43x38
        this.rifle_stand_up = new Image();
        this.rifle_stand_up.src = "src/assets/images/CLEARS/rifle/sheep-rifle-up-clear.png";

        // 44x37
        this.rifle_stand_top = new Image();
        this.rifle_stand_top.src = "src/assets/images/CLEARS/rifle/sheep-rifle-top-clear.png";

        // 50x34
        this.rifle_crouch = new Image();
        this.rifle_crouch.src = "src/assets/images/CLEARS/rifle/sheep-rifle-crouch-clear.png";

        // 49x32
        this.rifle_crouch_up = new Image();
        this.rifle_crouch_up.src = "src/assets/images/CLEARS/rifle/sheep-rifle-up-crouch-clear.png";

        // 50x31
        this.rifle_crouch_top = new Image();
        this.rifle_crouch_top.src = "src/assets/images/CLEARS/rifle/sheep-rifle-top-crouch-clear.png";

        //flammen
        // 44x39
        this.flammen_stand = new Image();
        this.flammen_stand.src = "src/assets/images/CLEARS/flammen/flammen-stand.png";

        // 43x40
        this.flammen_stand_up = new Image();
        this.flammen_stand_up.src = "src/assets/images/CLEARS/flammen/flammen-stand-up.png";

        // 50x33
        this.flammen_crouch = new Image();
        this.flammen_crouch.src = "src/assets/images/CLEARS/flammen/flammen-crouch.png";

        // 49x34
        this.flammen_crouch_up = new Image();
        this.flammen_crouch_up.src = "src/assets/images/CLEARS/flammen/flammen-crouch-up.png";

        // 44x39
        this.flammen_top = new Image();
        this.flammen_top.src = "src/assets/images/CLEARS/flammen/flammen-top.png";

        // 50x33
        this.flammen_crouch_top = new Image();
        this.flammen_crouch_top.src = "src/assets/images/CLEARS/flammen/flammen-crouch-top.png";

        // PISTOL FIRE IMAGES:  
        this.pistol_fire = new Image();
        this.pistol_fire.src = "src/assets/images/fires/pistol/sheep-pistol-clear-elevate-fire.png";

        this.pistol_up_fire = new Image();
        this.pistol_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup3.png";

        this.pistol_top_fire = new Image();
        this.pistol_top_fire.src = "src/assets/images/fires/pistol/sheep-pistol-top3.png";

        this.pistol_crouch_fire = new Image();
        this.pistol_crouch_fire.src = "src/assets/images/fires/pistol/sheep-pistol-crouch-new.png";

        this.pistol_crouch_up_fire = new Image();
        this.pistol_crouch_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup-crouch3.png";

        this.pistol_crouch_top_fire = new Image();
        this.pistol_crouch_top_fire.src = "src/assets/images/fires/pistol/pistol-crouch-top3.png";

        // RIFLE FIRE IMAGES:
        this.rifle_fire = new Image();
        this.rifle_fire.src = "src/assets/images/fires/rifle/rifle-stand3-elevate.png";

        this.rifle_up_fire = new Image();
        this.rifle_up_fire.src = "src/assets/images/fires/rifle/rifle-stand-up.png";

        // done
        this.rifle_top_fire = new Image();
        this.rifle_top_fire.src = "src/assets/images/fires/rifle/rifle-stand-top.png";

        // done
        this.rifle_crouch_fire = new Image();
        this.rifle_crouch_fire.src = "src/assets/images/fires/rifle/rifle-crouch-new.png";

        // done
        this.rifle_crouch_up_fire = new Image();
        this.rifle_crouch_up_fire.src = "src/assets/images/fires/rifle/rifle-crouch-lookup3.png";

        // done
        this.rifle_crouch_top_fire = new Image();
        this.rifle_crouch_top_fire.src = "src/assets/images/fires/rifle/rifle-crouch-top2.png";
        
        this.images = {
            "straight": {
                "pistol": {
                    "idle": this.pistol_stand, 
                    "fire": this.pistol_fire, 
                    "width": 44,
                    "height": 34
                },
                "ar": {
                    "idle": this.rifle_stand, 
                    "fire": this.rifle_fire,
                    "width": 44,
                    "height": 40
                },
                "flammen": {
                    "idle": this.flammen_stand, 
                    "fire": this.flammen_stand, 
                    "width": 44,
                    "height": 39
                },
            }, 
            "diagnal": {
                "pistol": {
                    "idle": this.pistol_stand_up, 
                    "fire": this.pistol_up_fire, 
                    "width": 43,
                    "height": 36,
                }, 
                "ar": {
                    "idle": this.rifle_stand_up, 
                    "fire": this.rifle_up_fire,
                    "width": 43,
                    "height": 38
                },
                "flammen": {
                    "idle": this.flammen_stand_up, 
                    "fire": this.flammen_stand_up, 
                    "width": 43,
                    "height": 40
                },
            }, 
            "up": {
                "pistol": {
                    "idle": this.pistol_stand_top, 
                   "fire": this.pistol_top_fire, 
                   "width": 44,
                   "height": 36,
                }, 
                "ar": {
                    "idle": this.rifle_stand_top, 
                    "fire": this.rifle_top_fire,
                    "width": 44,
                    "height": 37
                },
                "flammen": {
                    "idle": this.flammen_top, 
                    "fire": this.flammen_top, 
                    "width": 44,
                    "height": 39
                },
            },
            "down": {
                "pistol": {
                    "idle": this.pistol_crouch, 
                    "fire": this.pistol_crouch_fire, 
                    "width": 50,
                    "height": 28,
                },
                "ar": {
                    "idle": this.rifle_crouch,          // 50x29
                    "fire": this.rifle_crouch_fire,
                    "width": 50,
                    "height": 29
                },
                "flammen": {
                    "idle": this.flammen_crouch, 
                    "fire": this.flammen_crouch, 
                    "width": 50,
                    "height": 33
                },
            },  
            "diagnal-duck": {
                "pistol": { 
                    "idle": this.pistol_crouch_up, 
                    "fire": this.pistol_crouch_up_fire, 
                    "width": 49,
                    "height": 30  
                }, "ar": {
                    "idle": this.rifle_crouch_up, 
                    "fire": this.rifle_crouch_up_fire,
                    "width": 49,
                    "height": 32
                },
                "flammen": {
                    "idle": this.flammen_crouch_up, 
                    "fire": this.flammen_crouch_up, 
                    "width": 44,
                    "height": 34
                },
            },
            // 50x31
            "down-up": {
                "pistol": {
                    "idle": this.pistol_crouch_top, 
                    "fire": this.pistol_crouch_top_fire, 
                    "width": 50,
                    "height": 30 
                }, "ar": {
                    "idle": this.rifle_crouch_top, 
                    "fire": this.rifle_crouch_top_fire,
                    "width": 44,
                    "height": 31
                },
                "flammen": {
                    "idle": this.flammen_crouch_top, 
                    "fire": this.flammen_crouch_top, 
                    "width": 50,
                    "height": 33
                },
            },
            "down-back": {
                "pistol": {
                    "idle": this.pistol_crouch, 
                    "fire": this.pistol_crouch_fire, 
                    "width": 50,
                    "height": 28,
                },
                "ar": {
                    "idle": this.rifle_crouch, 
                    "fire": this.rifle_crouch_fire,
                    // "width": 50,
                    // "height": 31
                    "width": 50,
                    "height": 29
                },
                "flammen": {
                    "idle": this.flammen_crouch, 
                    "fire": this.flammen_crouch, 
                    "width": 44,
                    "height": 33
                },
            },
            "back": {
                "pistol": {
                    "idle": this.pistol_stand, 
                     "fire": this.pistol_fire, 
                     "width": 44,
                     "height": 34 
                }, 
                "ar": {
                    "idle": this.rifle_stand, 
                    "fire": this.rifle_fire,
                    "width": 44,
                    "height": 40
                },
                "flammen": {
                    "idle": this.flammen_stand, 
                    "fire": this.flammen_stand, 
                    "width": 44,
                    "height": 39
                },
            },
            "diagnal-back": {
                "pistol": {
                    "idle": this.pistol_stand_up, 
                    "fire": this.pistol_up_fire, 
                    "width": 43,
                    "height": 36,
                },
                "ar": {
                    "idle": this.rifle_stand_up, 
                    "fire": this.rifle_up_fire,
                    "width": 43,
                    "height": 38
                },
                "flammen": {
                    "idle": this.flammen_stand_up, 
                    "fire": this.flammen_stand_up, 
                    "width": 44,
                    "height": 40
                },
            }
        };

        this.frameX = 0;
        this.frameY = 0;

        this.spriteWidth = 50;
        this.spriteHeight = 28;
        this.minFrame = 0;
        this.maxFrame = 2;

        this.animation = true;
        this.animationTime = 0.5

        this.distFromFloor;
    }
    
    draw(context) {
        // SHOOTER HEIGHT CHANGED HERE:

        // WEAPON is undefined. 
        this.width = this.images[this.angle][this.weapon]["width"];
        this.height = this.images[this.angle][this.weapon]["height"];
        this.image = this.images[this.angle][this.weapon]["idle"];

        // REVELATION: no need to call "this.images" over and over again. I can just do it once.
        context.font = "20px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // TEXT:
        // context.fillText(`${this.weapon}`, this.x + (this.width / 2), this.y - 100);
    }

    update(context) { 
        this.y = canvas.height - (canvas.height * (1/4)) - this.height;

        switch (this.angle) {
            // 44x34
            // FIRE: 44×34
            case "straight":
            case "back":
                if (this.weapon == "flammen") this.bulletY = 12;
                else if (this.weapon == "ar") {
                    this.bulletX = this.width - 15;
                    this.bulletY = 7;
                }
                else this.bulletY = 1;
                break; 

            // 43x36
            case "diagnal":
            case "diagnal-back":
                if (this.weapon == "flammen") this.bulletY = 5;
                else if (this.weapon == "ar") {
                    this.bulletY = 10;
                    this.bulletX = 19;
                }
                else this.bulletY = 5;
                break;

            // 44×36
            // FIRE: 44x39
            case "up":
                // this.y = canvas.height - (canvas.height * (1/4)) - this.height;
                this.bulletX = 19;
                break;

            // 50x30
            // FIRE: 50×33
            case "down-up":
                this.bulletX = 23;
                // this.y = canvas.height - (canvas.height * (1/4)) - this.height;
                break;
s
            // 50x28
            // FIRE: 50×28
            case "down":
            case "down-back":
                // 50x28
                this.bulletY = 11;
                this.bulletX = 23;
                break;

            // 49x30
            // FIRE: 49×34
            case "diagnal-duck":
                // 49x30
                break;
        }
        
        // FEEL LIKE I CAN SOLVE SECOND SHOOTER IMAGE CRAP HERE:
        if (this.dead) {
            this.y = 191;
            this.angle = "straight";
            context.drawImage(this.dead_warren, this.x, this.y + 2);
        } else {
            if (["straight", "down", "diagnal-duck", "down-up", "diagnal", "up"].includes(this.angle)) {
                if (this.shooting && this.animation) {
                    context.drawImage(this.images[this.angle][this.weapon]["fire"], this.x, this.y);
                } 
                else if (this.throwBoom) {
                    if (!this.duck) {
                        this.y = canvas.height - (canvas.height * (1/4)) - 40;
                        context.drawImage(this.grenade_stand, this.x, this.y);
                    } else {
                        this.y = canvas.height - (canvas.height * (1/4)) - 34;
                        context.drawImage(this.grenade_crouch, this.x, this.y);
                    }
                }
                else context.drawImage(this.image, this.x, this.y);
            } else {
                context.save();
                context.translate(this.x + this.width, this.y);
                context.scale(-1,1);
                context.drawImage(this.image, 0, 0);
    
                // this.animation is necessary for pistol, not ar:
                if (this.shooting) {
                    context.drawImage(this.images[this.angle][this.weapon]["fire"], 0, 0);
                }
                else context.drawImage(this.image, 0, 0);
                
                context.restore();
            }
        }

        // if (this.shooting) {

        // }

        // UNCOMMENT AND REPLACE: 
        if (this.shooting && this.weapon == "pistol") {
            setTimeout(() => {
                this.animation = false;
            }, 50);
        } 
        else this.animation = true;

        if (this.isSecond == true && this.initSecond == true) {
            // this.weapon = weapon;
            // this.image = image;
            if (this.x <= 200) this.x += 5;
            else this.secondReady = true;
        }  

        // else this.secondReady = true;

        // code doesn't work. fireRate not set.    
        if (this.shooting && !this.disabled) {
            this.timer++;

            // 201 standing 
            // 232 down
            
            if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.bulletX, this.y + this.bulletY, this.angle, this.weapon, this.delete, false));
                if (this.secondStream == true) {
                    this.projectiles.push(new Projectile(this.secondX, this.y + this.bulletY, this.angle, this.weapon, this.delete, true));
                }   
                
                if (this.specialAmmo > 0) {
                    this.specialAmmo--;
                }
                else {
                    this.weapon = "pistol";
                    this.fireRate = 0;
                    this.specialAmmo = 0;
                }
            }
        }
        else {
            this.timer = 0;
        }
    }
}

let flammen = new Audio();
flammen.src = "src/assets/sounds/flammen2.mp3";

class InputHandler {
  constructor(entity) {
    // constructor(entity) {
    // why doesn't this work as "this.keys"?
    this.canvas = canvas;

    let keys = {"space": false, "d": false, "w": false, "s": false, "a": false};
    
    document.addEventListener("keydown", (event) => {
      // TODO: try using if statements instead.
      if (!entity.disabled) {
      // what this do? sets respective keys value to true. "key" is a built-in property of "event" lol
      keys[event.key] = true;
      
      switch (event.key) {
        // this is just for SHOOTING, not look direction
        case ' ':
            entity.shooting = true;
            break;

        case 'd':
          // entity.angle = "down";
          if (entity.duck) entity.angle = "down";
          else entity.angle = "straight";
          break;

        case 'w':
          if (entity.duck) entity.angle = "down-up";
          else entity.angle = "up"; 
          // entity.angle = "up";         
          break;

        case 's':
          // what's duckable?
          if (entity.duckable) {
            entity.angle = "down";
            entity.duck = true;
          }
          break;
        
        case 'a':
          entity.angle = "back";
          break;

        case 'q':
          entity.weapon = "pistol";
          entity.fireRate = 0;
          entity.specialAmmo = 0;
          break;

        case 'e':
          entity.throwBoom = true;
          // entity.throwBoom = true;
          break;
      }

      // diagnal stand
      if (keys["d"] && keys["w"]) {
        if (entity.duck) entity.angle = "diagnal-duck";
        else entity.angle = "diagnal";
      }

      else if (keys["a"] && keys["s"]) entity.angle = "down-back";   
      else if (keys["a"] && keys["w"]) entity.angle = "diagnal-back";
      else if (keys["w"] && keys["s"]) entity.angle = "down-up";
    }
    });

    document.addEventListener("keyup", (event) => {

      if (!entity.dead) {
      keys[event.key] = false;

      switch (event.key) {
        // SPACE BAR:
        case ' ':
          entity.shooting = false;
          if (entity.weapon == "flammen") {
            flammen.pause();
          }
          // flammen.pause();
          break;

        case 's':
          entity.duck = false;
          if (entity.angle == "down-back") entity.angle = "back";
          else if (entity.angle == "down-up") entity.angle = "up";
          else entity.angle = "straight";
          break;

          // NEEDS WORK HERE:
        case 'a':
          if (entity.angle == "diagnal-back") entity.angle = "up";
          else if (entity.angle == "down-back" || entity.angle == "down") entity.angle = "down";
          break

        case 'd':    
          if (entity.angle == "diagnal") entity.angle = "up";
          else if (entity.angle == "diagnal-duck") entity.angle = "down-up";
          else if (!entity.duck) entity.angle = "straight";
          break;

        case 'e':
          entity.throwBoom = false;
          break;

        case 'w':
          if (entity.angle == "diagnal-back") entity.angle = "back";
          else if (entity.angle == "down-up") entity.angle = "down";
          else if (entity.angle == "diagnal" || entity.angle == "up" || entity.angle == "diagnal-duck") {
            if (entity.duck) entity.angle = "down";
            else entity.angle = "straight";
          }
          break;

        // TOGGLE MUSIC ON OR OFF (should only be possible during/after):
        case 'm':
          // AYO: NEW DISCOVERY: here is how to perfectly toggle between true/false:
          entity.toggleMusic = !(entity.toggleMusic);
          break;
      }
    }
    });

    // MOUSE INPUT: 
    document.addEventListener("mousedown", function () {
      entity.mouse.clicked = true;
    });
    document.addEventListener("mouseup", function () {
      entity.mouse.clicked = false;
    });
    
    // here is what actually reads the mouse's location:
    let canvasPosition = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", function (e) {
      entity.mouse.x = e.x - canvasPosition.left;
      entity.mouse.y = e.y - canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", function () {
      entity.mouse.x = undefined;
      entity.mouse.y = undefined;
    });
  }
}

// OVERHAUL SPEED FUNCTIONALITY:
class Enemy {
    // what's the speed parameter for again? to increase speed globally as rounds progress :)
    // TO PASS IN NEW FRAMA ARGUMENT GLOBALLY: -CANT DO THAT, IT DOESN'T UPDATE.
    constructor(x, speed, round, frameSpeed) {
      // NEW SHIT:
      // cxt
      this.frama = 0;
      this.speed = speed;

      this.x = x;
      this.y;

      this.bulletX;
      this.bulletY;

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
      this.beamHeight = 150;
      this.openFire = 100;
      this.beamActive = false;

      // ODDS CRAP:
      // base enemies:
      // 6/10 chance to spawn ground, 4/10 ch. to spawn air, 2/10 to spawn spec (dog, bomber, sheep)

      this.typeNum = Math.floor(Math.random() * 20);
      this.groundOdds = 20; // 8
      this.airOdds = 12;    // 6
      this.crawlOdds = 6;   // 4
      this.bossOdds = 2;    // 3  
      this.dogOdds = 3;     // ONLY APPLIES for civies
      // ^ if on rounds 7-9, spawn only bomber. If on boss round, spawn bomber and sheep

      // sheep pushed on round 10:
      this.bossType = ["bomber", "sheep"][Math.floor(Math.random() * 2)];
      this.otherOdds = 5;
      this.type = "ground";

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
        round 10: boss fight. Sheep introduced. More civies. */

      this.static = new Image;
      this.framework = new Image;

      // first 3 images in sprite are 42x35, second 3 are 42x36
      this.width = 42;
      this.height = 35;
      this.pickupY= 50;

      this.frameX = 0;
      this.frameY = 0;
      this.spriteWidth = 42;
      this.spriteHeight = 35;
      this.minFrame = 0;
      this.maxFrame = 5;
      this.pigFrame = frameSpeed;   // to increase as rounds progress.
      this.statica = false          // determine if enemy is static throughout (plane, bomber)
      this.animation = false;

      this.civy_frameworks = ["src/assets/images/civy/new-frames/spritesheet.png", 
                              "src/assets/images/civy/new-frames/spritesheet2.png"];

      this.civy_frames = this.civy_frameworks[Math.floor(Math.random() * 2)];
      this.dog_frames = "src/assets/images/dog/dog-frames/spritesheet.png";
      this.civy_type;
      
      // this.civy_type = "crawl";
    }

    update() {
      // FRAME SHIT
      if (this.frama <= 100) this.frama++;
      else this.frama = 0;

      if (this.frama % this.pigFrame === 0 && this.pigFrame > 0) {
        if (this.frameX < this.maxFrame)
          this.frameX++;
        else this.frameX = this.minFrame;
      }

      if (this.isCivie == true) {
        if (this.typeNum <= this.dogOdds) this.type = "crawl"
        else this.type = "ground";
      }
      else {
        // HEIRARCHY CRAP:
        // 0-2
        if (this.typeNum <= this.bossOdds) {
          if (this.round < 6 && this.round > 0) this.type = "ground";
          else if (this.round >= 6 && this.round < 10) this.type = "bomber";
          else this.type = this.bossType;   // <- if round 10
          // else if (this.round == 10 || )
        }
        // 3-6
        else if (this.typeNum <= this.crawlOdds && (this.round >= 3)) {
          this.type = "crawl";
        }
        // 6-12
        else if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
          this.type = "air";
        }
      }
      
      // NEW:
      switch(this.type) {
        case "crawl":
          this.sound = "growl";
          this.health = 1;

          if (this.isCivie == true) {
            this.width = 52;
            this.height = 30;
            this.maxFrame = 4;
            this.spriteWidth = 52;
            this.spriteHeight = 30;

            // this.framework.src = this.dog_frames;
            this.framework.src = "src/assets/images/dog/dog-frames/spritesheet.png";
          }
          else {
            this.width = 60;
            this.height = 30;
            this.spriteWidth = 60;
            this.spriteHeight = 30;
            this.maxFrame = 3;
            this.framework.src = "src/assets/images/maggot/spritesheet/maggotsheet.png";
          }
          break;

        case "ground":
          // this.x + this.width - 20, this.y + 5
          this.bulletX = this.width - 20;
          this.bulletY = 5; 
          this.sound = "shotty";

          if (this.isCivie == true) {
            this.width = 63;
            this.height = 41;
            this.maxFrame = 4;
            this.spriteWidth = 63;
            this.spriteHeight = 41;
            // this.framework.src = "src/assets/images/civy/new-frames/spritesheet2.png";
            // this.framework.src = this.civy_frameworks[Math.floor(Math.random() * 2)];
            this.framework.src = this.civy_frames;
          }
          else this.framework.src = "src/assets/images/assault-pig/pig-walk-clear/pigFrames.png";

          if (!this.animation) this.static.src = "src/assets/images/assault-pig/pig-stand-clear.png";
          else this.static.src = "src/assets/images/assault-pig/pig-stand-fire.png";

          break;

        case "air":
          this.bulletX = 26;
          this.bulletY = this.height - 23; 
          this.statica = true;
          this.sound = "shotty";
          this.static.src = "src/assets/images/pig-plane-clear.png";
          // framework.src not given shit here.

          this.fireRate = 100;
          this.health = 1;
          this.width = 70;
          this.height = 70;

          // THIS IS IN REVERSE LOOOL BUT THAT'S THE WAY IT WORKS (HTMS)
          if (this.isCivie) {
            this.speed = -4;
          }
          else this.speed = 4;
          break;
        
        // OPENFIRE BY DEFAULT IS 
        case "bomber":
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 90;
          this.height = 90;
          this.statica = true;
          if (!this.inPosition) this.static.src = "src/assets/images/bomber/bomber-clear.png";
          else this.static.src = "src/assets/images/bomber/bomber-fire.png";
          break;

        case "sheep":
          this.sound = "laser-gun";
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 70;
          this.height = 58;
          this.spriteWidth = 70;
          this.spriteHeight = 58;
          this.frameSpeed = 5; 
          this.maxFrame = 5;
          this.framework.src = "src/assets/images/enemy-sheep/girl-frames/clears/spritesheet.png";
          this.static.src = "src/assets/images/enemy-sheep/girl-sheep-clear.png";
          break;  
      }

      // THIS WORKS
      // THIS CRAP IS SOLEY FOR AUDIO LOOOL:
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
        this.timer++;

        // NEW
        if (this.timer >= this.openFire && this.timer % this.fireRate === 0) { 
          this.projectiles.push(new Projectile(this.x + this.bulletX, this.y + this.bulletY, this.angle, this.sound, this.dead, "shotty"));
          if (this.type == "bomber") {
            this.beamActive = true;
          }
        } 

      }

      if (this.pickupNum <= this.pickupOdds && this.round >= 3) {
        this.pickup = true   
      }
    }

    draw(context) {
      // context.imageSmoothingEnabled = false;

      // NEW SHIT:  
      // this.statica is air and bomber (don't have animation)
      if (this.statica == false) {

        if (!this.inPosition || (this.type == "crawl" && this.inPosition)) {
          context.drawImage(
            this.framework,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
          );
        }
        else if (this.inPosition && (this.type != "crawl" || this.type != "air")) {
          context.imageSmoothingEnabled = false;
          // what does this apply to? ground, sheep, bomber. Draw their statics when in position:
          context.drawImage(this.static, this.x, this.y);   
        }
      } else context.drawImage(this.static, this.x, this.y);

      context.beginPath();
      context.fillStyle = this.color;

      // DO NOT FUCKING REMOVE. FOR DUCKING ENEMY PURPOSES:
      // if (this.duck) {
      //   context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
      // } else {
      //   context.fillRect(this.x, this.y, this.width, this.height);
      // }

      context.font = "20px serif";
      context.fillStyle = "gray";

      context.textAlign = "center";
      context.textBaseline = "middle";

      // context.fillText(`${this.type}`, this.x + (this.width / 2), this.y - 10);
    } // projectiles

    // GOOD
    renderBeam(context) {
      if (this.timer >= this.openFire) {
        context.beginPath();
        // context.fillStyle = "red";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x + 28, this.y + 45, 15, this.beamHeight);
      }
    }
}

class Button {
    constructor(x, y, width, text, clickable) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 30;
        this.text = text;
        this.stroke = "black";
        this.clicked = false; 
        this.clickable = clickable;
        this.show = true;
        this.alpha = 1;
    }

    draw(context) {
        if (this.show) {
            if (this.clickable) {
                context.beginPath();
                context.rect(this.x, this.y, this.width, this.height); 
                context.fillStyle = 'gray'; 
                context.fill();
                
                // button outline:
                context.lineWidth = 2;
                context.strokeStyle = this.stroke;
                context.stroke();
        
                // button text:
                context.font = "12.5px serif";
                context.fillStyle = "black";
        
                // HOW TO CENTER TEXT IN BUTTON:
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));
            }
            else {
                context.beginPath();
                context.font = "25px Tourney";
                context.strokeStyle = 'white';
                context.lineWidth = 5;
                context.strokeText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));

                context.fillStyle = "black";
                context.lineWidth = 1;
                context.fillText(this.text, Math.floor(this.x + (this.width / 2)), Math.floor(this.y + (this.height / 2)));
            }
        }
    }
}

class Pickup {
    constructor(x, y, round) {

        // this.width = this.height = 25;
        this.width = this.height = 20;

        this.x = x;
        this.y = y;
        this.delete = false;

        // this.sound;
        this.sound;
        this.round = round;

        this.sfx = {
            // PICKUP SFX:
            arReload: new Howl({
                src: [
                    "src/assets/sounds/rifleReload.mp3",    // good
                ],
<<<<<<< HEAD
                volume: 5,
=======
                volume: 2,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
            }),
            nadePin: new Howl({
                src: [
                    "src/assets/sounds/grenadePin.mp3",     // good
                ],
<<<<<<< HEAD
                volume: 5,
=======
                volume: 1,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
            }),
            flammenReload: new Howl({
                src: [
                    "src/assets/sounds/futureReload.mp3",   // good
                ],
<<<<<<< HEAD
                volume: 5,
=======
                volume: 1,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
            }),
            health: new Howl({
                src: [
                    "src/assets/sounds/3 heal spells/healspell1.mp3",
                ],
                loop: false,
            }),
            wall: new Howl({
                src: [
                    "src/assets/sounds/3 heal spells/healspell2.mp3",
                ], 
                loop: false,
<<<<<<< HEAD
=======
                volume: 1,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
            }),
        }

        // ONLY A 0/10 CHANCE TO SPAWN PICKUP IN GENERAL (see enemy.js):
        // equal chance to spawn aid and weapons?
        this.typeNum = Math.floor(Math.random() * 10);

        // how many pickup types? IIIII ->  5

        this.nadeOdds = 10;  // 5
        this.aidOdds = 5;    // 4
        // this.weaponOdds = 1; // 2
        this.weaponOdds = 4;
        
        //  FIX THIS CRAP
        // this introduced at round
        this.weapon = ["flammen", "ar"][Math.floor(Math.random() * 2)];
        this.aid = ["health", "wall"][Math.floor(Math.random() * 2)];

        // type by default is ar
        this.type;

        this.image = new Image();
    }

    // if not current respective weapon round, should default to aid pickup
    update() {
       //this.y += 5;
       this.y += 10;

        // NEEDS LOADS OF WORK DONE:
        // weaponOdds encompasses flammen, ar, and grenade
        // REMEMBER: typeNum is num 0-10
        if (this.typeNum <= this.weaponOdds) {
            if (this.round <= 6) this.type = "ar";
            // if (this.round <= 1) this.type = "ar";
            else this.type = this.weapon;
        }
        else if (this.typeNum <= this.aidOdds) this.type = this.aid;
        else if (this.typeNum <= this.nadeOdds) this.type = "grenade";

        //  SOUND TO PLAY WHEN PICKED UP:
        switch (this.type) {
            case "flammen":
                // this.sound = this.flammenReload;
                this.sound = this.sfx.flammenReload;
                this.image.src = "src/assets/images/pickups/clears/flammen copy.png";
                break;
            case "ar":
                this.sound = this.sfx.arReload;
                this.image.src = "src/assets/images/pickups/clears/rifle copy.png";
                break;
            case "grenade":
                this.sound = this.sfx.nadePin;
                this.image.src = "src/assets/images/pickups/clears/grenade copy.png";
                break;
            case "health":
                this.sound = this.sfx.health;
                this.image.src = "src/assets/images/pickups/clears/aidConcept copy.png";
                break;
            case "wall":
                this.sound = this.sfx.wall;
                this.image.src = "src/assets/images/pickups/clears/wall copy.png";
                break;
        }
    }

    draw(context) {
        if (!this.delete) {
            context.drawImage(this.image, this.x, this.y);
        };        
    }
}

class TextWall {
    constructor(text, y) {
        this.canvas = canvas;

        this.text = text;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
        this.y = Math.floor(y);
        this.vanish = false;
    }

    draw(context) {
        if (!this.vanish) {
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
            context.fillStyle = "white";
            context.font = "17px Times New Roman";
            for (let i = 0; i < this.lines.length; i++) {
                context.fillText(this.lines[i], this.canvas.width / 2, this.y + (i * this.lineheight));
            }
        }
    }
}

class Health {
    constructor(y, type) {
        this.x = 0;
        this.y = y;
        this.hurt = false;
        this.number = 3;
        this.type = type;
        this.image = new Image();
        this.image.src = "src/assets/images/pickups/clears/grenade copy.png";;
    }
    update() {
        if (this.hurt) {
            this.number--;
        }
    }
    draw(context) {
        for (let i = 0; i < this.number; i++) {
            switch (this.type) {
                case "health":
                    this.image.src = "src/assets/images/pickups/clears/aidConcept copy.png";
                    break;
                case "wall":
                    this.image.src = "src/assets/images/pickups/clears/wall copy.png";
                    break;
                case "nade":
                    this.image.src = "src/assets/images/pickups/clears/grenade copy.png";
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}

// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
class Grenade {
    constructor(x, entity) {
        this.canvas = canvas;
        this.x = x;

        this.ready = false;
        this.y = this.canvas.height / 2; 

        this.entity = entity;
        this.dudY = this.entity.y;
        this.dudX = this.entity.x;
        this.dudSize = 5;

        this.size = 10;

<<<<<<< HEAD
        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";
=======
        // THIS IS WHAT ACTUALLY FUCKING PLAYS
        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";
        this.sound.volume = 0.5;
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c

        this.bloopPlayed = false;
        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";
<<<<<<< HEAD
=======
        this.bloop.volume = 0.5;
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c

        this.image = new Image();
        this.image.src = "src/assets/images/sprites/exp2FirstFramesPixel.png";

        // EXPLOSION ANIMATION CRAP:
        this.frama = 0;
        this.boomFrameX = 0;
        this.boomMaxFrame = 3;
        this.boomSpriteHeight = 64;
        this.boomSpriteWidth = 64;
        this.boomHeight = this.boomSpriteHeight * 4;
        this.boomWidth = this.boomSpriteWidth * 4;
    }

    // draws the explosion
    draw(context) {
        context.drawImage(
            this.image,
            this.boomFrameX * this.boomSpriteWidth,
            0,
            this.boomSpriteWidth,
            this.boomSpriteHeight,
            this.x - (this.y / 2) - 20,
            this.y - (this.y / 2) - 20,
            this.boomWidth ,
            this.boomHeight
        );  
    }

    update() {
        if (this.frama <= 100) this.frama++;
        else this.frama = 0;

        if (this.frama % 15 === 0) {
            if (this.boomFrameX < this.boomMaxFrame) {
            this.boomFrameX++;
            this.boomAnimation += 1;
            } else this.boomFrameX = this.minFrame;
        }
        // only updates the frames you shithead 
    }

    // draws the nade itself
    drawDud(context) {
        context.beginPath();
        context.arc(this.entity.x + this.entity.width / 2, this.dudY, this.dudSize, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
    }
    updateDud() {
        if (this.dudY > 0) {
            this.dudY -= 10;
            this.dudX -= 10;
        }
    }
}



let roundCounts = [6, 10]; 

// single, triple, two shooters, ar hoarde (grounds and a few airs), grenade hoarde, civies (pows)

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;
// let currentRound = 1;
let currentRound = 0;

// enemyCount determines num of enemies to add to array. It decrements as they spawn
let enemyCount = roundCounts[0];
// let tutCount = tutCounts[0];

// used to show current enemies remaining:
let enemiesLeft = roundCounts[0];
let secondShooter = false;

// objects
const flora = new Floor();
// const shooter = new Shooter(100, flora.y - 34);
const shooter = new Shooter(100);


//  NEEDS TO START OFF SCREEN, then walk over to position 200:
// const shooter2 = new Shooter(200, flora.y - 50);
const shooter2 = new Shooter(0 - shooter.width, flora.y - 34);
shooter2.isSecond = true;
//shooter2.weapon = shooter.weapon;

// const shooter = new Shooter(100, flora.y - 50);
// BRILLIANT IDEA: inputHandler doesn't need to take in these args. Use the ones from shooter.
new InputHandler(shooter);
new InputHandler(shooter2);

// BUTTONS AND TEXT. (x, y, width, text, clickable)
// skip tut. button necessary -don't want to force players to kill POWS. 
// const skipTutButton = new Button(canvas.width / 2.2, canvas.height / 3, 100, "Skip", true);
const playButton = new Button(canvas2.width / 2.2, canvas2.height / 2.5, 100, "Play", true);
const startButton = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Initiate Bloodbath", true);
const skipButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "skip", true);
const yesButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);
const noButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);
const disableButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Disable Tips", true);
// this one for giveup, final win, and credits (bottom right):
const playAgainButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Play again?", true);
// this one for death (center)
const playAgainButton2 = new Button(canvas.width / 2.5, canvas.height / 2, 100, "Play again?", true);
const credButton = new Button(canvas.width / 2.5, canvas.height / 1.15, 100, "READ ME", true);

const winText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Next round incoming...", false);

const failText = new Button(canvas.width / 2.5, canvas.height / 4.5, 100, "FAILURE", false);
const healthText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "You perished in the heat of battle.", false);
const wallText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "Too many enemies have broken through.", false);

// UI
const enemyText = new Button(canvas.width / 2, 0, 100, enemiesLeft, false);
const roundText = new Button(canvas.width / 3, 0, 100, `${currentRound}/10`, false);

// taken out:
const scoreText = new Button(canvas.width / 2, 0, 100, score, false);
const ammoText = new Button(canvas.width - 100, 0, 100, shooter.specialAmmo, false);

const specialText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "SPECIAL ROUND", false);
const specialText2 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "MASSACRE THE CIVILIANS", false);

const endText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Coalition defeated. City aquired.", false);
const endText2 = new Button(canvas.width / 2.5, canvas.height / 1.7, 100, "Thanks for playing!!!", false);
const endText3 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Made with ❤️ by", false);
const endText4 = new Button(canvas.width / 2.5, canvas.height / 1.9, 100, "KAVEMANKORPS", false);

const naturalText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "You're a natural born killer!", false);

const goodText = new Button(canvas.width / 2.5, canvas.height / 4.5, 100, "Excellent work, Leuitenant.", false);
const soonText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "Help is arriving...", false);

const aidText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "HELP HAS ARRIVED", false);
const quietText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "KILL KILL KILL KILL", false);

// TUTORIAL CRAP:
// BRUTAL IDEA: live captured enemies used as target practice
// YES, player can take damage/die in tutorial
// 3 static grounds
const tt1 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Press Space to shoot", false);
const tt2 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Use WASD to aim in different directions", false);
const tt3 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "hold S to crouch", false);
const tt7 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "press E to throw a grenade.", false);
const tt7_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press E twice quickly for a barrage", false);
const tt8 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press Q to drop current weapon", false);

// rounds w/ tut text: 1-6
let tutRounds = {1: [tt1], 2: [tt2], 3: [tt3], 4: [tt7, tt7_2]};

const bossText = new TextWall(
`Satellite imagery has exposed your horriffic atrocities in the city to the rest of the world,\n
prompting international outcry and the formation of a Sheep-led coalition against YOU.\n
\n
This is it! Destroy the coalition and the city is yours. Will you give up now and turn yourself\n
in for war crimes, or will you defend the city to your last dying breath lest your efforts so far\n
be in vain?`, Math.floor(canvas.height / 5), canvas);

// DONT USE FLESH LOG (GAY)
const startText = new TextWall(
    `You are Lieutenant Warren Kilgore, the last remaining invader in Swinemanland. The very land of your\n
    eternal arch-nemesis. The armestice between the Sheep and the Swinemen had been signed days before,\n 
    but you reject returning to the corrupted civilian life at whatever cost. Even though all of your men\n 
    have deserted you, you refuse to give up the the strategic city of Vonn, the crown jewel of Swineman\n 
    "civilization".\n 
    It is now your undisputed domain, your very own kingdom, and everyone in it mere cattle. They are\n
    your servants, ready to satisfy your every depraved fantasy at any given moment. The city of Vonn took\n 
    months of gruesome house-to-house fighting and thousands of Sheep lives to completely conquer. Are you\n
    going to let it all slip now?`, Math.floor(canvas.height / 10), canvas);

const giveupText = new TextWall(
    `You spare your fellow countrysheep and turn yourself in.\n
    \n
    The war crimes tribunal accuses you of innumerable atrocities, the charges of\n
    which are beyond the scope of this game.\n 
    \n
    You are put to the firing squad, necrophiled by 20 men, and your semen-glutted\n 
    corpse thrown into the dirty Googa River.`, Math.floor(canvas.height / 10), canvas);

const credText = new TextWall(
    `**********Programming and Art**********
        KavemanKorps

     ********Music and Sound Effects*******
    Credits in description!

     *************PLEASE READ****************
    First of all, I want to thank you the Player for making it this far! it shows my game is at least ok enough
    for you to play through the whole thing (at least, that's what I hope :) ). I made this game during Summer 
    '23, my Sophomore year in college. A most shitty time in my life (I hate school LOL). You can say this 
    game is the byproduct of months of stored-up frustration, misery, and the sinking feeling of failure 
    at every turn. I understand that this game will get backlash due to encouraging the player to mass murder 
    civilians -but please understand, this to me is art! I hope to bring to you more games in the future, no 
    matter how negatively this one might be recieved. If you think otherwise, cliche as it sounds, I hope you 
    enjoyed playing this game as much as I had making it!
        -Kaveman
    `, Math.floor(canvas.height / 10), canvas);

// const loadingText = new TextWall(`\n\n\n\n\nLoading`, canvas.height / 5);
const loadingText = new TextWall(`Loading`, Math.floor(canvas.height / 3), canvas);

const playText = new TextWall(``, Math.floor(canvas.height / 5), canvas);

// HEALTH:
let playerHealth = new Health(30, "health");
let wallHealth = new Health(60, "wall");
let grenades = new Health(90, "nade");

// variables
let frame = 0;
// let randomFrames = [50, 80, 110, 150];
let randomFrames = [10, 30, 50, 80, 110,];

let enemySpeed = 15;
let enemyQueue = [];

let tutorial = true;

// ENEMY SHOOTING STUFF:
// possible glitch fix: add "id" property. "distance" is distance AWAY from shooter.
// NO MORE THAN 4 ENEMIES SHOULD BE SHOOTING.
let baddiePositions = {
    "1": {"inPos": false, "distance": 50, "type": "ground"}, 
    "2": {"inPos": false, "distance": 150, "type": "ground"}, 
    "3": {"inPos": false, "distance": 250, "type": "ground"},
    "4": {"inPos": false, "distance": 129, "type": "air"},
    "5": {"inPos": false, "distance": -5, "type": "crawl"},
    //  THESE POS ONLY AVAILABLE IN BOSS ROUND:
    // shooter.width = 44, -shooter.width = -44
    "6": {"inPos": false, "distance": -shooter.width, "type": "bomber"},
    // SHEEP:
    "7": {"inPos": false, "distance": 100, "type": "sheep"},
    "8": {"inPos": false, "distance": 200, "type": "sheep"},
};

// ENEMY SPEED:
let currentSpeed = 1.5;
// let currentSpeed = 5;

// DROPPED PICKUPS:
let snackQueue = [];
let nadeQueue = [];

// let state = "MENU";
let state = "LOADING";

let loadingTime = [4000, 5000][Math.floor(Math.random() * 2)];

// FUNCTIONS:
var sfx = {
    yelp: new Howl({
        src: [
            "src/assets/sounds/animals_dog_yelp_med_large.mp3",
        ],
        loop: false,
        volume: 2,
    }),
    growl: new Howl({
      /* accepts multiple versions of the same audio! (automatically selects the best one for the 
      current web browser */
      src: [
        "src/assets/sounds/paco.flac",
      ],
      loop: false,
      volume: 0.5,
    }),
    boom: new Howl({
        /* accepts multiple versions of the same audio! (automatically selects the best one for the 
        current web browser */
        src: [
          "src/assets/sounds/explosionLoud.mp3",
        ],
        loop: true,
        volume: 0.5,
    }),
    bloop: new Howl({
        /* accepts multiple versions of the same audio! (automatically selects the best one for the 
        current web browser */
        src: [
          "src/assets/sounds/q009/glauncher.ogg",
        ],
        volume: 0.5,
        //loop: false,
    }),
    // PICKUP SFX:
    arReload: new Howl({
        src: [
            "src/assets/sounds/explosionLoud.mp3",
        ]
    }),
    flammenReload: new Howl({
        src: [
            "src/assets/sounds/futureReload.mp3",
        ]
    }),
    rayBeam: new Howl({
        src: [
            "src/assets/sounds/pulse.wav",
        ],
        loop: false,
    }),
    squeal: new Howl({
        src: [
            "src/assets/sounds/pig-squeal.mp3",
        ], 
        loop: false,
    }),
    crowd: new Howl({
        src: [
            "src/assets/sounds/crowd2.mp3",
        ], 
        loop: false,
        volume: 1,
    }),
    // shit squish:
    asshole: new Howl({
        src: [
            "src/assets/sounds/squelch.mp3",
        ], 
        loop: false,
        volume: 3,
    }),
};

/* there is a stupid security measure in some browsers where no sound is allowed to play unless the 
user explicitly interacts with the page. To work around this, add a "play" button that has to be clicked */
var music = {
    dramatic: new Howl({
        src: [
        "src/assets/music/prey's stand.mp3"
        ], 
        loop: true,
        // prev. 5.5:
        volume: 1,
    }),
    hit_back: new Howl({
        src: [
        "src/assets/music/hit-back.mp3"
        ], 
        loop: false,
        volume: 1,
    }),
};

function playSound(sound) {
    if (!sound.playing()) {
        sound.play();
    } 
}

// stupid timer vars:
let showPlay = false
let specialRound = false;
let showNextRound = false;
let showNextText = false;
let showSpecialText = false;
let showMenu = false;
let startRound = false;
let finalRound = false;
let startEnd = false;
let showAidText = false;
let showNatText = false;

let endSpecRound = false;

function handleStatus() {
    if (state == "RUNNING" || state == "WIN" || state == "QUIET" || state == "RELIEF" || state == "TUTORIAL") {
        roundText.text = currentRound;
        //enemyText.text = enemyCount;
        enemyText.text = enemiesLeft;
        enemyText.draw(cxt2);
        roundText.draw(cxt2);
        // scoreText.draw(cxt2);
       
        // commented out b/c text is cpu heavy:
        // if (shooter.weapon != "pistol") {
        //     ammoText.draw(cxt2);
        //     ammoText.text = shooter.specialAmmo;
        // }

        playerHealth.draw(cxt2);
        wallHealth.draw(cxt2);
        grenades.draw(cxt2);
    }
}

function resetBaddies() {
    for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {
        baddiePositions[i.toString()]["inPos"] = false;
    }
}

function greatReset() {
    startEnd = false;
    shooter.angle = "straight";
    shooter.dead = false;
    endSpecRound = false;
    currentSpeed = 1.5;
    enemySpeed = 15;
    score = 0;
    scoreText.text = score;
    enemyCount = enemiesLeft = roundCounts[0];
    enemyQueue = [];

    playerHealth.number = 4;
    wallHealth.number = 4;
    grenades.number = 4;

    winningScore = 30;
    currentRound = 1;

    // second shooter gets this hard-coded crap:
    shooter.weapon = "pistol";
    shooter.fireRate = 0;
    shooter.specialAmmo = 0;
    
    shooter.secondStream = false;
    secondShooter = false;
    // shooter2.weapon = shooter.weapon;
    shooter2.image = shooter.image;
    shooter2.fireRate = 0;
    shooter2.specialAmmo = 0;
    shooter2.x = 0 - shooter.width;

    roundCounts = [6, 10];

    // ALL ENEMY COUNTS ADDED HERE!:
    for (let i = 0; i <= 7; i++) {
        roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.3));
    };
    roundCounts[roundCounts.length - 1] = 200;  // 200 ORCS IN LAST ROUND!

    resetBaddies();

    snackQueue = [];
    showMenu = false;
    // grenades.number = 10;
    showSpecialText = false;
    showAidText = false;
    specialRound = false;
    finalRound = false;

    // RESET MUSIC:
    music.hit_back.stop();
    // UNCOMMENT:
    // playSound(music.dramatic);
};

function endRound() {
    if (!showNextRound) {
        winText.draw(cxt);
        setTimeout(() => {
            showNextRound = true;
        }, 1000);
    }
    else {
        nextText.draw(cxt);
        setTimeout(() => {
            state = "RUNNING";
            // if (score >= winningScore) {
            if (enemiesLeft <= 0) { 
                cremate();
            }
        }, 1000);
    }
}

function musicToggler() {
    // 10
    if (!finalRound) {
        if (!shooter.toggleMusic) {
            playSound(music.dramatic);
        } else music.dramatic.pause();
    } 
    else {
        music.dramatic.stop();
        if (!shooter.toggleMusic) {
            playSound(music.hit_back);
        } else music.hit_back.pause();
    }
}

function handleState() {
    switch(state) {
        // INITIAL BLACK SCREEN:
        case "PLAY":
            playText.draw(cxt);
            playButton.draw(cxt);
            mouseCollision(shooter.mouse, playButton, () => state = "INTRO");
            break;

        case "LOADING":
            loadingText.draw(cxt);
            
            let girly = new Enemy(canvas.width, currentSpeed, currentRound, 15);
            girly.type = "sheep";
            if (enemyQueue.length < 1) enemyQueue.push(girly);
            handleEnemy();
            if (enemyQueue.length < 1) pushEnemy();


            setTimeout(() => {
                // showLoading = false;
                showPlay = true;
                if (score >= winningScore) {
                    cremate();
                }
            }, loadingTime);

            if (showPlay) state = "PLAY";
            break;

        // GLITCH SOMEWHERE IN INTRO:
        case "INTRO":
            musicToggler();
        
            startText.draw(cxt);

            skipButton.draw(cxt);
            mouseCollision(shooter.mouse, skipButton, () => state = "MENU");

            setTimeout(() => {
                // what's up with this again?
                showMenu = true;
                // if (score >= winningScore) {
                //     cremate();
                // }
            }, 30000);

            if (showMenu) state = "MENU";
            break;
            
        // glitch: MENU -> RUNNING -> MENU
        case "MENU": 
            currentRound = 0;
            shooter.init = true;
            shooter.disabled = false;
            // bossText.draw(cxt);
            startButton.draw(cxt);

            if (score >= winningScore) {
                cremate();
            }

            // FIX THIS CRAP:   ---DONE
            // REMEMBER TO UNCOMMENT THIS:
            greatReset();
            mouseCollision(shooter.mouse, startButton, () => state = "RUNNING");
            break;

        // this state is only for the boss text:
        case "BOSS":
            musicToggler();
            finalRound = true;
            bossText.draw(cxt);
            yesButton.draw(cxt);
            noButton.draw(cxt);
    
            if (score >= winningScore) {
                cremate();
            }

            mouseCollision(shooter.mouse, yesButton, () => state = "QUIET");
            mouseCollision(shooter.mouse, noButton, () => state = "GIVEUP");
            break;

        case "QUIET":
            musicToggler();
            quietText.draw(cxt);

            setTimeout(() => {
                startEnd = true
            }, 4000);

            resetBaddies();
            if (startEnd) state = "RUNNING";
            break;
    
        case "RUNNING":
            musicToggler();
            // state = "RUNNING";
            shooter.disabled = false;
            shooter2.disabled = false;

            if (finalRound == true) {

                if (enemiesLeft <= 150) currentSpeed = 6;
                if (enemiesLeft <= 100) currentSpeed = 7;
                if (enemiesLeft <= 50) currentSpeed = 8;
            }

            if (specialRound == true) {
                playSound(sfx.crowd);
            };

            if (Object.keys(tutRounds).includes(currentRound.toString()) && tutorial === true) {
                disableButton.draw(cxt);
                mouseCollision(shooter.mouse, disableButton, () => {
                    tutorial = false;
                    disableButton.show = false;
                });

                for (let i = 0; i < tutRounds[currentRound].length; i++) {
                    tutRounds[currentRound][i].draw(cxt);
                }
            }
    
            // one second delay before round 1:
            if (currentRound == 1) {
                setTimeout(() => {
                    startRound = true
                }, 1000);
            }

            // when does tutorial end? 
            if (currentRound > 4) tutorial = false;

            // reset after each round
            if (startRound) {
                showNextRound = false;
                handleEnemy();
                pushEnemy();
            }

            if (playerHealth.number <= 0 || wallHealth.number <= 0) {
                state = "LOSE";
            }

            break;
        
        case "WIN": 
            musicToggler();
            if (tutorial) disableButton.draw(cxt);
            mouseCollision(shooter.mouse, disableButton, () => {
                tutorial = false;
                disableButton.show = false;
            });

            resetBaddies();

            // special round cases:
            // the key is the round BEFORE event occurs:
            // THIS THE ONE vv
            // SPEC ROUND SHOULD BE 5. 
            // enemy speed on final round is 5.1.

            let specRounds = {4: "SPECIAL", 6: "NATURAL", 7: "RELIEF", 9: "BOSS", 10: "END"};
            // let specRounds = {1: "SPECIAL", 6: "NATURAL", 7: "RELIEF", 8: "BOSS", 10: "END"};

            if (Object.keys(specRounds).includes(currentRound.toString())) {
                state = specRounds[currentRound];
            }
            endRound();
            break;
        
        case "LOSE":
            musicToggler();
            shooter.disabled = true;
            shooter2.disabled = true;
            shooter.secondStream = false;
            failText.draw(cxt);
            if (playerHealth.number <= 0) {
                healthText.draw(cxt);
                shooter.dead = true;
            } else {
                wallText.draw(cxt);
            }
            handleEnemy();

            playAgainButton2.draw(cxt);
            mouseCollision(shooter.mouse, playAgainButton2, () => state = "MENU");  
            break;

        case "SPECIAL":
            // currentBackground = "url(src/assets/images/background/background-working3.png)";
            musicToggler();
            specialRound = true;
            if (!showSpecialText) {
                specialText.draw(cxt);
                setTimeout(() => {
                    showSpecialText = true;
                }, 1000);
            } else { 
                specialText2.draw(cxt);
                setTimeout(() => {
                    // state = "RUNNING";
                    if (score >= winningScore) {
                        // if (state != "RUNNING") 
                        cremate();
                    }
                    state = "RUNNING";
                }, 1000);
            }
            break;

        // where did I want to put this state again?
        case "NATURAL":
            musicToggler();
            specialRound = false;
            if (!showNatText) {
                naturalText.draw(cxt);
                setTimeout(() => {
                    showNatText = true;
                }, 2000);
            }
            else {
                goodText.draw(cxt);
                soonText.draw(cxt);
                setTimeout(() => {
                    // state = "RUNNING";
                    if (score >= winningScore) {
                        cremate();
                    }
                    state = "RUNNING";
                }, 3000);
            };
            break;

        // AIDTEXT IS CONFLICTING WITH ROUNDTEXT
        case "RELIEF":
            musicToggler();
            secondShooter = true;
            shooter2.duckable = false;
            shooter2.initSecond = true;
            if (!showAidText) {
                aidText.draw(cxt);
                setTimeout(() => {
                    shooter.secondStream = true;
                    showAidText = true;
                }, 2000);
            } else {
                nextText.draw(cxt);
                setTimeout(() => {
                    state = "RUNNING";
                    if (score >= winningScore) {
                        cremate();
                        shooter2.duckable = true;
                    }
                }, 1000);
            };
            break;

        case "END":
            musicToggler();
            shooter.disabled = true;
    
            if (!showNextText) {
                // YOU WIN 
                endText.draw(cxt);
                endText2.draw(cxt);
                setTimeout(() => {
                    showNextText = true;
                }, 4000);
            } else {
                endText3.draw(cxt);
                endText4.draw(cxt);
                playAgainButton.draw(cxt);
                credButton.draw(cxt);
                mouseCollision(shooter.mouse, playAgainButton, () => {
                    greatReset();
                    state = "INTRO";
                });
                mouseCollision(shooter.mouse, credButton, () => state = "CREDITS");
            }
            break;

        case "GIVEUP":
            musicToggler();
            shooter.disabled = true;
            shooter2.disabled = true;
            giveupText.draw(cxt);
            playAgainButton.draw(cxt);
            mouseCollision(shooter.mouse, playAgainButton, () => state = "MENU");
            break;

        case "CREDITS":
            musicToggler();
            shooter.disabled = true;
            shooter2.disabled = true;
            credText.draw(cxt);
            playAgainButton.draw(cxt);
            mouseCollision(shooter.mouse, playAgainButton, () => state = "MENU");
            break;
    }
}

// BULLETS
class Projectile {
    // "dead" used as determinant for playing sounds
    constructor(x, y, direction, weapon, dead, isSecond) {
      this.isSecond = isSecond;

      // NEW HOWLER CRAP (sound fx "bucket"):
      this.sfx = {
        pistol: new Howl({
          /* accepts multiple versions of the same audio! (automatically selects the best one for the 
          current web browser */
          src: [
            "src/assets/sounds/shots/pistol.wav",
          ],
          loop: false,
<<<<<<< HEAD
          volume: 0.6
=======
          volume: 0.2,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
        }),
        ar: new Howl({
          src: [
            "src/assets/sounds/shots/cg1.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
<<<<<<< HEAD
          volume: 0.6
=======
          volume: 0.2
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
        }), 
        flammen: new Howl({
          src: [
            "src/assets/sounds/laser.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
<<<<<<< HEAD
=======
          volume: 0.2,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
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
<<<<<<< HEAD
          volume: 0.6,
          onend: function() {}
        }), 
        growl: new Howl({
          src: [
            "/src/assets/sounds/paco.flac",
          ],
          // the "loop" flag is false by default!
          loop: false,
=======
          volume: 0.3,
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
          onend: function() {}
        }), 
        bomber: new Howl({
          src: [
            "src/assets/sounds/ray-beam.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
        }), 
<<<<<<< HEAD
=======
        // meant for cancelled laser gun:
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
        laser: new Howl({
          src: [
            "src/assets/sounds/laser-buzz.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
        }), 
      }

      this.x = x;
      this.y = y;
      this.direction = direction;
      this.weapon = weapon;
      this.dead = dead;

      this.size = 2;

      this.speed = 10;
      this.delete = false;
      this.randomY = [1.7, 2, 2.2, 2.4, 2.6, 2.8, 3];
      // needs to shoot in the same directon (110 y) as randomY values:
      this.randomY_duck = [1.1, 1.2, 1.3, 1.4];

      this.bulletLimit;
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
          this.size = 3;
          if (!this.dead) {
            this.playSound(this.sfx.shotty);
          } else {
            this.sfx.shotty.stop();
          } 
          break;
        case "ar":
          this.size = 2;
          this.speed = 12;
          this.playSound(this.sfx.ar);
          break;

        case "flammen":
          if (!this.isSecond) this.playSound(this.sfx.flammen);
          this.speed = 11;
          break;

<<<<<<< HEAD
=======
        // was meant for sheep enemy, but not added after all lol
>>>>>>> 3de2e76520b34cd39c3dc2c9a0b97a131321046c
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

        case "back":
        case "down-back":
          this.x -= this.speed;
          break;
        
        case "diagnal-back":
          this.x -= this.speed + 1;
          this.y -= this.speed * 2  
          break;

        // THIS IS FOR AIR ENEMIES:
        case "down-diagnal":
          this.x -= this.speed / 1.3;
          this.y += this.speed / 3;
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
      } 
      else if (this.weapon == "ar") {
        context.save(); 
        context.fillStyle = "black";
        context.beginPath();
        context.ellipse(this.x, this.y, this.size + 1, this.size + 1, 0, Math.PI / 4, Math.PI * 2);
        // context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      } 
      else if (this.direction == "down-diagnal") {
        context.beginPath();
        context.ellipse(this.x, this.y, 5, 15, Math.PI / 3, 0, 2 * Math.PI);
        context.stroke();
      }
      else {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    } 
}

// increment stuff to make next round slightly harder:
function cremate() {
    // really hope this fixes civy glitch

    if (enemiesLeft <= 0 || enemiesLeft > 10) {
        enemySpeed--;
        currentRound++;
        currentSpeed += 0.4;
        roundCounts.splice(0, 1);
        enemyCount = enemiesLeft = roundCounts[0];
        winningScore += enemyCount * 10;
        frame = 0;
        resetBaddies();
    }
    
    // if (state != "BOSS" && state != "QUIET")
}

// NEED AN ALT TO NADEQUEUE
// TODO: GET THIS FUCKING SHIT RUNNING LIKE HOW IT DID EARLIER  --DONE
function handleShooter() {
    shooter.draw(cxt2);
    // shooter2.image = shooter.image;
    shooter2.weapon = shooter.weapon;
    if (secondShooter) shooter2.draw(cxt2);

    if ((state != "MENU" || state != "LOSE")) {
        // if (state != "LOSE" ) {
        shooter.update(cxt2);
        if (secondShooter) {
            shooter2.update(cxt2);
        }
    }

    // GRENADE FUNCTIONALITY:
    if (shooter.throwBoom && grenades.number > 0 && state != "MENU" && !shooter.disabled) {
        if (nadeQueue.length < 1) {
            shooter.secondNade = false;
        } else {
            shooter.secondNade = true;
        }

        // THIS IS NECESSARY:
        if (shooter.secondNade == false) {
            nadeQueue.push(new Grenade(canvas.width / 2, shooter, canvas));
            // shooter.bloop.play();
            playSound(sfx.bloop);
        } else {
            nadeQueue.push(new Grenade(canvas.width / 1.2, shooter, canvas));
            //shooter.bloop.play();
            playSound(sfx.bloop);
        }
    
        shooter.throwBoom = false;
        grenades.number--;
    }
}

// only one or two nades should be in the queue at any given time:
// when nade is thrown, there is 1 second fuse. Before that Sec. is up, the x for next nade will change

// GLITCH: if enemy  was present in time of throw, it gets deleted later on.
// maximum "size" is 101

// maybe I can make this accept an array arg (one array for tuts, other for enemyQueue)
function handleNade(arr) {
    for (let i = 0; i < nadeQueue.length; i++) {
        let current = nadeQueue[i];
        // current.bloop.play();

        if (current.dudY > 0) {
            current.drawDud(cxt);
            current.updateDud();
        }

        if (!current.bloopPlayed) {
            current.bloop.play();
            current.bloopPlayed = false;
        }

        setTimeout(() => {
            current.ready = true;
        }, 500);

        // current.ready = true;
        if (current.ready) {
            current.draw(cxt);
            current.update();

            // playSound(current.sound);

            // ORIGINAL. WORKS BUT IS LOUD: 
            current.sound.play();

            // playSound(sfx.boom);

            // THIS IS 299:
            // console.log(current.x - current.size);

            if (current.size <= 100) {
                current.size += 4;
            }
            else {
                nadeQueue.splice(i, 1);
                i--;
            } 
        }

        // FIGURED OUT WHY IT WAS WORKING YESTERDAY: BECAUSE IT WAS RUNNING SLOW LOOOL  
        // REMEMBER TO UNCOMMENT:
        for (let y = 0; y <= arr.length; y++) { 
            let currOrc = arr[y];
            if (arr.length > 0 && currOrc) {
                if (nadeCollision(current, currOrc) && current.ready == true) {    
                    currOrc.dead = true;
                } 
                // else currOrc.inNadeRange = false;
            }
        }
    }
};

function handleEnemyProjectiles(orc) {
    // this NEVER exceeds more than one object.
    let projes = orc.projectiles;

    for (let i = 0; i < projes.length; i++) {
        let current = projes[i];

        if (current.x > orc.x - 50) orc.animation = true;
        else orc.animation = false;
        
        // what's bulletLimit? either the player or 0.
        if (current.x > orc.bulletLimit) {
        // if (current.x > 150) {
            current.update();
            current.draw(cxt);
        }
        else {
            projes.splice(i, 1);
            i--;

            // UNCOMMENT THIS:
            if ((!shooter.duck) || (["air", "bomber", "crawl"].includes(orc.type))) playerHealth.number--;
        }
    }
}

// Idea: make shooter completely immune when ducking? nope
// PASS IN ENEMY/TUT QUEUE
function handleProjectile(arr) {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < shooter.projectiles.length; i++) {
        let current = projectiles[i];

        // HERE'S THE CULPRIT:
        // if (shooter.angle == "down" || shooter.angle == "down-back") current.y = 203;
        // else current.y = 195;

        // BUG HERE:
        // increase size of flammen "bullets"
        if (projectiles.length > 0 && current) {

            if (shooter.weapon == "flammen" && current.size <= 20) {
                current.size += 2;
            }
    
            // TO REVERT LATER ON:
            if (current.x < canvas.width - 100 && (state == "RUNNING" || state == "WIN" 
            || state == "QUIET" || state == "TUTORIAL" || state == "MENU")) {
                
                current.update();
                current.draw(bullet_cxt);
                // current.draw(cxt2);
                // current.draw(cxt);
            }
            else {
                projectiles.splice(i, 1);
                i--;
            }
        }

        // enemy kill handling:
        for (let j = 0; j < arr.length; j++) {
            let currentEnemy = arr[j];
            /* remove bullet and enemy if they contact eachother. Also make enemy 
            drop pickup if applicable: */ 

            if (currentEnemy.isCivie && currentEnemy.type == "crawl" 
            && (currentEnemy.x > current.x - 30 && currentEnemy.x < current.x + 30 && 
                current.y >= currentEnemy.y)) playSound(sfx.yelp);

            if (arr[j] && projectiles[i] && collision(projectiles[i], arr[j])) {

                projectiles.splice(i, 1);
                i--;

                // FIX BOMBER HEALTH CRAP:
                if (((shooter.angle == "down" || shooter.angle == "down-back" || currentEnemy.type == "bomber"
                || currentEnemy.type == "sheep") && shooter.weapon != "flammen")) {
                    currentEnemy.health -= 1;
                } else currentEnemy.health -= 2;    

                if (currentEnemy.health <= 0) {
                    score += 10;
                    scoreText.text = score;

                    if (currentEnemy.pickup && currentRound >= 3) {
                        snackQueue.push(new Pickup(currentEnemy.x, flora.y - 150, currentRound));
                    }

                    // what is position again? initially 0. Changes to respective number once in position (1-6)
                    // the keys of baddiePositions are those position numbers.
                    if (Object.keys(baddiePositions).includes(currentEnemy.position)) {
                        baddiePositions[currentEnemy.position]["inPos"] = false;
                    }
    
                    // here is how the enemies get deleted:
                    arr.splice(j, 1);
                    j--;
                    if (enemiesLeft > 0) enemiesLeft--;
                }
            }
        }

        // PICKUP HANDLING CRAP:
        for (let l = 0; l < snackQueue.length; l++) {
            let snack = snackQueue[l];
            if (currentRound >= 5) snack.flammenReady == true;
            if (snack && projectiles[i] && collision(projectiles[i], snack)) {
                snack.sound.play();
                projectiles.splice(i, 1);
                i--;

                if (snack.type == "health" && playerHealth.number < 6) {
                    playerHealth.number++;
                }
                else if (snack.type == "health" && playerHealth.number < 6) {
                    playerHealth.number++;
                }
                else if (snack.type == "grenade" && grenades.number < 6) {
                    grenades.number++;
                }

                // what's this? pick up weapon if current one is not flammen.
                if (shooter.weapon != "flammen") {
                    if (snack.type == "ar") {
                        shooter.weapon = "ar";
                        shooter.fireRate = 15;
                        shooter.specialAmmo = 50;
                    } 
                    else if (snack.type == "flammen") {
                        shooter.weapon = "flammen";
                        shooter.fireRate = 10;
                        shooter.specialAmmo = 45;
                    }
                } 
                else if (shooter.weapon == "flammen" && snack.type == "flammen") {
                    shooter.weapon = "flammen";
                    shooter.fireRate = 10;
                    shooter.specialAmmo = 45;
                }
                snackQueue.splice(l, 1);
                l--;
            }
        }
        // projectiles despawn logic. Takes into account all types:
        if (projectiles[i]) {
            // delete when leaving canvas (for small arms)
            if (
            (projectiles[i].x > canvas.width - 100 || projectiles[i].x < 0 || projectiles[i].y < 0
            && shooter.weapon != "launcher")
            // deletion for flammen
            || (shooter.weapon == "flammen" && (projectiles[i].x > canvas.width - 350 
            || projectiles[i].x < 0 || projectiles[i].y < 0))) {
                projectiles.splice(i, 1);
                i--;
            }
        }
    }
}

// SNACK HANDLING
function handleSnack() {
    for (let i = 0; i < snackQueue.length; i++) {
        let snack = snackQueue[i];
        snack.draw(cxt);

        // drop until it touches the floor
        if (snack.y + snack.height < flora.y) {
            snack.update();
        }
    }
}

function handleEnemy() {
    for (let i = 0; i < enemyQueue.length; i++) {
        let current = enemyQueue[i];

        if (!shooter.duck) current.bulletLimit = shooter.x + shooter.width;
        else {
            // WHEN DUCKING:
            if (current.type == "ground" || current.type == "crawl") current.bulletLimit = 0
            else if (current.type == "air") current.bulletLimit = shooter.x + shooter.width / 2;
        }

        // HERE'S HOW WE DISCRIMINATE CIVIES:
        if (current.speed < 0) current.isCivie = true;

        // ALL enemies given civie status on specialRound
        if (specialRound) current.isCivie = true;

        if (state != "LOSE") handleEnemyProjectiles(current);

        // DETERMINE ENEMY Y AXIS BASED ON THEIR TYPE
        if (current.type == "ground" || current.type == "crawl" || current.type == "sheep") {
            current.y = flora.y - current.height;
            current.angle = "back";
            if (current.type == "sheep" && current.duck == true) current.angle = "down-back";
        } else if (current.type == "air") {
            current.y = flora.y - 150;
            current.angle = "down-diagnal";
        } else {
            // BOMBER:
            current.y = flora.y - 190;
            current.angle = "straight-down";
        }

        // FIX THIS CRAP --DONE. Takes into account both regular and special rounds:
        // delete enemies if they are off-canvas:
        if ((current.x + current.width >= 0) && (current.x <= canvas.width + 50)) {
        // REVISION: don't force player to kill civilians
            current.draw(cxt);
            current.update(); 

        } else {
            current.dead = true;
            // UNCOMMENT:
            if (!current.isCivie) wallHealth.number--;
        }

        if (current.dead) {
            enemyQueue.splice(i, 1);
            score += 10;
            if (enemiesLeft > 0) enemiesLeft--;
        }

        // this.angle = "back";
        if (current.type == "sheep" && current.inPosition == true && shooter.duck) {
            current.duck = true;
            current.angle = "down-back"
        } else {
            current.duck = false;
            current.angle = "back";
        }

        if (current.type == "bomber" && current.inPosition == true) {
            current.renderBeam(cxt);
            if (!current.dead && current.timer >= current.openFire) playSound(sfx.rayBeam);
            // else sfx.rayBeam.stop();
        };

        // FIX THIS CRAP ASAP:  --DONE
        // FIX THIS STUPID GLITCH   --DONE
        for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {   
            // this is the distance applicable to enemy (50, 150, 250, 180 (aerial))
            let trueDistance = shooter.x + shooter.width + baddiePositions[i.toString()]["distance"];
            if (!baddiePositions[i.toString()]["inPos"] &&
                // what was my thought process behind this? If orc is within "true" distance, set "inPos" to true
                (current.x <= trueDistance && current.x >= trueDistance - 10) && 
                // (current.x <= trueDistance &&
                // current.x > trueDistance - shooter.width)  &&
                current.type == baddiePositions[i.toString()]["type"] && 
                !specialRound &&
                current.speed > 0) {
                    // enemy stops moving at shooting (enemy class logic)
                    current.shooting = true; 
                    baddiePositions[i.toString()]["inPos"] = true;
                    current.position = i.toString();
                    current.inPosition = true;
            }

            if (current.type == "crawl" && current.shooting && frame % 50) {
                playSound(sfx.growl);
            }
        }
    }
}

function pushEnemy() {
    // so, if frame == 50 and I get randomFrames[0] (50), enemy gets pushed to queue.

    // RANDOMFRAMES determines distances between enemies
    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {

        // if (state = "LOADING") enemyQueue.push(new Enemy(-50, -currentSpeed, currentRound, enemySpeed, "loading"));

        if (specialRound == true && enemiesLeft <= 0) {
            specialRound = false;
            endSpecRound = true;
            // state = "NATURAL";
        }
        
        if (enemyCount > 0) {   
            if (!specialRound) {
                // DO NOT REVERT. NEED TO MAKE WAY FOR DIFFERENT SPEEDS:
                enemyQueue.push(new Enemy(canvas.width, currentSpeed, currentRound, enemySpeed));
                enemyCount--;  

                // SPAWN CIVIES IN LATTER PART OF FINAL ROUND:
                if (finalRound && enemyCount % 3 == 0 && (enemyCount < 20 && enemyCount > 10)) {
                    enemyQueue.push(new Enemy(-42, -currentSpeed, currentRound, enemySpeed));
                    enemyCount--; 
                }
            }  
            else {
                // CIVIES SPAWNED HERE IN SPECIAL ROUND:
                // DOESN'T ACTUALLY SPAWN CIVIES. Just normal enemies at coord -50 lol:
                // REMEMBER: enemyCount only refers to num. of enemies to push to array :)
                // if (enemyCount > 0) {
                if (!endSpecRound) {
                    enemyQueue.push(new Enemy(-42, -currentSpeed, currentRound, enemySpeed));
                    enemyCount--; 
                }
            }
        } 

        else if (enemiesLeft <= 0) {
            specialRound = false;
            state = "WIN";
        }

        // attempt to stop win breaks from not showing up:
        else if ([1, 2, 3].includes(currentRound) && enemiesLeft <= 0) state = "WIN";
    }
}

function nadeCollision(nade, orc) {
    if (
        // FRONT:
        nade.y + nade.size >= orc.y && 
        nade.x + nade.size >= orc.x && 
        // BACK:
        // YES, THIS IS CORRECT:
        nade.x - nade.size <= orc.x + orc.width
        
    ) {
        return true;
    }
}

// collission successful.
function collision(bullet, orc) {
    if (
        // BACKWARDS SHOOTING:
        //  for forward ground and air (ensure bullet is inbetween x and width)
        (bullet.x + bullet.size >= orc.x && bullet.x <= orc.x + orc.width &&
        bullet.y + bullet.size >= orc.y && bullet.y <= orc.y + orc.height) 
        // GRENADE SHIT:
        //  && bullet.x - bullet.size >= orc.x && bullet.x - bullet.size <= orc.x + orc.width)
        || (bullet.x <= orc.x + orc.width && 
            bullet.x >= orc.x &&
            bullet.y > orc.y && 
            bullet.y < orc.y + orc.width &&
            (bullet.y < orc.y + orc.height))
        //  BULLET ON BULLET CONTACT:
        // || (bullet.x + bullet.size >= orc.x && bullet.y <= orc.y + orc.size && 
        //     bullet.y + bullet.size >= orc.y)
    ) {
        return true;
    }
    //else return false;
}

// used to determine if the mouse is inside a given button. (mouse, button, state)
function mouseCollision(first, second, callback) {
    if (
      first.x >= second.x &&
      first.x <= second.x + second.width &&
      first.y >= second.y &&
      first.y <= second.y + second.height
    ) {
        second.stroke = "red";
        if (first.clicked) {
            //state = nextState;
            callback();
        }
    } else {
        second.stroke = "black";
    }
}

// FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
function animate() {
    bullet_cxt.clearRect(0, 0, bullet_canvas.width, bullet_canvas.height);
    bullet_cxt.fillStyle = "transparent";
    bullet_cxt.fillRect(0, 0, bullet_canvas.width, bullet_canvas.height);

    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle = "transparent";
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
    cxt2.fillStyle = "transparent";
    cxt2.fillRect(0, 0, canvas2.width, canvas2.height);
    // dont want it redrawing the floor over and over again
    flora.draw(cxt2);
    handleShooter();
    handleSnack();
    handleState();
    handleStatus();
    handleProjectile(enemyQueue);
    // if (!shooter.dead) handleNade(enemyQueue);
    handleNade(enemyQueue);

    if ((state == "RUNNING" || state == "LOSE") && frame <= 100) frame++;
    else frame = 0;

    // console.log(shooter.timer);

    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}

// animate();
window.requestAnimationFrame(animate);
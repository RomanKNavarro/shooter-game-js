// would be super useful if I can import "flora" in here.

import Projectile from "./projectile.js";
var canvas = document.getElementById("canvas1");

// why is mouse stuff here? so that it can be used as "entity.mouse" in inputHandler.js
export default class Shooter {
    // constructor(x) { 
    constructor(x, y) { 
        // this.width = 44;
        // this.height = 34;
        // this.width = 50;
        // this.height = 50;

        this.width;
        this.height;

        // this.y;
        this.y = y;

        this.init = false;

        this.x = x;
        this.secondX = 200;

        this.bulletY = 191;

        this.isSecond = false;
        this.initSecond = false;
        this.secondReady = false;

        this.secondStream = false;

        this.name = "Warren";
        this.disabled = true;
        this.health = 3;
        this.delete = false;

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
        // FIX THIS CRAP:
        // too much crap in input handler. Making exclusive case handler here:
        // 44x34
        // FIRE: 44×34
        this.pistol_stand = new Image();
        this.pistol_stand.src = "src/assets/images/CLEARS/pistol/sheep-pistol-clear.png";

        // 43x36, diagnal
        // FIRE: 43×40
        this.pistol_stand_up = new Image();
        this.pistol_stand_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-clear.png";

        // 44x36
        this.pistol_stand_top = new Image();
        this.pistol_stand_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-top-clear.png";

        // 50x28
        // FIRE: 50×28
        this.pistol_crouch = new Image();
        this.pistol_crouch.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-clear.png";

        // 49x30
        this.pistol_crouch_up = new Image();
        this.pistol_crouch_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-crouch-clear.png";

        // 50x30
        // FIRE: 50×33
        this.pistol_crouch_top = new Image();
        this.pistol_crouch_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-top-clear.png";

        //rifle:
        // 44x40
        this.rifle_stand = new Image();
        this.rifle_stand.src = "src/assets/images/CLEARS/rifle/sheep-rifle-clear.png";

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

        // SPRITESHEET CRAP:
        this.frame = 0;
        this.frameRate = 10; 

        // PISTOL FIRE IMAGES:  
        // done
        this.pistol_fire = new Image();
        this.pistol_fire.src = "src/assets/images/fires/pistol/pistol-stand-fire.png";

        // 
        this.pistol_up_fire = new Image();
        this.pistol_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup3.png";

        this.pistol_top_fire = new Image();
        this.pistol_top_fire.src = "src/assets/images/fires/pistol/sheep-pistol-top3.png";

        this.pistol_crouch_fire = new Image();
        this.pistol_crouch_fire.src = "src/assets/images/fires/pistol/sheep-pistol-crouch3.png";

        this.pistol_crouch_up_fire = new Image();
        this.pistol_crouch_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup-crouch3.png";

        this.pistol_crouch_top_fire = new Image();
        this.pistol_crouch_top_fire.src = "src/assets/images/fires/pistol/pistol-crouch-top3.png";

        // GET THESE FIRE IMAGES UP AND RUNNING:
        this.pistol_images = {
            "straight": {"idle": this.pistol_stand, "fire": this.pistol_fire}, 
            "diagnal": {"idle": this.pistol_stand_up, "fire": this.pistol_up_fire}, 
            "up": {"idle": this.pistol_stand_top, "fire": this.pistol_top_fire},
            "down": {"idle": this.pistol_crouch, "fire": this.pistol_crouch_fire},  
            "diagnal-duck": {"idle": this.pistol_crouch_up, "fire": this.pistol_crouch_up_fire},
            "down-up": {"idle": this.pistol_crouch_top, "fire": this.pistol_crouch_top_fire},
            "down-back": {"idle": this.pistol_crouch, "fire": this.pistol_crouch},
            "back": {"idle": this.pistol_stand, "fire": this.pistol_fire},
            "diagnal-back": {"idle": this.pistol_stand_up, "fire": this.pistol_up_fire}
        };

        // this.rifle_images = {"straight": this.rifle_stand, "diagnal": this.rifle_stand_up, 
        // "down": this.rifle_crouch, "up": this.rifle_stand_top, "diagnal-duck": this.rifle_crouch_up,
        // "down-up": this.rifle_crouch_top};

        // this.pistol_images = {"straight": this.pistol_stand, "diagnal": this.pistol_stand_up, 
        // "down": this.pistol_crouch, "up": this.pistol_stand_top, "diagnal-duck": this.pistol_crouch_up,
        // "down-up": this.pistol_crouch_top, 
        // "down-back": this.pistol_crouch, "back": this.pistol_stand,
        // "diagnal-back": this.pistol_stand_up};

        this.images = {"pistol": this.pistol_images, "rifle": this.rifle_images};

        // this.pistol_frames = new Image();
        // this.pistol_frames.src = "src/assets/images/sprites/stand-pistol.png";

        this.frameX = 0;
        this.frameY = 0;
        // DIMENSIONS FOR STAND IMAGE:
        // 44x34
        // this.spriteWidth = 50;
        // this.spriteHeight = 34;

        // FOR CROUCH: 
        // 50x28

        this.spriteWidth = 50;
        this.spriteHeight = 28;
        this.minFrame = 0;
        this.maxFrame = 2;

        this.frames = this.pistol_frames;

        this.animation = true;
        this.animationTime = 0.5

        this.distFromFloor;
    
    }
    
    draw(context) {
        // SHOOTER HEIGHT CHANGED HERE:
        context.beginPath();
        context.fillStyle = "yellow";

        // if (!this.duck) {
        //     context.fillRect(this.x, this.y, this.width, this.height);
        // } else {
        //     context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        // }

        this.image = this.images[this.weapon][this.angle]["idle"];
        // this.image = this.images[this.weapon][this.angle];
        // this.fire = this.images[this.weapon][this.angle]["fire"];

        if (this.frame < 100) {
            this.frame++;
        }
        else this.frame = 0;

        // REVELATION: no need to call "this.images" over and over again. I can just do it once.
        
        switch (this.angle) {
            case "straight":
            case "back":
                this.width = 50;
                this.height = 34;
                this.y = canvas.height - (canvas.height * (1/4)) - 34;
                break;

            // FIRE: 43×40
            case "diagnal":
            case "diagnal-back":
                // 43x36
                this.width = 43;
                this.height = 36;
                this.y = canvas.height - (canvas.height * (1/4)) - 36;

                // SO CLOSE TO FIXING THIS CRAP:
                // this.y = canvas.height - (canvas.height * (1/4)) - 40;
                break;

            case "up":
                this.width = 44;
                this.height = 36;
                this.y = canvas.height - (canvas.height * (1/4)) - 36;
                break;

            case "down-up":
                this.bulletY = 197;
                this.width = 50;
                this.height = 30;
                this.y = canvas.height - (canvas.height * (1/4)) - 30;
                break;

            case "down":
            case "down-back":
                this.bulletY = 197;
                // 50x28
                this.width = 50;
                this.height = 28;
                this.y = canvas.height - (canvas.height * (1/4)) - 28;
                // this.image = this.pistol_crouch;
                break;

            case "diagnal-duck":
                this.bulletY = 197;
                // 49x30
                this.width = 49;
                this.height = 30;
                // this.image = this.pistol_crouch_up;
                this.y = canvas.height - (canvas.height * (1/4)) - 20;
                break;
        }

       if (["straight", "down", "diagnal-duck", "down-up", "diagnal", "up"].includes(this.angle)) {
            context.drawImage(this.image, this.x, this.y);
        } else {
            context.save();
            context.translate(this.x + this.width, this.y);
            context.scale(-1,1);
            // context.drawImage(this.image, canvas.width * -50, this.y);
            context.drawImage(this.image, 0, 0);
            
            context.restore();
        }

        if (this.shooting && this.animation) {
            // context.drawImage(this.fire, this.x, this.y);
            this.image = this.images[this.weapon][this.angle]["fire"];
            context.drawImage(this.images[this.weapon][this.angle]["fire"], this.x, this.y);
        } 

        context.font = "20px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // TEXT:
        context.fillText(`${this.y}, ${this.spriteWidth}`, this.x + (this.width / 2), this.y - 100);
        // context.fillText(this.duck, this.x + (this.width / 2), this.y + (this.height / 2));
        // context.fillText(this.width, this.x + (this.width / 2), this.y - 50);
    }

    update() { 
        // if (this.shooting) this.animation = true;

        // UNCOMMENT AND REPLACE: 
        if (this.shooting) {
            // this.animation = true;
            setTimeout(() => {
                this.animation = false;
            }, 50);

            // setTimeout(() => {
            //     showNextRound = true;
            // }, 1000);
        } else this.animation = true;

        // if (this.isSecond == true && this.x <= 200 && this.initSecond == true) {
        if (this.isSecond == true && this.initSecond == true) {
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
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.bulletY, this.angle, this.weapon, this.delete));

                // this.projectiles.push(new Projectile(this.secondX, this.y + 10, this.angle, this.weapon, this.delete));
                // this.projectiles.push(new Projectile(this.secondX, this.y, this.angle, this.weapon, this.delete));
                if (this.secondStream == true) {
                    this.projectiles.push(new Projectile(this.secondX, this.y + 10, this.angle, this.weapon, this.delete));
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
// would be super useful if I can import "flora" in here.

import Projectile from "./projectile.js";
var canvas = document.getElementById("canvas1");

// why is mouse stuff here? so that it can be used as "entity.mouse" in inputHandler.js
export default class Shooter {
    constructor(x) { 
        // this.width = 44;
        // this.height = 34;
        // this.width = 100;
        // this.height = 50;
        this.width;
        this.height;
        this.y;

        // this.image = new Image();
        // this.image.src = "src/assets/images/sheep-pistol-clear.png";

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
        this.pistol_stand = new Image();
        this.pistol_stand.src = "src/assets/images/CLEARS/pistol/sheep-pistol-clear.png";

        // 43x36, diagnal
        this.pistol_stand_up = new Image();
        this.pistol_stand_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-clear.png";

        // 44x36
        this.pistol_stand_top = new Image();
        this.pistol_stand_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-top-clear.png";

        // 50x28
        this.pistol_crouch = new Image();
        this.pistol_crouch.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-clear.png";

        // 49x30
        this.pistol_crouch_up = new Image();
        this.pistol_crouch_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-crouch-clear.png";

        // 50x30
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

        this.image = this.pistol_stand;

        this.pistol_images = {"straight": this.pistol_stand, "diagnal": this.pistol_stand_up, 
        "down": this.pistol_crouch, "up": this.pistol_stand_top, "diagnal-duck": this.pistol_crouch_up,
        "down-up": this.pistol_crouch_top};

        this.rifle_images = {"straight": this.rifle_stand, "diagnal": this.rifle_stand_up, 
        "down": this.rifle_crouch, "up": this.rifle_stand_top, "diagnal-duck": this.rifle_crouch_up,
        "down-up": this.rifle_crouch_top};

        // this.images = this.pistol_images;
        this.images = {"pistol": this.pistol_images, "rifle": this.rifle_images};

        // SPRITESHEETS:
    
    }
    
    draw(context) {
        // SHOOTER HEIGHT CHANGED HERE:
        context.beginPath();
        context.fillStyle = "yellow";

        if (!this.duck) {
            context.fillRect(this.x, this.y, this.width, this.height);
        } else {
            context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        }

        switch (this.angle) {
            case "straight":
                this.width = 44;
                this.height = 34;
                this.y = canvas.height - (canvas.height * (1/4)) - 34;
                this.image = this.images[this.weapon]["straight"];
                break;

            case "diagnal":
                // 43x36
                this.width = 43;
                this.height = 36;
                this.y = canvas.height - (canvas.height * (1/4)) - 36;
                this.image = this.images[this.weapon]["diagnal"];
                break;

            case "up":
                this.width = 44;
                this.height = 36;
                this.y = canvas.height - (canvas.height * (1/4)) - 36;
                this.image = this.images[this.weapon]["up"];
                break;

            case "down-up":
                this.bulletY = 197;
                this.width = 50;
                this.height = 30;
                this.y = canvas.height - (canvas.height * (1/4)) - 30;
                this.image = this.images[this.weapon]["down-up"];
                break;

            case "down":
                this.bulletY = 197;
                // 50x28
                this.width = 50;
                this.height = 28;
                this.y = canvas.height - (canvas.height * (1/4)) - 28;
                // this.image = this.pistol_crouch;
                this.image = this.images[this.weapon]["down"];
                break;

            case "diagnal-duck":
                this.bulletY = 197;
                // 49x30
                this.width = 49;
                this.height = 30;
                // this.image = this.pistol_crouch_up;
                this.y = canvas.height - (canvas.height * (1/4)) - 30;
                this.image = this.images[this.weapon]["diagnal-duck"];
                break;
        }

        context.drawImage(this.image, this.x, this.y);

        context.font = "20px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // TEXT:
        context.fillText(this.y, this.x + (this.width / 2), this.y - 100);
        // context.fillText(this.width, this.x + (this.width / 2), this.y - 50);
    }

    update() {
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
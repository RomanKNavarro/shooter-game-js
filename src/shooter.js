import Projectile from "./projectile.js";

// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false });


// why is mouse stuff here? so that it can be used as "entity.mouse" in inputHandler.js
export default class Shooter {
    constructor(x, y) { 
        this.width = 50;
        this.height = 50;
        this.y = y;

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

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;
        this.timer = 0;

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
    }
    
    draw(context) {
        context.beginPath();
        context.fillStyle = "yellow";
        if (!this.duck) {
            context.fillRect(this.x, this.y, this.width, this.height);
        } else {
            context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        }

        context.font = "20px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.secondNade, this.x + (this.width / 2), this.y + (this.height / 2));
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
            
            if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.weapon, this.delete));

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
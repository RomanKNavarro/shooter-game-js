import Projectile from "./projectile.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 


// why is mouse stuff here? so that it can be used as "entity.mouse" in inputHandler.js
export default class Shooter {
    constructor(x, y) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;

        this.name = "Warren";
        this.disabled = true;
        this.health = 3;

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;
        this.timer = 0;

        this.angle = "straight";

        // pistol, ar, and flamethrower
        this.weapon = "pistol";
        this.fireRate = 0;
        this.specialAmmo = 0;

        // this.weapon = "flammen";
        // this.fireRate = 10;
        // this.specialAmmo = 100;

      // mouse stuff in here lol, used in script.js
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        this.flammen = new Audio();
        this.flammen.src = "src/assets/sounds/flammen.mp3";

    }
    
    draw() {
        cxt.beginPath();
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);

        cxt.font = "20px serif";
        cxt.fillStyle = "black";
        cxt.textAlign = "center";
        cxt.textBaseline = "middle";
        cxt.fillText(this.specialAmmo, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    update() {

        if (this.shooting == true) {
            this.flammen.play();
        } else {
            this.flammen.pause();
            this.flammen.currentTime = 0;
        }

        // code doesn't work. fireRate not set.    
        if (this.shooting && !this.disabled) {
            this.timer++; 
            if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.weapon));  
                // this.crack.play();

                // what's this again?
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
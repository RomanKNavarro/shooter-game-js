import Projectile from "./projectile.js";

var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Shooter {
    constructor(x, y) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;

        this.name = "Warren";

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;
        this.timer = 0;

        this.angle = "straight";

        // pistol and ar for now
        this.weapon = "pistol";
        this.fireRate = 0;
        this.specialAmmo = 0;

      // mouse stuff in here lol, used in script.js
    this.mouse = {
        x: 10,
        y: 10,
        width: 0.1,
        height: 0.1,
        clicked: false
      };
    }
    
    draw() {
        cxt.beginPath();
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // while space bar is pressed, push bullets

        // code doesn't work. fireRate not set.    
        if (this.shooting) {
            this.timer++; 
            if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 20, this.angle));               
            }
        }
        else {
            this.timer = 0;
        }

        // add bullet when not shooting
        // or: add bullet when shooting, but only one

        // if (this.weapon = "pistol") {
        //     this.timer++;
        //     if (this.shooting && this.projectiles.length < 2) {
        //         if (this.timer % 50 === 0  || this.timer == 1) {
        //             this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 20, this.angle));
        //         }
        //     } 
        // }
    }
}
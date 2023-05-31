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
        this.disabled = true;

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;
        this.timer = 0;

        this.angle = "straight";

        // pistol, ar, and flamethrower
        // this.weapon = "pistol";
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

        cxt.font = "20px serif";
        cxt.fillStyle = "black";
        cxt.textAlign = "center";
        cxt.textBaseline = "middle";
        cxt.fillText(this.specialAmmo, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    update() {
        // code doesn't work. fireRate not set.    
        if (this.shooting && !this.disabled) {

            // console.log(`this.weapon: ${this.weapon}
            // this.specialAmmo: ${this.specialAmmo}
            // this.fireRate: ${this.fireRate}`);

            //console.log(this.specialAmmo);
            this.timer++; 
            if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle));  
            
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
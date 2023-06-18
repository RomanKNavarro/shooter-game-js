var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
export default class Grenade {
    constructor(x) {
        this.x = x;
        // this.x = canvas.width / 2;
        // this.x1 = canvas.width / 2;
        // this.x2 = canvas.width / 1.2;
        // this.defaultX = this.x1;
        // this.y = -20; 

        this.ready = false;
        this.y = canvas.height / 2; 

        this.size = 10;

        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";

        
        this.bloopPlayed = false;
        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";
    }

    draw() {
        cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        cxt.stroke();
    }

    update() {
        this.thrown = true;
        // if (this.y < canvas.width / 2) this.y -= 5;
       //  if (this.size <= 100) this.size += 10;
    }
}
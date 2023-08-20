// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
export default class Grenade {
    constructor(x, entity, canvas) {
        this.canvas = canvas;
        this.x = x;
        // this.x = canvas.width / 2;
        // this.x1 = canvas.width / 2;
        // this.x2 = canvas.width / 1.2;
        // this.defaultX = this.x1;
        // this.y = -20; 

        this.ready = false;
        this.y = this.canvas.height / 2; 

        this.entity = entity;
        this.dudY = this.entity.y;
        this.dudX = this.entity.x;
        this.dudSize = 5;

        this.size = 10;

        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";

        this.bloopPlayed = false;
        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";
    }

    // draws the explosion
    draw(context) {
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        // cxt.rect(this.x, this.y, this.size, this.size);
        context.stroke();
    }

    // draws the nade itself
    drawDud(context) {
        context.arc(this.entity.x + this.entity.width / 2, this.dudY, this.dudSize, 0, Math.PI * 2, true);
        context.fill();
    }
    updateDud() {
        if (this.dudY > 0) {
            this.dudY -= 10;
            this.dudX -= 10;
        }
    }
}
// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false }); 

// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
export default class Grenade {
    constructor(x, entity, canvasa, contexto) {
        this.canvasa = canvasa;
        this.contexto = contexto;
        this.x = x;
        // this.x = canvas.width / 2;
        // this.x1 = canvas.width / 2;
        // this.x2 = canvas.width / 1.2;
        // this.defaultX = this.x1;
        // this.y = -20; 

        this.ready = false;
        this.y = this.canvasa.height / 2; 

        this.entity = entity;
        this.dudY = this.entity.y;
        this.dudSize = 5;

        this.size = 10;

        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";

        this.bloopPlayed = false;
        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";
    }

    draw() {
        this.contexto.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        // cxt.rect(this.x, this.y, this.size, this.size);
        this.contexto.stroke();
    }
    update() {
        this.thrown = true;
        // if (this.y < canvas.width / 2) this.y -= 5;
       //  if (this.size <= 100) this.size += 10;
    }

    drawDud() {
        this.contexto.arc(this.entity.x + this.entity.width / 2, this.dudY, this.dudSize, 0, Math.PI * 2, true);
        this.contexto.fill();
    }
    updateDud() {
        if (this.dudY > 0) {
            this.dudY -= 10;
        }
    }
}
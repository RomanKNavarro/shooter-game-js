// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false }); 

export default class Health {
    constructor(y) {

        this.x = 0;
        this.y = y;
        this.hurt = false;
        this.number = 3;
    }
    
    update() {
        if (this.hurt) {
            this.number--;
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = "green";

        for (let i = 0; i < this.number; i++) {
            context.fillRect(i * 30, this.y, 20, 20);
        }     
    }
}


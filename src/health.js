var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Health {
    constructor(y) {
        this.x = 0;
        this.y = y;
        this.hurt = false;
        this.number = 3;
    }
    update() {
        if (this.hurt) {
            this.instas--;
        }

    }

    draw() {
        cxt.beginPath();
        cxt.fillStyle = "green";

        for (let i = 0; i < this.number; i++) {
            cxt.fillRect(i * 30, this.y, 20, 20);
        }     
    }
}


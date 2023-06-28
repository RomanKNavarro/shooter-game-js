// var canvas = document.getElementById("canvas1");
// var cxt = canvas.getContext("2d", { alpha: false }); 

export default class Health {
    constructor(y, canvasa, contexto) {
        this.canvasa = canvasa;
        this.contexto = contexto;

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

    draw() {
        this.contexto.beginPath();
        this.contexto.fillStyle = "green";

        for (let i = 0; i < this.number; i++) {
            this.contexto.fillRect(i * 30, this.y, 20, 20);
        }     
    }
}


var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d", { alpha: false }); 

// var ui_layer = document.getElementById("ui-layer");
// var cxt2 = ui_layer.getContext("2d", { alpha: false });
// ui_layer.style.width=ui_layer.getBoundingClientRect().width;//actual width of canvas
// ui_layer.style.height=ui_layer.getBoundingClientRect().height;//actual height of canvas

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

    draw() {
        cxt.beginPath();
        cxt.fillStyle = "green";

        for (let i = 0; i < this.number; i++) {
            cxt.fillRect(i * 30, this.y, 20, 20);
        }     
    }
}


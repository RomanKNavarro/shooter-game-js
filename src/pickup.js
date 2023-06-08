var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Pickup {
    constructor(x, y) {
        this.width = this.height = 20;

        this.x = x;
        this.y = y;
        this.delete = false;

        this.typeNum = Math.random() * 10;

        // FIX THIS HEALTH CRAP:
        this.flammenOdds = 1.5;
        this.healthOdds = 1;


        // this.type = _.sample(["ar"]);
        this.type = "ar";

        // this.types = ["ar"];
        // this.type = this.types[Math.floor(Math.random() * this.types.length)];
    }

    update() {
        // this.y -= 15;
        this.y += 10;
        //console.log(this.type);
    }

    draw() {
        if (!this.delete) {
            cxt.beginPath();
            cxt.fillStyle = "purple";
            cxt.fillRect(this.x, this.y, this.width, this.height);
            // cxt.fill();

            cxt.font = "20px serif";
            cxt.fillStyle = "black";
            cxt.textAlign = "center";
            cxt.textBaseline = "middle";

            if (this.typeNum <= this.healthOdds) this.type = "health";
            else if (this.typeNum <= this.flammenOdds) this.type = "flammen";
      
            cxt.fillText(this.type, this.x + (this.width / 2), this.y + (this.height / 2));
        };

        
    }
}
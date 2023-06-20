var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Pickup {
    constructor(x, y) {
        this.width = this.height = 20;

        this.x = x;
        this.y = y;
        this.delete = false;

        this.typeNum = Math.floor(Math.random() * 10);

        this.isWeapon = false;

        this.sound;


        this.rifleReload = new Audio();
        this.rifleReload.src = "src/assets/sounds/rifleReload.mp3";
        // this.rifle.src = 
        this.flammenReload = new Audio();
        this.flammenReload.src = "src/assets/sounds/futureReload.mp3";

        this.nadePin = new Audio(); 
        this.nadePin.src

        // ONLY A 0/10 CHANCE TO SPAWN PICKUP IN GENERAL:

        this.weaponOdds = 5;
        this.aidOdds = 5;

        this.weapon = ["flammen", "grenade"][Math.floor(Math.random() * 2)];
        this.aid = ["health", "wall"][Math.floor(Math.random() * 2)];

        // type by default is ar
        this.type = "ar";

        // this.types = ["ar"];
        // this.type = this.types[Math.floor(Math.random() * this.types.length)];
    }

    update() {
        // this.y -= 15;
        this.y += 10;

        if (this.typeNum <= this.weaponOdds) {
            this.type = this.weapon;
            this.isWeapon = true;
        }
        else if (this.typeNum <= this.aidOdds && this.typeNum > this.weaponOdds) this.type = this.aid;

        //  SOUND TO PLAY WHEN PICKED UP:
        switch (this.type) {
            case "flammen":
                this.sound = this.flammenReload;
            case "ar":
                this.sound = this.rifleReload;
            case "grenade":
                this.sound = this.nadePin;
        }
    }

    draw() {
        if (!this.delete) {
            cxt.beginPath();
            cxt.fillStyle = "purple";

            cxt.fillRect(this.x, this.y, this.width, this.height);
            // cxt.fillRect(299, this.y, this.width, this.height);

            // cxt.fill();

            cxt.font = "20px serif";
            cxt.fillStyle = "black";
            cxt.textAlign = "center";
            cxt.textBaseline = "middle";
            

      
            cxt.fillText(`${this.type}, ${this.typeNum}`, this.x + (this.width / 2), this.y + (this.height / 2));
        };        
    }
}
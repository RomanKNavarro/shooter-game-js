export default class Pickup {
    constructor(x, y, round) {

        this.width = this.height = 20;

        this.x = x;
        this.y = y;
        this.delete = false;

        // this.sound;
        this.sound;
        this.round = round;

        this.rifleReload = new Audio();
        this.rifleReload.src = "src/assets/sounds/rifleReload.mp3";
        // this.rifle.src = 
        this.flammenReload = new Audio();
        this.flammenReload.src = "src/assets/sounds/futureReload.mp3";

        this.nadePin = new Audio(); 
        this.nadePin.src;

        this.sfx = {
            // PICKUP SFX:
            arReload: new Howl({
                src: [
                    "src/assets/sounds/rifleReload.mp3",
                ],
                volume: 5,
            }),
            nadePin: new Howl({
                src: [
                    "src/assets/sounds/grenadePin.mp3",
                ],
                volume: 5,
            }),
            flammenReload: new Howl({
                src: [
                    "src/assets/sounds/futureReload.mp3",
                ],
                volume: 5,
            }),
            health: new Howl({
                src: [
                    "src/assets/sounds/3 heal spells/healspell1.mp3",
                ],
                loop: false,
            }),
            wall: new Howl({
                src: [
                    "src/assets/sounds/3 heal spells/healspell2.mp3",
                ], 
                loop: false,
            }),
        }

        // ONLY A 0/10 CHANCE TO SPAWN PICKUP IN GENERAL (see enemy.js):
        // equal chance to spawn aid and weapons?
        this.typeNum = Math.floor(Math.random() * 10);

        // 4/10 chance to spawn weapon. 5/10 chance to spawn aid. Otherwise, spawn ar.
        this.weaponOdds = 4;
        this.aidOdds = 5;

        //  FIX THIS CRAP
        this.flammenOdds = 1;
        // this introduced at round
        this.weapon = ["flammen", "grenade"][Math.floor(Math.random() * 2)];
        this.aid = ["health", "wall"][Math.floor(Math.random() * 2)];

        // type by default is ar
        this.type = "ar";
    }

    // if not current respective weapon round, should default to aid pickup
    update() {
        this.y += 10;

        // weaponOdds encompasses flammen, ar, and grenade
        // REMEMBER: typeNum is num 0-10
        if (this.typeNum <= this.weaponOdds) {
            if (this.weapon == "flammen") {
                if (this.round >= 3) {
                    this.type = "flammen";
                }
                this.type = "grenade";
            }
            else if (this.weapon == "grenade") {
                if (this.round >= 3) {
                    this.type = "grenade";
                }
                this.type = "ar";
            }
        }
        else if (this.typeNum <= this.aidOdds && this.typeNum > this.weaponOdds) this.type = this.aid;

        //  SOUND TO PLAY WHEN PICKED UP:
        switch (this.type) {
            case "flammen":
                // this.sound = this.flammenReload;
                this.sound = this.sfx.flammenReload;
                break;
            case "ar":
                this.sound = this.sfx.arReload;
                break;
            case "grenade":
                this.sound = this.sfx.nadePin;
                break;
            case "health":
                this.sound = this.sfx.health;
                break;
            case "wall":
                this.sound = this.sfx.wall;
                break;
        }
    }

    draw(context) {
        if (!this.delete) {
            context.beginPath();
            context.fillStyle = "purple";

            context.fillRect(this.x, this.y, this.width, this.height);
            // context.fillRect(299, this.y, this.width, this.height);

            context.font = "20px serif";
            context.fillStyle = "black";
            context.textAlign = "center";
            context.textBaseline = "middle";

            context.fillText(`${this.type}`, this.x + (this.width / 2), this.y + (this.height / 2));
        };        
    }
}
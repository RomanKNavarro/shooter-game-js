var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
export default class Grenade {
    constructor() {
        this.x1 = canvas.width / 2;
        this.x2 = canvas.width / 1.2;
        this.defaultX = this.x1;

        this.y = -20; 

        this.size = 10;
        this.thrown = false;
    }

    draw() {
        cxt.arc(this.defaultX, this.y, this.size, 0, Math.PI * 2, true);
        cxt.fill();
    }

    update() {
        this.thrown = true;
        if (this.y < canvas.width / 2) this.y -= 5;
        else if (this.size <= 100) this.size += 1
    }
}
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class AirEnemy extends Enemy {
    constructor(x, y) {
        this.speed = 7;
        this.color = "orange";
  
        this.x = x;
        this.y = y;
    }
  }
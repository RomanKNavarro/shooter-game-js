var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

import {flora} from "./script.js";  


export default class Shooter {
    constructor() {
      this.width = 200;
      this.height = 200;
      this.x = flora.x;
      this.y = flora.y + 140;
    //   this.x = 100;
    //   this.y = 100;

      this.projectiles = [];
      this.timer = 0;
    }
  
    draw() {
        console.log(this.x);
        cxt.beginPath();
        //cxt.rect(this.x, this.y, this.width, this.height); // rect(x, y, width, height)
        cxt.fillStyle = "yellow";
        cxt.fillRect(this.x, this.y, this.width, this.height);
        // cxt.stroke();
    }
  
    // update() {
    //   if (frame % sheepFrame === 0) {
    //     if (this.frameX < this.maxFrame) this.frameX++;
    //     else this.frameX = this.minFrame;
    //   } // run animation
  
    //   if (this.shooting) {
    //     this.timer++;
    //     if (this.timer % 10 === 0 && score < winningScore) {
    //       projectiles.push(new Projectile(this.x + this.width - 20, this.y + 55));
    //     }
    //   } else {
    //     this.timer = 0;
    //   }
    // }
  }
class Character {
    constructor() {
  
      this.width = 200;
      this.height = 110;

      this.speed = 5;
      this.scoreAtDeath = this.character[3];
  
      this.x = canvas.width + this.distanceX;
      this.y = floor.y - this.height;
  
      this.moving = true;
    }

    draw() {
        cxt.beginPath();
        cxt.fillStyle = "pink";
        cxt.fillRect(this.x, this.y, this.width, this.height);
      }
  
    update() {
      this.x -= this.speed;
    }
}
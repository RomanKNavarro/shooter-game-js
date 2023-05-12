// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";

// YOOO MAKE SURE YOUR CANVAS HAS THIS ID:
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

const flora = new Floor();
flora.draw();

const enemy = new Enemy(canvas.width, flora.y - 50);

const shooter = new Shooter(100, flora.y - 50);
new InputHandler(shooter);

function handleShooter() {
    shooter.draw();
    shooter.update();
}

// hope this works
function handleProjectile() {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();
    }
}

function handleEnemy() {
    enemy.update();
    enemy.draw();
}

// FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    flora.draw();
    handleShooter();
    handleProjectile();
    handleEnemy();

    setTimeout(animate ,15);
}
  
animate();
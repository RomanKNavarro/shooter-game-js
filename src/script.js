// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";

// canvas stuff
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// objects
const flora = new Floor();
const enemy = new Enemy(canvas.width, flora.y - 50);
const shooter = new Shooter(100, flora.y - 50);
new InputHandler(shooter);

// variables
let frame = 0;
let randomFrames = [50, 100, 150];
let enemyQueue = [];

// functions:
flora.draw();

function handleShooter() {
    shooter.draw();
    shooter.update();
}

function handleProjectile() {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();
    }
}

function handleEnemy() {
    for (let i = 0; i < enemyQueue.length; i++) {
        let current = enemyQueue[i];

        // enemy gets deleted when killed. Otherwise, draw and update them.
        if (!current.delete) {
            current.update();
            current.draw();
        }
    }

    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {
        enemyQueue.push(new Enemy());
    }
}

function collision(bullet, orc) {
    if (
        bullet.x + bullet.size > orc.x &&
        orc.x > sheep1.x + sheep1.width
    ) {
        return true;
    }
}

// FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    flora.draw();
    handleShooter();
    handleProjectile();
    handleEnemy();
    frame++;

    //setTimeout(animate ,15); <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
//animate();
window.requestAnimationFrame(animate);
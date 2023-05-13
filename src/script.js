// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";

// TODO: DELETE bullets once they reach end of screen. Log array of bullets. --DONE
// TODO: reset bullet.x after hitting enemy.    --DONE

// canvas stuff
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);
new InputHandler(shooter);

// variables
let frame = 0;
let randomFrames = [50, 80, 150];
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
        let current = projectiles[i];

        if (current.x < canvas.width - 100) {
            current.update();
            current.draw();
        }
        //else if (i > 0) projectiles.splice(1, 1);
        // remove ALL the items in projectiles array except the first one. Nice. 
        // array NEVER surpasses 8 items. Even better. 

        for (let j = 0; j < enemyQueue.length; j++) {
            if (enemyQueue[j] && projectiles[i] && collision(projectiles[i], enemyQueue[j])) {
                projectiles.splice(i, 1);
                i--;
                enemyQueue.splice(j, 1);
                j--;
            }
        }
        if (projectiles[i] && projectiles[i].x > canvas.width - 100) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

function handleEnemy() {
    for (let i = 0; i < enemyQueue.length; i++) {
        let current = enemyQueue[i];

        // enemy gets deleted when killed. Otherwise, draw and update them.
        // if (!current.delete) {
        //     current.update();
        //     current.draw();
        // }

        if (current.x > 0) {
            current.update();
            current.draw();
        // remove enemy from queue if it supasses 0:
        } else {
            enemyQueue.splice(i, 1);
        }

        // if (!current.delete) {
        //     current.update();
        //     current.draw();
        // }
    }
}

function pushEnemy() {
    // so, if frame == 50 and I get randomFrames[0] (50), enemy gets pushed to queue.
    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {
        enemyQueue.push(new Enemy(canvas.width, flora.y - 50));
    }
}

function collision(bullet, orc) {
    if (bullet.x + bullet.size > orc.x) {
        //orc.delete = true;
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
    pushEnemy();
    frame++;

    //setTimeout(animate ,15); <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
//animate();
window.requestAnimationFrame(animate);
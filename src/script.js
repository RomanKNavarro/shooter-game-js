// 'use strict';

// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import Button from "./button.js";
import Pickup from "./pickup.js";

// canvas stuff
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// PORT: http://127.0.0.1:5500/
// TODO: DELETE bullets once they reach end of screen. Log array of bullets. --DONE
// TODO: reset bullet.x after hitting enemy.    --DONE
// TODO: GET bullets to travel up when "w" is pressed.
// TODO: get game running fast again. Problem not in inputHandler. --DONE  
// TODO: all enemy classes in the same file.
// TODO: add mouse hover stuff in game.js. Mouse input goes in inputHandler. MouseCollision needs to be global --DONE
// TODO: figure out why color picker won't show up when hovering over.
// TODO: add game states.   --DONE 
// TODO: get button clicking to work & mouse position read. --DONE
// TODO: limit enemies, implement win screen.   --DONE
// TODO: make win text fade in and out.
// TODO: stop last enemies from disapearing. --DONE
// TODO: initiate next round on win.    --DONE
// TODO: get enemyCount to increase every round. STOP IT FROM GOING BRRRRR  --DONE
// TODO: when using pistol, keep "shooting" at true. Simply add another bullet when space is released. --DONE (resolved)
// TODO: make enemies drop pickups.     --DONE
// TODO: draw assigned enemy number on their body. --DONE
// TODO: fix this stupid shooting glitch    --DONE    
// TODO: increase enemy speed per round     --DONE
// TODO: make character not able to shoot during menu state     --DONE
// TODO: get more enemies on-screen in later rounds (most of the time it's only 2-4)    --DONE 
// TODO: backwards shooting capability  --DONE
// TODO: crawling enemies   --DONE
// TODO: add ALL enemy types in one class.  --DONE
// TOO: fix diagnal-back shooting glitch
// TODO: victory state --DONE
// TODO: shooting pickups from behind   --DONE  
// TODO: make ground enemies die after two shots if shot at bottom  --DONE
// TODO: FLAMETHROWER   --DONE
// TODO: pick up weapon only if "specialAmmo" is 0  --DONE (resolved)
// TODO: special atrocity round
// TODO: get lodash working again.


// ENEMIES ARE SPAWNED AT THE SAME X. why do they take long to spawn?

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;
let currentRound = 1;

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);
// const shooter = new Shooter(600, flora.y - 50);
new InputHandler(shooter);

// BUTTONS AND TEXT. (x, y, width, text, clickable)
const startButton = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press to Play", true);
const winText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Next round incoming...", false);
const failText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "FAILURE", false);

const scoreText = new Button(canvas.width / 2, 0, 100, score, false);
const roundText = new Button(canvas.width / 3, 0, 100, currentRound, false);

const specialText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "SPECIAL ROUND", false);
const specialText2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "MASSACRE THE CIVILIANS", false);

const endText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "You win", false);
const endText2 = new Button(canvas.width / 2.5, canvas.height / 1.7, 100, "Thanks for playing!!!", false);
const endText3 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Made with ❤️ by", false);
const endText4 = new Button(canvas.width / 2.5, canvas.height / 1.9, 100, "KAVEMANKORPS", false);



// variables
let frame = 0;
// let randomFrames = [50, 80, 110, 150];
let randomFrames = [10, 30, 50, 80, 110,];

// level 1: 8/10 chance to spawn ground enemy. 20% chance to spawn air enemy.
const rounds = Array.from(Array(10).keys());

// determine num. of enemies per round
// ten rounds total. Each one has 1.5 times more enemies than the last.
let roundCounts = [0, 10];
for (let i = 0; i <= 9; i++) {
    roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.5));
}

let enemyQueue = [];
let enemyCount = 3;
let showNextRound = false;
let showNextText = false;


let specialRoundNum = _.sample(_.range(1, 5));
let specialRound = false;

let currentSpeed = 2;

// DROPPED PICKUPS:
let snackQueue = [];

// states: MENU, RUNNING, WIN, LOSE, OVER
let state = "MENU";

let textStream = [endText, endText2, endText3];

// functions:
flora.draw();

function handleStatus() {
    roundText.text = currentRound;
    roundText.draw();
    scoreText.draw();
}

// startButton.stroke property successfully set, but color won't change.
// TODO: use switch case to handle states
function handleState() {
    if (state == "MENU") {  
        startButton.draw();
        // scoreText.draw();

        if (mouseCollision(shooter.mouse, startButton)) {
            startButton.stroke = "red";

            if (shooter.mouse.clicked) {
                state = "RUNNING";
            }
        }
        else {
            startButton.stroke = "black";
        }
    }
    else if (state == "RUNNING") {
        shooter.disabled = false;

        // reset after each round
        showNextRound = false;
        handleEnemy();
        pushEnemy();
    }
    else if (state == "WIN") { 
        // logic for displaying end-round text:
        if (currentRound == 10) {
            state = "END";
        }

        if (currentRound == specialRoundNum) {
            state = "SPECIAL";
        }

        if (!showNextRound) {
            winText.draw();
            setTimeout(() => {
                showNextRound = true;
            }, 1000);
        }
        else {
            nextText.draw();
            setTimeout(() => {
                state = "RUNNING";
                if (score >= winningScore) {
                    cremate();
                }
            }, 1000);
        }
    }
    else if (state == "SPECIAL") {
        shooter.disabled = true;
        if (!showNextText) {
            specialText.draw();
            setTimeout(() => {
                showNextText = true;
            }, 4000);
        } else {
            specialText2.draw();
            specialRound = true;
        }
    }

    else if (state == "END") {
        shooter.disabled = true;

        if (!showNextText) {
            // YOU WIN 
            endText.draw();
            endText2.draw();
            setTimeout(() => {
                showNextText = true;
            }, 4000);
        } else {
            endText3.draw();
            endText4.draw();
        }
    }
}

// increment stuff to make next round slightly harder:
function cremate() {
    currentRound++;
    currentSpeed += 0.5;
    roundCounts.splice(0, 1);
    enemyCount = roundCounts[0];
    winningScore += enemyCount * 10;
}

function handleShooter() {
    shooter.draw();
    shooter.update();
}

// gets all the projectiles in the array and automatically shoots them.
function handleProjectile() {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < projectiles.length; i++) {
        // console.log(projectiles[i].direction)
        let current = projectiles[i];

        if (current.x < canvas.width - 100) {
            current.update();
            current.draw();
        }
        else {
            projectiles.splice(i, 1);
            i--;
            //remove(projectiles, i);
        }

        // enemy kill handling:
        for (let j = 0; j < enemyQueue.length; j++) {
            let currentEnemy = enemyQueue[j];
            /* remove bullet and enemy if they conact eachother. Also make enemy 
            drop pickup if applicable: */ 
            if (enemyQueue[j] && projectiles[i] && collision(projectiles[i], enemyQueue[j])) {

                projectiles.splice(i, 1);
                i--;

                if (shooter.angle == "down" || shooter.angle == "down-back") {
                    currentEnemy.health -= 1;
                } else currentEnemy.health -= 2;
                

                if (currentEnemy.health <= 0) {
                    score += 10;
                    scoreText.text = score;

                    if (currentEnemy.pickup) {
                        snackQueue.push(new Pickup(currentEnemy.x, currentEnemy.y - 100));
                    }
    
                    // here is how the enemies get deleted:
                    enemyQueue.splice(j, 1);
                    j--;
                
                }

                //console.log(snackQueue);
            }
        }

        for (let l = 0; l < snackQueue.length; l++) {
            let snack = snackQueue[l];
            if (snack && projectiles[i] && collision(projectiles[i], snack)) {

                projectiles.splice(i, 1);
                i--;
                // remove(i);

                // SPECIAL WEAPONS HERE:
                // AR STACKING ALLOWED. NO PICKUPS IF WEAPON IS FLAMMEN
                if (shooter.weapon != "flammen") {
                    if (snack.type == "ar") {
                        shooter.weapon = "ar";
                        shooter.fireRate = 10;
                        shooter.specialAmmo = 10;
                    } else {
                        shooter.weapon = "flammen";
                        shooter.fireRate = 2;
                        shooter.specialAmmo = 100;  
                    }
                }

                snackQueue.splice(l, 1);
                l--;
                //remove(snackQueue, l);
            }
        }

        // remove bullets if they exceed canvas width:
        // OVERHAUL THIS COMPLETELY:
        // if ((projectiles[i] && projectiles[i].x > canvas.width - 100) ||
        // (shooter.weapon == "flammen" && projectiles[i] && projectiles[i].x > canvas.width - 10)) {
        //     projectiles.splice(i, 1);
        //     i--;
        // }

        if (projectiles[i]) {
            if ((projectiles[i].x > canvas.width - 100 || projectiles[i].x < 0 || projectiles[i].y < 0)
            || (shooter.weapon == "flammen" && (projectiles[i].x > canvas.width - 400 
            || projectiles[i].x < 0 || projectiles[i].y < 0))) {
                projectiles.splice(i, 1);
                i--;
            }
        }
    }
}

// let weapons = {"ar": {"rate": 10, "ammo": 10}, "flammen": {"rate": 0, "ammo": 15}};

// SNACK HANDLING
function handleSnack() {
    for (let i = 0; i < snackQueue.length; i++) {
        let snack = snackQueue[i];
        snack.draw();

        // drop until it touches the floor
        if (snack.y + snack.height < flora.y - 5) {
            snack.update();
        }
    }
}

function handleEnemy() {
    for (let i = 0; i < enemyQueue.length; i++) {
        let current = enemyQueue[i];

        if (current.type != "ground")  current.health = 1;


        // DETERMINE ENEMY Y AXIS BASED ON THEIR TYPE
        if (current.type == "ground" || current.type == "crawl") {
            current.y = flora.y - current.height;
        } else {
            current.y = flora.y - 150;
        }

        if (current.x + current.width > 0) {
            current.update();
            current.draw();
        }
        // remove enemy from queue if it supasses coord 0:
         else {
            enemyQueue.splice(i, 1);
            score += 10;
        }
    }
}

function pushEnemy() {
    // so, if frame == 50 and I get randomFrames[0] (50), enemy gets pushed to queue.

    // RANDOMFRAMES determines distances between enemies
    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {
        let chance = Math.floor(Math.random() * 10);

        if (enemyCount > 0) {     
            enemyQueue.push(new Enemy(canvas.width, currentSpeed));
            enemyCount--;     
        }

        else if (enemyQueue.length == 0) {
            state = "WIN";
        }
    }
}

// collission successful.
function collision(bullet, orc) {
    if (
        // straight ahead
        bullet.x + bullet.size > orc.x && 
        // forgot
        bullet.y + bullet.size >= orc.y && 
        // shoot at flying enemies
        bullet.y + bullet.size <= orc.y + orc.height 
        // collision only occurs in enemy is in front of player
        && orc.x > shooter.x 
        // BACKWARDS SHOOTING:
        || (bullet.x <= orc.x + orc.width && 
            bullet.x >= orc.x &&
            bullet.y > orc.y && 
            bullet.y < orc.y + orc.width &&
            (bullet.y < orc.y + orc.height))
    ) {
        return true;
    }
    //else return false;
}

// used to determine if the mouse is inside a given button. (mouse, button)
function mouseCollision(first, second) {
    if (
      first.x >= second.x &&
      first.x <= second.x + second.width &&
      first.y >= second.y &&
      first.y <= second.y + second.height
    ) {
      return true;
    }
  }

// FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    cxt.fillStyle = "white";
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    flora.draw();
    handleShooter();
    handleProjectile();
    handleSnack()
    handleState();

    if (state != "MENU") handleStatus();

    // console.log(`enemyCount: ${enemyCount}
    // score: ${score}
    // winningScore: ${winningScore}
    // currentRound: ${currentRound}
    // currentSpeed: ${currentSpeed}
    // enemyQueue: ${enemyQueue}`);
    
    //console.log(shooter.projectiles);

    frame++;


    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
// animate();
window.requestAnimationFrame(animate);
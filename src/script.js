'use strict';

// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import AirEnemy from "./enemy.js";
import Button from "./button.js";

// canvas stuff
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

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
// TODO: when using pistol, keep "shooting" at true. Simply add another bullet when space is released. 

// REVELATION: WINNINGSCORE ONLY GOES UP IF ENEMIES ARE MANUALLY KILLED

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);

// SIGNATURE: x, y, width, text, clickable.
const startButton = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press to Play", true);
const winText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Next round incoming...", false);

// why won't score update? b/c It is an obj created with whatever text was given at 
// the start.
const scoreText = new Button(canvas.width / 2, 0, 100, score, false);

new InputHandler(shooter);
// const input = new InputHandler(shooter);

// variables
let frame = 0;
let randomFrames = [50, 110, 150];

// level 1: 8/10 chance to spawn ground enemy. 20% chance to spawn air enemy.
const rounds = Array.from(Array(10).keys());

let roundCounts = [0, 10];
for (let i = 0; i <= 9; i++) {
    roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.5));
}

let theOdds = 8;
let enemyQueue = [];
let enemyCount = 3;
let currentRound = 1;
let showNextRound = false;

// states: MENU, RUNNING, WIN, LOSE, OVER
let state = "MENU";

// functions:
flora.draw();

// startButton.stroke property successfully set, but color won't change.
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
        scoreText.draw();
        showNextRound = false;
        handleEnemy();
        pushEnemy();
    }
    else if (state == "WIN") { 
        // cremate();

        // logic for displaying end-round text:
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
}

function handleStats() {
    if (score >= winningScore) {
        cremate();
    }
}

// increment stuff to make next round slightly harder:
function cremate() {
    currentRound++;
    //enemyCount *= currentRound;
    roundCounts.splice(0, 1);
    enemyCount = roundCounts[0];
    winningScore += enemyCount * 10;
}

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

        for (let j = 0; j < enemyQueue.length; j++) {
            // remove bullet and enemy if they conact eachother:
            if (enemyQueue[j] && projectiles[i] && collision(projectiles[i], enemyQueue[j])) {
                score += 10;
                scoreText.text = score;

                projectiles.splice(i, 1);
                i--;
                enemyQueue.splice(j, 1);
                j--;
            }
        }
        // remove bullets if they exceed canvas width:
        if (projectiles[i] && projectiles[i].x > canvas.width - 100) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

function handleEnemy() {
    for (let i = 0; i < enemyQueue.length; i++) {
        let current = enemyQueue[i];

        if (current.x > 0) {
            current.update();
            current.draw();
        // remove enemy from queue if it supasses coord 0:
        } else {
            enemyQueue.splice(i, 1);
            score += 10;
        }
    }
}

function pushEnemy() {
    // so, if frame == 50 and I get randomFrames[0] (50), enemy gets pushed to queue.

    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {
        let chance = Math.floor(Math.random() * 10)

        if (enemyCount > 0) {
            if (chance < theOdds) {         
                enemyQueue.push(new Enemy(canvas.width, flora.y - 50));  
                enemyCount--;             
            }
            else {
                enemyQueue.push(new AirEnemy(canvas.width, flora.y - 150));
                enemyCount--;
            }
            
        }
        else if (enemyQueue.length == 0) {
            state = "WIN";
        }
    }
}

// collission successful.
function collision(bullet, orc) {
    if (bullet.x + bullet.size > orc.x && bullet.y + bullet.size >= orc.y 
        && bullet.y + bullet.size <= orc.y + orc.height) {
        return true;
    }
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
    handleState();

    //     console.log(`enemyCount: ${enemyCount}
    // score: ${score}
    // winningScore: ${winningScore}
    // currentRound: ${currentRound}
    // current Round count: ${roundCounts}`);

    frame++;


    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
// animate();
window.requestAnimationFrame(animate);
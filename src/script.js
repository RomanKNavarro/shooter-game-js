// 'use strict';

// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import Button from "./button.js";
import Pickup from "./pickup.js";
import TextWall from "./textWall.js";

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
// TODO: special atrocity round     --DONE
// TODO: get lodash working again.  --DONE
// TODO: fix flammen top hit collision. --DONE  
// TODO: drop current weapon with q     --DONE
// TODO: add second "special" round
// TODO: make flammen hurt crawlies too --DONE
// TODO: FIX THIS STUPID MENU GLITCH    --DONE
// TODO: get stats and player weapon to reset on game over
// TODO: get sick font
// TODO: brief delay before spawning round 1 enemies.   --DONE
// TODO: frontal player/enemy collision game over.
/* TODO: Make enemies shoot at player once they reach a certain distance. 3 enemies can shoot at you 
         at any given time. The rest pass by. 
*/

// determine num. of enemies per round
// ten rounds total. Each one has 1.5 times more enemies than the last.
// let roundCounts = [0, 10];
let roundCounts = [3, 10];
for (let i = 0; i <= 9; i++) {
    roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.5));
}

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;
let currentRound = 1;

// enemyCount determines num of enemies to add to array. It decrements as they spawn
let enemyCount = roundCounts[0];

// might need further tweaking:
let enemiesLeft = roundCounts[0];

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);
// const shooter = new Shooter(600, flora.y - 50);
new InputHandler(shooter);

// BUTTONS AND TEXT. (x, y, width, text, clickable)
const startButton = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Initiate Bloodbath", true);
const startButton2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "test lolol", true);

const winText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Next round incoming...", false);
const failText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "FAILURE", false);

const enemyText = new Button(canvas.width / 2.45, 0, 100, enemiesLeft, false);
const roundText = new Button(canvas.width / 3, 0, 100, currentRound, false);
const scoreText = new Button(canvas.width / 2, 0, 100, score, false);

const specialText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "SPECIAL ROUND", false);
const specialText2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "MASSACRE THE CIVILIANS", false);

const endText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "You win", false);
const endText2 = new Button(canvas.width / 2.5, canvas.height / 1.7, 100, "Thanks for playing!!!", false);
const endText3 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Made with ❤️ by", false);
const endText4 = new Button(canvas.width / 2.5, canvas.height / 1.9, 100, "KAVEMANKORPS", false);

const bossText = new TextWall(
`Satellite imagery has exposed your horriffic atrocities in the city to the rest of the world,\n
prompting international outcry and the formation of a Sheep-led coalition against you.\n
\n
This is it! Destroy the coalition and the city is yours. Will you give up now and turn yourself\n
in for war crimes, or will you defend the city to your last dying breath lest your efforts so far\n
be in vain?`, canvas.height / 5);

const startText = new TextWall(
    `You are Lieutenant Warren Kilgore, the last remaining invader in Swinemanland. The very land of your\n
    eternal arch-nemesis. The armestice between the Sheep and the Swinemen had been signed days before,\n 
    but you refuse to return to the boring old civilian life at whatever cost. Even though all of your men\n
    have deserted you, you refuse to give up the the strategic city of Vonn, the crown jewel of Swineman\n 
    "civilization".\n 
    It is now your undisputed domain, your very own kingdom, and everyone in it mere flesh-logs. They are\n
    your servants, ready to serve your every depraved fantasy at any given moment. The city of Vonn took\n 
    months of gruesome house-to-house fighting and thousands of Sheep lives to completely conquer. Are you\n
    going to let it all slip now?`, canvas.height / 10);

const skipButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "skip", true);
const yesButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);
const noButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);

// variables
let frame = 0;
// let randomFrames = [50, 80, 110, 150];
let randomFrames = [10, 30, 50, 80, 110,];

// level 1: 8/10 chance to spawn ground enemy. 20% chance to spawn air enemy.
const rounds = Array.from(Array(10).keys());

let enemyQueue = [];
let showNextRound = false;
let showNextText = false;
let showSpecialText = false;

// let specialRoundNum = _.sample(_.range(1, 3));
let specialRoundNum = 1;
let specialRound = false;
let showMenu = false;
let startRound = false;

let currentSpeed = 2;

// DROPPED PICKUPS:
let snackQueue = [];

// states: MENU, RUNNING, WIN, LOSE, BOSS, OVER
// let state = "MENU";
let state = "INTRO";

// functions:
flora.draw();

function handleStatus() {
    roundText.text = currentRound;
    //enemyText.text = enemyCount;
    enemyText.text = enemiesLeft;
    enemyText.draw();
    roundText.draw();
    scoreText.draw();
}

// states: MENU, RUNNING, WIN, SPECIAL, BOSS, END, LOSE.
// startButton.stroke property successfully set, but color won't change.
// TODO: use switch case to handle states
function handleState() {
    switch(state) {
        // GLITCH SOMEWHERE IN INTRO:
        case "INTRO":
            startText.draw();

            skipButton.draw();
            mouseCollision(shooter.mouse, skipButton, "MENU");

            setTimeout(() => {
                showMenu = true;
                if (score >= winningScore) {
                    cremate();
                }
            }, 30000);

            if (showMenu) state = "MENU";
            break;

        // glitch: MENU -> RUNNING -> MENU
        case "MENU": 
            // bossText.draw();
            startButton.draw();

            if (score >= winningScore) {
                cremate();
            }

            shooter.weapon = "pistol";
            shooter.fireRate = 0;
            mouseCollision(shooter.mouse, startButton, "RUNNING");
            break;

        // glitch: running -> win -> boss (endless)
        case "BOSS":
            bossText.draw();
            yesButton.draw();
            noButton.draw();
    
            if (score >= winningScore) {
                cremate();
            }
    
            mouseCollision(shooter.mouse, yesButton, "RUNNING");
            mouseCollision(shooter.mouse, noButton, "MENU");
            break;
    
        case "RUNNING":
            // state = "RUNNING";
            shooter.disabled = false;
    

            if (currentRound == 1) {
                setTimeout(() => {
                    startRound = true
                }, 2000);
            }

            // reset after each round
            if (startRound) {
                showNextRound = false;
                handleEnemy();
                pushEnemy();
            }
            break;
        
        case "WIN": 
            specialRound = false;
    
            // special round cases:
            let specRounds = {1: "SPECIAL", 3: "BOSS", 10: "END"};
            if (Object.keys(specRounds).includes(currentRound.toString())) {
                state = specRounds[currentRound];
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
            break;

        case "SPECIAL":
            //shooter.disabled = true;
            specialRound = true;
    
            if (!showSpecialText) {
                specialText.draw();
                setTimeout(() => {
                    showSpecialText = true;
                }, 1000);
            } else { 
                specialText2.draw();
                setTimeout(() => {
                    state = "RUNNING";
                    if (score >= winningScore) {
                        cremate();
                    }
                }, 1000);
            }
            break;

        case "END":
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
            break;
    }
}

// increment stuff to make next round slightly harder:
function cremate() {
    currentRound++;
    currentSpeed += 0.5;
    roundCounts.splice(0, 1);
    enemyCount = enemiesLeft = roundCounts[0];
    winningScore += enemyCount * 10;
    //enemiesLeft = roundCounts[0];
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

        // increase size of flammen "bullets"
        if (shooter.weapon == "flammen") current.size = 15;

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

                    enemiesLeft--;
                }
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
        // OVERHAUL THIS COMPLETELY: --DONE
        // if ((projectiles[i] && projectiles[i].x > canvas.width - 100) ||
        // (shooter.weapon == "flammen" && projectiles[i] && projectiles[i].x > canvas.width - 10)) {
        //     projectiles.splice(i, 1);
        //     i--;
        // }

        // projectiles despawn logic:
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

        if (current.type != "ground") current.health = 1;

        // DETERMINE ENEMY Y AXIS BASED ON THEIR TYPE
        if (current.type == "ground" || current.type == "crawl") {
            current.y = flora.y - current.height;
        } else {
            current.y = flora.y - 150;
        }

        // FIX THIS CRAP --DONE. Takes into account both regular and special rounds:
        if ((current.x + current.width > 0) && (current.x < canvas.width + 50)) {
            console.log(enemyQueue);
            current.update();
            current.draw();
        } else {
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
            if (!specialRound) {
                enemyQueue.push(new Enemy(canvas.width, currentSpeed));
                enemyCount--;  
            }  else {
                if (enemyCount > 0) {
                    enemyQueue.push(new Enemy(0, -currentSpeed));
                    enemyCount--; 
                }
                else specialRound = false;
            }
        }

        else if (enemyQueue.length == 0) {
            state = "WIN";
        }
    }
}

// collission successful.
function collision(bullet, orc) {
    if (
        // BACKWARDS SHOOTING:
        //  for forward ground and air (ensure bullet is inbetween x and width)
        (bullet.x + bullet.size >= orc.x && bullet.x <= orc.x + orc.width &&
        bullet.y + bullet.size >= orc.y && bullet.y <= orc.y + orc.height)
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
function mouseCollision(first, second, nextState) {
    if (
      first.x >= second.x &&
      first.x <= second.x + second.width &&
      first.y >= second.y &&
      first.y <= second.y + second.height
    ) {
        second.stroke = "red";
        if (first.clicked) {
            state = nextState;
        }
    } else {
        second.stroke = "black";
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

    // console.log(`specialRound: ${specialRound}
    // enemyQueue: ${enemyQueue}`);
    
    //console.log(enemyQueue);
    // console.log(state);

    frame++;


    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
// animate();
window.requestAnimationFrame(animate);
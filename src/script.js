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
/* TODO: Make enemies shoot at player once they reach a certain distance. 3 enemies can shoot at you   --DONE
         at any given time. The rest pass by.       
*/
// TODO: empty pickup array on restart  --DONE
// TODO: get enemies to shoot. Keep their "projectiles" array from growing too much --DONE
// TODO: fix civie crap     --DONE
// TODO: stop airs from stopping after killing air shooter  --DONE
/* TODO: get civies to spawn in boss round (GET BOTH TROOPS AND CIVIES TO SPAWN SIMULTANEOUSLY)     --DONE
    will need to create seperate "civieQueue" it seems...*/    
// TODO: ADD PLAYER HEALTH
// TODO: fix gun shot audio
// TODO: stupid glitch: multiple enemies stopping at the same position.                             --DONE
/* figured it out: every time I kill an enemy in the kill zone, enemies immediately preceding it stop*/ 

// determine num. of enemies per round
// ten rounds total. Each one has 1.5 times more enemies than the last.
// let roundCounts = [0, 10];

// THIS WILL BE A PROBLEM WHEN RESETING. ARRAY GETS MUTATED EVERY ROUND:
let roundCounts = [3, 10];

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;
let currentRound = 1;

// enemyCount determines num of enemies to add to array. It decrements as they spawn
let enemyCount = roundCounts[0];

// used to show current enemies remaining:
let enemiesLeft = roundCounts[0];

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);
// const shooter = new Shooter(600, flora.y - 50);
new InputHandler(shooter);

// BUTTONS AND TEXT. (x, y, width, text, clickable)
const startButton = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Initiate Bloodbath", true);
const skipButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "skip", true);
const yesButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);
const noButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);
const playAgainButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Play again?", true);

const winText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Next round incoming...", false);
const failText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "FAILURE", false);

// UI
const enemyText = new Button(canvas.width / 2.45, 0, 100, enemiesLeft, false);
const roundText = new Button(canvas.width / 3, 0, 100, currentRound, false);
const scoreText = new Button(canvas.width / 2, 0, 100, score, false);

const specialText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "SPECIAL ROUND", false);
const specialText2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "MASSACRE THE CIVILIANS", false);

const endText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Coalition defeated. City aquired.", false);
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
    but you reject returning to the boring old civilian life at whatever cost. Even though all of your men\n
    have deserted you, you refuse to give up the the strategic city of Vonn, the crown jewel of Swineman\n 
    "civilization".\n 
    It is now your undisputed domain, your very own kingdom, and everyone in it mere flesh-logs. They are\n
    your servants, ready to satisfy your every depraved fantasy at any given moment. The city of Vonn took\n 
    months of gruesome house-to-house fighting and thousands of Sheep lives to completely conquer. Are you\n
    going to let it all slip now?`, canvas.height / 10);

const giveupText = new TextWall(
    `You spare your fellow countrysheep and turn yourself in.\n
    \n
    The war crimes tribunal accuses you of innumerable atrocities, the charges of which are beyond the scope of this game.\n 
    \n
    You are put to the firing squad and your ashes thrown into the ocean.`, canvas.height / 5);

// variables
let frame = 0;
// let randomFrames = [50, 80, 110, 150];
let randomFrames = [10, 30, 50, 80, 110,];

// level 1: 8/10 chance to spawn ground enemy. 20% chance to spawn air enemy.
const rounds = Array.from(Array(10).keys());

let enemyQueue = [];
let civieQueue = [];

// stupid timer vars:
let specialRoundNum = _.sample(_.range(3, 6));
let specialRound = false;
let showNextRound = false;
let showNextText = false;
let showSpecialText = false;
let showMenu = false;
let startRound = false;

let finalRound = false;

// ENEMY SHOOTING STUFF:
// possible glitch fix: add "id" property
// NO MORE THAN 4 ENEMIES SHOULD BE SHOOTING.
let baddiePositions = {
    "1": {"inPos": false, "distance": 50, "type": "ground"}, 
    "2": {"inPos": false, "distance": 150, "type": "ground"}, 
    "3": {"inPos": false, "distance": 250, "type": "ground"},
    "4": {"inPos": false, "distance": 180, "type": "air"}
};

// ENEMY SPEED:
// let currentSpeed = 2;
let currentSpeed = 20;

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

function greatReset() {
    score = 0;
    scoreText.text = score;
    enemyCount = enemiesLeft = roundCounts[0];

    winningScore = 30;
    currentRound = 1;
    shooter.weapon = "pistol";
    shooter.fireRate = 0;
    shooter.specialAmmo = 0;
    // roundCounts = [3, 10];
    roundCounts = [3, 10];
    for (let i = 0; i <= 9; i++) {
        roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.5));
    }

    snackQueue = [];
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

            // FIX THIS CRAP:   ---DONE
            // REMEMBER TO UNCOMMENT THIS:
            greatReset();
            mouseCollision(shooter.mouse, startButton, "RUNNING");
            break;

        // this state is only for the boss text:
        case "BOSS":
            finalRound = true;
            bossText.draw();
            yesButton.draw();
            noButton.draw();
    
            if (score >= winningScore) {
                cremate();
            }
    
            mouseCollision(shooter.mouse, yesButton, "RUNNING");
            mouseCollision(shooter.mouse, noButton, "GIVEUP");
            break;
    
        case "RUNNING":
            // state = "RUNNING";
            shooter.disabled = false;
    

            if (currentRound == 1) {
                setTimeout(() => {
                    startRound = true
                }, 1000);
            }

            // reset after each round
            if (startRound) {
                showNextRound = false;
                handleEnemy();
                pushEnemy();
            }

            // if (currentRound == 2) {
            //     specialRound = true;
            // }

            break;
        
        case "WIN": 
            specialRound = false;
    
            // special round cases:
            let specRounds = {5: "SPECIAL", 1: "BOSS", 10: "END"};
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

        case "GIVEUP":
            shooter.disabled = true;
            giveupText.draw();
            playAgainButton.draw();

            mouseCollision(shooter.mouse, playAgainButton, "MENU");
    }
}

// increment stuff to make next round slightly harder:
function cremate() {
    currentRound++;
    currentSpeed += 0.5;
    roundCounts.splice(0, 1);
    enemyCount = enemiesLeft = roundCounts[0];
    winningScore += enemyCount * 10;
}

function handleShooter() {
    shooter.draw();
    shooter.update();
}

function handleEnemyProjectiles(orc) {
    let projectiles = orc.projectiles;

    for (let i = 0; i < projectiles.length; i++) {
        let current = projectiles[i];
        

        if (current.x > shooter.x + shooter.width || current.x > 0) {
            current.update();
            current.draw();
        }
        else {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

function handleProjectile() {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < projectiles.length; i++) {
        // console.log(projectiles[i].direction)
        let current = projectiles[i];

        // increase size of flammen "bullets"
        if (shooter.weapon == "flammen") current.size = 15;

        if (current.x < canvas.width - 100 && state == "RUNNING") {
            current.update();
            current.draw();
        }
        else {
            projectiles.splice(i, 1);
            i--;
        }

        // enemy kill handling:
        for (let j = 0; j < enemyQueue.length; j++) {
            let currentEnemy = enemyQueue[j];
            /* remove bullet and enemy if they contact eachother. Also make enemy 
            drop pickup if applicable: */ 
            if (enemyQueue[j] && projectiles[i] && collision(projectiles[i], enemyQueue[j])) {

                current.delete = true;
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

                    // RESET ENEMY POS'S every time an enemy is killed:
                    // FIX THIS CRAP:
                    // for (let p = 1; p <= Object.keys(baddiePositions).length; p++) { 
                    //     baddiePositions[p.toString()]["inPos"] = false;
                    // }


                    // TO TEST:
                    // ["1", "2", "3", "4"]
                    // for (let p = 0; p < Object.keys(baddiePositions).length; p++) { 
                    //     // baddiePositions[p.toString()]["inPos"] = false;
                    //     if (currentEnemy.position == Object.keys(baddiePositions)[p]) {
                    //         baddiePositions[(p + 1).toString()]["inPos"] = false;
                    //     }
                    // }

                    if (Object.keys(baddiePositions).includes(currentEnemy.position)) {
                        baddiePositions[currentEnemy.position]["inPos"] = false;
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
                        shooter.fireRate = 15;
                        shooter.specialAmmo = 100;
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

        // HERE'S HOW WE DISCRIMINATE CIVIES:
        if (current.speed < 0) current.isCivie = true;

        // if (finalRound && i % 3 == 0) {
        //     current.isCivie = true;
        // }


        // spawn civies in last round, but only if 20 < e < 50. Every third enemy spawned is civie:
        // if ((enemiesLeft < 20 && enemiesLeft > 5) && i % 3 == 0 && currentRound == 3) {
        //     current.isCivie = true;
        // }

        // ALL enemies given civie status on specialRound
        if (specialRound) current.isCivie = true;

        handleEnemyProjectiles(current);

        // DETERMINE ENEMY Y AXIS BASED ON THEIR TYPE
        if (current.type == "ground" || current.type == "crawl") {
            current.y = flora.y - current.height;
            current.angle = "back";
        } else {
            current.y = flora.y - 150;
            current.angle = "down-diagnal";
        }

        // FIX THIS CRAP --DONE. Takes into account both regular and special rounds:
        if ((current.x + current.width > 0) && (current.x < canvas.width + 50) && !current.delete) {
            //console.log(enemyQueue);
            current.update();
            current.draw();
        } else {
            enemyQueue.splice(i, 1);
            score += 10;
            current.delete;
        }

        // FIX THIS CRAP ASAP:  --DONE
        // FIX THIS STUPID GLITCH:
        for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {   
            // this is the distance applicable to enemy (50, 150, 250, 180 (aerial))
            let trueDistance = shooter.x + shooter.width + baddiePositions[i.toString()]["distance"];
            if (!baddiePositions[i.toString()]["inPos"] &&

                // what was my thought process behind this?
                current.x < trueDistance &&
                current.x > trueDistance - current.width  &&


                current.type == baddiePositions[i.toString()]["type"] && 
                !specialRound &&
                current.speed > 0) {
                    // enemy stops moving at shooting (enemy class logic)
                    current.shooting = true; 
                    baddiePositions[i.toString()]["inPos"] = true;
                    current.position = i.toString();
            }
        }
    }
}
// IDEA TO DETERMINE IF ENEMY IS A CIVIE: IF IT'S SPEED IS NEGATIVE
function pushEnemy() {
    // so, if frame == 50 and I get randomFrames[0] (50), enemy gets pushed to queue.

    // RANDOMFRAMES determines distances between enemies
    if (frame % randomFrames[Math.floor(Math.random() * randomFrames.length)] === 0) {
        
        if (enemyCount > 0) {   
            if (!specialRound) {
                enemyQueue.push(new Enemy(canvas.width, currentSpeed));
                enemyCount--;  

                // SPAWN CIVIES IN LATTER PART OF FINAL ROUND:
                if (finalRound && enemyCount % 3 == 0 && (enemyCount < 20 && enemyCount > 10)) {
                    enemyQueue.push(new Enemy(0, -currentSpeed));
                    enemyCount--; 
                }
            }  
            else {
                // CIVIES SPAWNED HERE IN SPECIAL ROUND:
                // DOESN'T ACTUALLY SPAWN CIVIES. Just normal enemies at coord 0 lol:
                // REMEMBER: enemyCount only refers to num. of enemies to push to array :)
                if (enemyCount > 0) {
                    enemyQueue.push(new Enemy(0, -currentSpeed));
                    enemyCount--; 

                    // if (enemyCount < 50 && enemyCount < 20) {
                    //     civieQueue.push
                    // }
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
    
    // if (state == "RUNNING") {
    //     console.log(baddiePositions);
    // };
    

    frame++;


    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
// animate();
window.requestAnimationFrame(animate);
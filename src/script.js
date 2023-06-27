// 'use strict';

// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import Button from "./button.js";
import Pickup from "./pickup.js";
import TextWall from "./textWall.js";
import Health from "./health.js";
import Grenade from "./grenade.js";

// canvas stuff
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d", { alpha: false });
canvas.style.width=canvas.getBoundingClientRect().width;//actual width of canvas
canvas.style.height=canvas.getBoundingClientRect().height;//actual height of canvas

// var canvas2 = document.getElementById("canvas1");
// var cxt2 = canvas2.getContext("2d", { alpha: false });
// canvas2.style.width=canvas.getBoundingClientRect().width;//actual width of canvas
// canvas2.style.height=canvas.getBoundingClientRect().height;//actual height of canvas

// PORT: http://127.0.0.1:5500/
// TEXTWALL FONT DEFINED IN TEXTWALL.JS
/* TIPS FOR OPTIMIZATION:
    1. use integers instead of floating-points
    2.  */
// TODO: DELETE bullets once they reach end of screen. Log array of bullets. --DONE
// TODO: reset bullet.x after hitting enemy.    --DONE
// TODO: GET bullets to travel up when "w" is pressed.  --DONE
// TODO: get game running fast again. Problem not in inputHandler. --DONE  
// TODO: all enemy classes in the same file.    --DONE (resolved)
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
// TOO: fix diagnal-back shooting glitch    --DONE  
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
// TODO: ADD PLAYER HEALTH      --DONE
// TODO: fix gun shot audio     --DONE
// TODO: stupid glitch: multiple enemies stopping at the same position.                             --DONE
/* figured it out: every time I kill an enemy in the kill zone, enemies immediately preceding it stop*/ 
// TODO: keep specialAmmo from depleting inbetween rounds   --DONE
// TODO: get player health to deplete on getting hurt   --DONE
// TODO: flamethrower sound
// TODO: make dogs hurt player  --DONE
// TODO: fix play again button on failure       --DONE
// TODO: implement health pickup functionality  --DONE
// TODO: reset baddiePositions on new game      --DONE
// TODO: shooting during round break possible   --DONE
// TODO: make flammen one shot one kill         --DONE
// TODO: as levels progress, pickups become more common
// TODO: add instructions at the beginning
// TODO: make flammen destroy bullets       --DONE
// TODO: grenade pickup                     --DONE
// TODO: FIX THIS STUPID GLITCH. health/wall pickup gives player flamethrower.  --DONE
// TODO: get grenades to kill enemies   --DONE
// TODO: add delay to grenade, include throw "animation" and bloop  --DONE
// TODO: further fix grenade collision. fix delay bug   --DONE
// TODO: fix bullet collision --DONE
// TODO: add pre-intro "loading" state  --DONE
// TODO: on round 9 (YES), baddiePositions stop functioning. Specifically, air and last ground
// TODO: learn about and implement better audio practices (too many audio files sound like crap)    --DONE
// TODO: get more civvies to spawn in boss round
// TODO: higher enemy density in boss round
// TODO: more random loading screen times   --DONE
// TODO: add play button as soon as "loading" ends. Initiate music. --DONE
// TODO: more nade explosion sounds    
// TODO: fix nade sounds (I need them to overlap)   --DONE
/* TODO: FIX THIS STUPID ERROR (ONLY GET IT ON LAST ROUND):
Uncaught TypeError: Cannot read properties of undefined (reading 'x')
    at collision (script.js:916:17)
    at handleProjectile (script.js:695:76)
    at animate (script.js:960:5)
    ONLY GET ERROR WHEN USING FLAMMEN
*/
// TODO: nadesNumber default should be 0. Nades av. on round 3. flammen only available after round 5. --DONE (resolved)
// TODO: add sound fx on pickups    --DONE
// TODO: make music louder  --DONE
// TODO: add brief pause before boss round.     --DONE
// TODO: add end-music and credits screen (make it cheeky)
// TODO: add bomber and sheep soldier enemy types
// TODO: add SECOND shooter             --DONE
// TODO: ducking down functionality     --DONE
// TODO: make special enemy types appear only after specific rounds         --DONE
// TODO: get civy dogs/airplanes to spawn.      --DONE
// TODO: ui showing special weapon and ammo (no ui for pistol)              --DONE
// TODO: no ducking during relief phase     --DONE
// TODO: baddiePositions last 2 positions stop working on round 10. Fix.    
// TODO: add delay before enemies start shooting.       --DONE
// TODO: add delay after last round before "coalition defeated" message. Add victory music.
// TODO: option to turn off music in menu (plus ui icon!)
// TODO: tutorial state w/ multiple sections
// TODO: try drawing projectiles on a seperate canvas (for optimization)    --DONE

let roundCounts = [3, 10];
// single, triple, two shooters, ar hoarde (grounds and a few airs), grenade hoarde, civies (pows)

// NEW SCORE STUFF:
let score = 0;
let winningScore = 30;
let currentRound = 1;

// enemyCount determines num of enemies to add to array. It decrements as they spawn
let enemyCount = roundCounts[0];
// let tutCount = tutCounts[0];

// used to show current enemies remaining:
let enemiesLeft = roundCounts[0];

// objects
const flora = new Floor();
const shooter = new Shooter(100, flora.y - 50);

//  NEEDS TO START OFF SCREEN, then walk over to position 200:
// const shooter2 = new Shooter(200, flora.y - 50);
const shooter2 = new Shooter(0 - shooter.width, flora.y - 50);
shooter2.isSecond = true;

new InputHandler(shooter);
new InputHandler(shooter2);

// BUTTONS AND TEXT. (x, y, width, text, clickable)
const tutButton = new Button(canvas.width / 2.2, canvas.height / 2.5, 100, "Start Tutorial", true);
// skip tut. button necessary -don't want to force players to kill POWS. 
// const skipTutButton = new Button(canvas.width / 2.2, canvas.height / 2.5, 100, "Skip", true);
const playButton = new Button(canvas.width / 2.2, canvas.height / 2.5, 100, "Play", true);
const startButton = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Initiate Bloodbath", true);
const skipButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "skip", true);
const yesButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);
const noButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);
const playAgainButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Play again?", true);
const creditsButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "READ ME", true);

const playAgainButton2 = new Button(canvas.width / 2.5, canvas.height / 2, 100, "test test", true);

const winText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Round Complete", false);
const nextText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Next round incoming...", false);

const failText = new Button(canvas.width / 2.5, canvas.height / 4.5, 100, "FAILURE", false);
const healthText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "You perished in the heat of battle.", false);
const wallText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "Too many enemies have broken through.", false);

// UI
const enemyText = new Button(canvas.width / 2.45, 0, 100, enemiesLeft, false);
const roundText = new Button(canvas.width / 3, 0, 100, currentRound, false);
const scoreText = new Button(canvas.width / 2, 0, 100, score, false);
const ammoText = new Button(canvas.width - 100, 0, 100, shooter.specialAmmo, false);

const specialText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "SPECIAL ROUND", false);
const specialText2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "MASSACRE THE CIVILIANS", false);

const endText = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Coalition defeated. City aquired.", false);
const endText2 = new Button(canvas.width / 2.5, canvas.height / 1.7, 100, "Thanks for playing!!!", false);
const endText3 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Made with ❤️ by", false);
const endText4 = new Button(canvas.width / 2.5, canvas.height / 1.9, 100, "KAVEMANKORPS", false);

const quietText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "KILL KILL KILL KILL", false);
const aidText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "HELP HAS ARRIVED", false);

// TUTORIAL CRAP:
// BRUTAL IDEA: live captured enemies used as practice
// YES, player can take damage/die in tutorial
// 3 static grounds
const tt1 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press Space to shoot", false);
// static grounds and airs:
const tt2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Use WASD to aim in different directions", false);
// 3 living ground enemies that shoot. Player shooting DISABLED:
const tt3 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press D to duck", false);
// player shooting ENABLED:
const tt4 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Shooting while ducking only inflicts", false);
const tt4_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "half the damage to enemies", false);
// No targets. Shooting DISABLED:
const tt5 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Well done soldier.", false);
const tt5_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "You are ready for advanced weapon handling.", false);

const tt6 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "shoot while ducking to acquire pickups", false);
// horde of live enemies ensues. 
const tt7 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "press E to throw a grenade", false);

const tt8 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "press E twice in rapid succession", false);
const tt8_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "for a grenade barrage", false);

// these pows will be civies!
const tt9 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Massacre the remaining POWs", false);

const tt10 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "You're a natural born killer!", false);

const tt11 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Excellent work, Leuitenant.", false);
const tt11_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Time to get to work.", false);

let tutCounts = [1, 3, 2, 10, 15, 20];
// NO END TEXT, only beginning text.
// if player dies in tutorial, don't completely reset, just redo current phase.
// fulfilled becomes true when all objectives for current phase have been met.
let tutPhases = { 
    1: {text: tt1, count: 1, fulfilled: false},                         // 1 static
    2: {text: tt2, count: 3, fulfilled: false},                         // 1 ground, 1 air, 1 bomber (statics)
    3: {text: [[tt3], [tt4, tt4_2]], count: 2, fulfilled: false},       // 2 ground shooters
    4: {text: [[tt5, tt5_2], [tt6]], count: 10, fulfilled: false},      // ar pickup. Once picked up, 10 shooters
    5: {text: [[tt7], [tt8, tt8_2]], count: 3, fulfilled: false},       // nade. 3 statics (2 ground, 1 air)
    6: {text: tt9, count: 20, fulfilled: false},                        // nade barrage. MANY statics.
    7: {text: [[tt10], [tt11, tt11_2]], count: 0, fulfilled: false}     // 20 civvies
};

// function handleTutorial() {
//     // let phaseCounts = tutPhases
//     for (let i = 1; i <= Object.keys(tutPhases).length; i++) {
//         let current = tutPhases[i]
//         if (!current[fulfilled]) {
//             switch (i) {
//                 case 1:
//                     current[text].draw(); 
                    
//                     let tutOrc1 = new Enemy(canvas.width / 2, 0, 0);
//                     tutOrc1.y = flora.y - tutOrc1.height;
//                     tutOrc1.update();
//                     tutOrc1.draw();

//                     break;
//             }
//         }
//     }
// }

// let tutTexts = [[tt1], [tt2], [tt3], [tt4, tt4_2], [tt5, tt5_2], [tt6], 
//                 [tt7], [tt8, tt8_2], [tt9], [tt10], [tt11, tt11_2]];

const tutorialText = new TextWall(
    `Greetings soldier. For the sake of your training, we have -with much difficulty- acquired live targets for\n 
    you to practice on. This is standard procedure and is meant to strengthen your  against the even more \n
    gruesome bloodbath that is to ensue. Good luck soldier, and glory to Ariesa!`, Math.floor(canvas.height / 5));

const bossText = new TextWall(
`Satellite imagery has exposed your horriffic atrocities in the city to the rest of the world,\n
prompting international outcry and the formation of a Sheep-led coalition against you.\n
\n
This is it! Destroy the coalition and the city is yours. Will you give up now and turn yourself\n
in for war crimes, or will you defend the city to your last dying breath lest your efforts so far\n
be in vain?`, Math.floor(canvas.height / 5));

const startText = new TextWall(
    `You are Lieutenant Warren Kilgore, the last remaining invader in Swinemanland. The very land of your\n
    eternal arch-nemesis. The armestice between the Sheep and the Swinemen had been signed days before,\n 
    but you reject returning to the boring old civilian life at whatever cost. Even though all of your men\n 
    have deserted you, you refuse to give up the the strategic city of Vonn, the crown jewel of Swineman\n 
    "civilization".\n 
    It is now your undisputed domain, your very own kingdom, and everyone in it mere flesh-logs. They are\n
    your servants, ready to satisfy your every depraved fantasy at any given moment. The city of Vonn took\n 
    months of gruesome house-to-house fighting and thousands of Sheep lives to completely conquer. Are you\n
    going to let it all slip now?`, Math.floor(canvas.height / 10));

const giveupText = new TextWall(
    `You spare your fellow countrysheep and turn yourself in.\n
    \n
    The war crimes tribunal accuses you of innumerable atrocities, the charges of which are beyond the scope of this game.\n 
    \n
    You are put to the firing squad and your ashes thrown into the dirty Googa river.`, Math.floor(canvas.height / 5));

// const loadingText = new TextWall(`\n\n\n\n\nLoading`, canvas.height / 5);
const loadingText = new TextWall(`Loading`, canvas.height / 2.5);

const playText = new TextWall(``, Math.floor(canvas.height / 5));

// HEALTH:
let playerHealth = new Health(30);
let wallHealth = new Health(60);
let grenades = new Health(90);

// variables
let frame = 0;
// let randomFrames = [50, 80, 110, 150];
let randomFrames = [10, 30, 50, 80, 110,];

let bulletLimit;

let enemyQueue = [];

// ENEMY SHOOTING STUFF:
// possible glitch fix: add "id" property
// NO MORE THAN 4 ENEMIES SHOULD BE SHOOTING.
let baddiePositions = {
    "1": {"inPos": false, "distance": 50, "type": "ground"}, 
    "2": {"inPos": false, "distance": 150, "type": "ground"}, 
    "3": {"inPos": false, "distance": 250, "type": "ground"},
    "4": {"inPos": false, "distance": 129, "type": "air"},
    "5": {"inPos": false, "distance": 0, "type": "crawl"},
    //  THIS POS ONLY AVAILABLE IN BOSS ROUND:
    "6": {"inPos": false, "distance": -shooter.width, "type": "air"},
};

// ENEMY SPEED:
// let currentSpeed = 2;
// let currentSpeed = 4;
let currentSpeed = 8;

// DROPPED PICKUPS:
let snackQueue = [];
let nadeQueue = [];

// let state = "MENU";
let state = "MENU";

let loadingTime = [2000, 3000][Math.floor(Math.random() * 3)];

// functions:
flora.draw();

let music1 = new Audio;
music1.src = "/src/assets/music/prey's stand 2.mp3";

var sfx = {
    growl: new Howl({
      /* accepts multiple versions of the same audio! (automatically selects the best one for the 
      current web browser */
      src: [
        "src/assets/sounds/paco.flac",
      ],
      loop: false,
    }),
    boom: new Howl({
        /* accepts multiple versions of the same audio! (automatically selects the best one for the 
        current web browser */
        src: [
          "src/assets/sounds/explosionLoud.mp3",
        ],
        loop: true,
    }),
    bloop: new Howl({
        /* accepts multiple versions of the same audio! (automatically selects the best one for the 
        current web browser */
        src: [
          "src/assets/sounds/q009/glauncher.ogg",
        ],
        //loop: false,
    }),

    // PICKUP SFX:
    arReload: new Howl({
        src: [
            "src/assets/sounds/explosionLoud.mp3",
        ]
    }),
    nadePin: new Howl({
        src: [
            "src/assets/sounds/grenadePin.mp3",
        ]
    }),
    flammenReload: new Howl({
        src: [
            "src/assets/sounds/futureReload.mp3",
        ]
    }),
};

/* there is a stupid security measure in some browsers where no sound is allowed to play unless the 
user explicitly interacts with the page. To work around this, add a "play" button that has to be clicked */
var music = {
    dramatic: new Howl({
        src: [
        "src/assets/music/prey's stand.mp3"
        ], 
        loop: true,
        volume: 5.5,
    })
};

function playSound(sound) {
    if (!sound.playing()) {
        sound.play();
    }
}

// stupid timer vars:
let showPlay = false
let specialRound = false;
let showNextRound = false;
let showNextText = false;
let showSpecialText = false;
let showMenu = false;
let startRound = false;
let finalRound = false;
let startEnd = false;
let showAidText = false;

// music1.play();
// music.dramatic.play();

function handleStatus() {
    if (state == "RUNNING" || state == "WIN" || state == "QUIET" || state == "RELIEF" || state == "TUTORIAL") {
        roundText.text = currentRound;
        //enemyText.text = enemyCount;
        enemyText.text = enemiesLeft;
        enemyText.draw();
        roundText.draw();
        scoreText.draw();

        if (shooter.weapon != "pistol") {
            ammoText.draw();
            ammoText.text = shooter.specialAmmo;
        }

    
        playerHealth.draw();
        playerHealth.update();
        wallHealth.draw();

        grenades.draw();
    }
}

function resetBaddies() {
    for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {
        baddiePositions[i.toString()]["inPos"] = false;
    }
}

function greatReset() {
    score = 0;
    scoreText.text = score;
    enemyCount = enemiesLeft = roundCounts[0];
    enemyQueue = [];

    winningScore = 30;
    currentRound = 1;
    shooter.weapon = "pistol";
    shooter.fireRate = 0;
    shooter.specialAmmo = 0;

    shooter2.weapon = "pistol";
    shooter2.fireRate = 0;
    shooter2.specialAmmo = 0;


    roundCounts = [7, 10];
    // ALL ENEMY COUNTS ADDED HERE!:
    for (let i = 0; i <= 9; i++) {
        roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.5));
    }

    resetBaddies();

    snackQueue = [];
    playerHealth.number = 3;
    wallHealth.number = 3;
    showMenu = false;
    // grenades.number = 3;
    grenades.number = 10;
}

function endRound() {
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

// quietFrames:
// states: MENU, RUNNING, WIN, SPECIAL, BOSS, END, LOSE.
// startButton.stroke property successfully set, but color won't change.
// TODO: use switch case to handle states

// number of tutorial rounds: 6

// for the tutorial enemies:

function tutCollision(tutCount) {
    for (let i = 0; i <= tutCount; i++) {

    }
}

function handleState() {
    switch(state) {
        case "TUTORIAL1":
            shooter.disabled = false;
            tt1.draw();

            let tutOrc1 = new Enemy(canvas.width / 2, 0, 0);
            tutOrc1.y = flora.y - tutOrc1.height;
            tutOrc1.update();
            tutOrc1.draw();

            currTutCount.push(tutOrc1)

            // skipTutButton.draw();
            skipButton.draw();
            mouseCollision(shooter.mouse, playButton, "LOADING");
            break;

        // INITIAL BLACK SCREEN:
        case "PLAY":
            playText.draw();
            playButton.draw();
            mouseCollision(shooter.mouse, playButton, "INTRO");
            break;

        case "LOADING":
            loadingText.draw();
            // if (showLoading) {
            //     loadingText.draw();
            // }
            setTimeout(() => {
                // showLoading = false;
                showPlay = true;
                if (score >= winningScore) {
                    cremate();
                }
            }, loadingTime);

            if (showPlay) state = "PLAY";
            // mouseCollision(shooter.mouse, playButton, "INTRO");
            break;

        // GLITCH SOMEWHERE IN INTRO:
        case "INTRO":
            playSound(music.dramatic);

            startText.draw();

            skipButton.draw();
            mouseCollision(shooter.mouse, skipButton, "MENU");

            setTimeout(() => {
                // what's up with this again?
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
    
            // mouseCollision(shooter.mouse, yesButton, "RUNNING");
            mouseCollision(shooter.mouse, yesButton, "QUIET");
            mouseCollision(shooter.mouse, noButton, "GIVEUP");
            break;

        case "QUIET":
            shooter.disabled = false;

            quietText.draw();
            // aidText.draw();

            setTimeout(() => {
                startEnd = true
            }, 3000);

            resetBaddies();
            if (startEnd) state = "RUNNING";
            break;
    
        case "RUNNING":
            // state = "RUNNING";
            shooter.disabled = false;
    
            // one second delay before round 1:
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

            if (playerHealth.number <= 0 || wallHealth.number <= 0) {
                state = "LOSE";
            }

            break;
        
        case "WIN": 
            specialRound = false;
            shooter.disabled = false;
    
            resetBaddies();

            // special round cases:
            // let specRounds = {5: "SPECIAL", 9: "BOSS", 10: "END"};
            let specRounds = {5: "RELIEF", 7: "SPECIAL", 9: "BOSS", 10: "END"};

            // let specRounds = {1: "BOSS", 10: "END"};
            if (Object.keys(specRounds).includes(currentRound.toString())) {
                state = specRounds[currentRound];
            }

            // if (!showNextRound) {
            //     winText.draw();
            //     setTimeout(() => {
            //         showNextRound = true;
            //     }, 1000);
            // }
            // else {
            //     nextText.draw();
            //     setTimeout(() => {
            //         state = "RUNNING";
            //         if (score >= winningScore) {
            //             cremate();
            //         }
            //     }, 1000);
            // }
            endRound();
            break;
        
        case "LOSE":
            shooter.disabled = true;
            failText.draw();
            if (playerHealth.number <= 0) {
                healthText.draw();
            } else {
                wallText.draw();
            }

            playAgainButton2.draw();
            mouseCollision(shooter.mouse, playAgainButton2, "INTRO");  
            break;

        case "SPECIAL":
            // shooter.disabled = false;
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
        
            // AIDTEXT IS CONFLICTING WITH ROUNDTEXT
            case "RELIEF":
                shooter2.duckable = false;
                // shooter.disabled = false;
                shooter2.initSecond = true;
                if (!showAidText) {
                    aidText.draw();
                    setTimeout(() => {
                        shooter.secondStream = true;
                        showAidText = true;
                    }, 2000);
                } else {
                    nextText.draw();
                    setTimeout(() => {
                        state = "RUNNING";
                        if (score >= winningScore) {
                            cremate();
                            shooter2.duckable = true;
                        }
                    }, 1000);
                };
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
            break;
    }
}

// increment stuff to make next round slightly harder:
function cremate() {
    currentRound++;
    currentSpeed += 0.1;
    roundCounts.splice(0, 1);
    enemyCount = enemiesLeft = roundCounts[0];
    winningScore += enemyCount * 10;
    frame = 0;
    resetBaddies();
}

// NEED AN ALT TO NADEQUEUE
// TODO: GET THIS FUCKING SHIT RUNNING LIKE HOW IT DID EARLIER  --DONE
function handleShooter() {
    shooter.draw();
    shooter2.draw();

    // what states require shooter to be disabled?
    if (state == "RUNNING" || state == "WIN" || state == "QUIET" || state == "RELIEF" || state == "TUTORIAL") {
        shooter.update();
        shooter2.update();
    }

    // GRENADE FUNCTIONALITY:
    if (shooter.throwBoom && grenades.number > 0 && state != "MENU") {
        if (nadeQueue.length < 1) {
            shooter.secondNade = false;
        } else {
            shooter.secondNade = true;
        }

        // THIS IS NECESSARY:
        if (shooter.secondNade == false) {
            nadeQueue.push(new Grenade(canvas.width / 2, shooter));
            // shooter.bloop.play();
            playSound(sfx.bloop);
        } else {
            nadeQueue.push(new Grenade(canvas.width / 1.2, shooter));
            //shooter.bloop.play();
            playSound(sfx.bloop);
        }
    
        shooter.throwBoom = false;
        grenades.number--;
    }
}

// only one or two nades should be in the queue at any given time:
// when nade is thrown, there is 1 second fuse. Before that Sec. is up, the x for next nade will change

// GLITCH: if enemy  was present in time of throw, it gets deleted later on.
// maximum "size" is 101

// maybe I can make this accept an array arg (one array for tuts, other for enemyQueue)
function handleNade(arr) {
    for (let i = 0; i < nadeQueue.length; i++) {
        let current = nadeQueue[i];
        // current.bloop.play();

        if (current.dudY > 0) {
            current.drawDud();
            current.updateDud();
        }

        if (!current.bloopPlayed) {
            current.bloop.play();
            current.bloopPlayed = false;
        }

        setTimeout(() => {
            current.ready = true;
        }, 500);

        // current.ready = true;
        if (current.ready) {
            current.draw();
            current.update();

            current.sound.play();
            // playSound(sfx.boom);

            // THIS IS 299:
            // console.log(current.x - current.size);

            if (current.size <= 100) {
                current.size += 4;
            }
            else {
                nadeQueue.splice(i, 1);
                i--;
            } 
        }

        // FIGURED OUT WHY IT WAS WORKING YESTERDAY: BECAUSE IT WAS RUNNING SLOW LOOOL  
        // REMEMBER TO UNCOMMENT:
        for (let y = 0; y <= arr.length; y++) { 
            let currOrc = arr[y];
            // console.log(collision(current, currOrc));
            if (arr.length > 0 && currOrc) {
                if (nadeCollision(current, currOrc) && current.ready == true) {    
                    currOrc.dead = true;
                } 
                // else currOrc.inNadeRange = false;
            }
            // console.log(currOrc.inNodeRange);
        }
    }
};

function handleEnemyProjectiles(orc) {
    let projes = orc.projectiles;

    for (let i = 0; i < projes.length; i++) {
        let current = projes[i];
        

        // FIX THIS CRAP:
        if (current.x > bulletLimit) {
        // if (current.x > 150) {
            current.update();
            current.draw();
        }
        else {
            projes.splice(i, 1);
            i--;

            // UNCOMMENT THIS:
            playerHealth.number--;
        }
    }
}


// PASS IN ENEMY/TUT QUEUE
function handleProjectile(arr) {
    let projectiles = shooter.projectiles;

    for (let i = 0; i < shooter.projectiles.length; i++) {
        let current = projectiles[i];

        // BUG HERE:
        // increase size of flammen "bullets"
        if (projectiles.length > 0 && current) {
            if (shooter.weapon == "pistol") {
                current.speed = 7;
            }

            if (shooter.weapon == "flammen" && current.size <= 20) {
                current.size += 2;
            }
    
            // TO REVERT LATER ON:
            if (current.x < canvas.width - 100 && (state == "RUNNING" || state == "WIN" || state == "QUIET" || state == "TUTORIAL")) {
                current.update();
                current.draw();
            }
            else {
                projectiles.splice(i, 1);
                i--;
            }
        }

        // enemy kill handling:
        for (let j = 0; j < arr.length; j++) {
            let currentEnemy = arr[j];
            /* remove bullet and enemy if they contact eachother. Also make enemy 
            drop pickup if applicable: */ 
            if (arr[j] && projectiles[i] && collision(projectiles[i], arr[j])) {

                projectiles.splice(i, 1);
                i--;

                if ((shooter.angle == "down" || shooter.angle == "down-back") && shooter.weapon != "flammen") {
                    currentEnemy.health -= 1;
                } else currentEnemy.health -= 2;
                

                if (currentEnemy.health <= 0) {
                    score += 10;
                    scoreText.text = score;

                    if (currentEnemy.pickup && currentRound > 1) {
                        snackQueue.push(new Pickup(currentEnemy.x, currentEnemy.y - 100, currentRound));
                    }

                    if (Object.keys(baddiePositions).includes(currentEnemy.position)) {
                        baddiePositions[currentEnemy.position]["inPos"] = false;
                    }
    
                    // here is how the enemies get deleted:
                    arr.splice(j, 1);
                    j--;
                    enemiesLeft--;

                }
            }

            //FLAMMEN KILLS BULLETS
            let orcProjes = currentEnemy.projectiles;
            for (let p = 0; p < orcProjes.length; p++) {
                if (shooter.weapon == "flammen" && orcProjes.length > 0 && collision(current, orcProjes[p])) {
                    projectiles.splice(i, 1);
                    i--;
                    orcProjes.splice(p, 1);
                    p--;
                }
            }
        }

        // PICKUP HANDLING CRAP:
        for (let l = 0; l < snackQueue.length; l++) {
            let snack = snackQueue[l];
            if (currentRound >= 5) snack.flammenReady == true;
            if (snack && projectiles[i] && collision(projectiles[i], snack)) {

                // snack.sound.play();
                snack.sound.play();
                projectiles.splice(i, 1);
                i--;

                if (snack.type == "health" && playerHealth.number < 10) {
                    playerHealth.number++;
                }
                else if (snack.type == "health" && playerHealth.number < 10) {
                    playerHealth.number++;
                }
                else if (snack.type == "grenade" && grenades.number < 10) {
                    grenades.number++;
                }

                // what's this? pick up weapon if current one is not flammen.
                if (shooter.weapon != "flammen") {
                    if (snack.type == "ar") {
                        shooter.weapon = "ar";
                        shooter.fireRate = 15;
                        shooter.specialAmmo = 50;
                    } 
                    else if (snack.type == "flammen") {
                        shooter.weapon = "flammen";
                        shooter.fireRate = 10;
                        shooter.specialAmmo = 45;
                    }
                } 
                else if (shooter.weapon == "flammen" && snack.type == "flammen") {
                    shooter.weapon = "flammen";
                    shooter.fireRate = 10;
                    shooter.specialAmmo = 45;
                }


                snackQueue.splice(l, 1);
                l--;
            }
        }

        // projectiles despawn logic. Takes into account all types:
        if (projectiles[i]) {
            // delete when leaving canvas (for small arms)
            if (
            (projectiles[i].x > canvas.width - 100 || projectiles[i].x < 0 || projectiles[i].y < 0
            && shooter.weapon != "launcher")
            // deletion for flammen
            || (shooter.weapon == "flammen" && (projectiles[i].x > canvas.width - 350 
            || projectiles[i].x < 0 || projectiles[i].y < 0))) {
                projectiles.splice(i, 1);
                i--;
            }
        }
    }
}


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

        if (!shooter.duck) bulletLimit = shooter.x + shooter.width;
        else bulletLimit = 0;

        if (current.type != "ground") current.health = 1;

        // HERE'S HOW WE DISCRIMINATE CIVIES:
        if (current.speed < 0) current.isCivie = true;

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
        // delete enemies if they are off-canvas:
        if ((current.x + current.width >= 0) && (current.x < canvas.width + 50)) {
            current.update();
            current.draw();
        } else {
            // enemyQueue.splice(i, 1);
            // score += 10;
            // current.dead;
            // enemiesLeft--;
            current.dead = true;
            // UNCOMMENT:
            wallHealth.number--;
        }

        if (current.dead) {
            enemyQueue.splice(i, 1);
            score += 10;
            enemiesLeft--;
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

            if (current.type == "crawl" && current.shooting && frame % 50) {
                //let paco = current.dog[Math.floor(Math.random() * 3)];
                // current.growl.play();

                // UNCOMMENT THIS:
                // sfx.growl.play();
                playSound(sfx.growl);
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
                // DO NOT REVERT. NEED TO MAKE WAY FOR DIFFERENT SPEEDS:
                enemyQueue.push(new Enemy(canvas.width, currentSpeed, currentRound));
                // enemyQueue.push(new Enemy(canvas.width, currentRound));
                enemyCount--;  

                // SPAWN CIVIES IN LATTER PART OF FINAL ROUND:
                if (finalRound && enemyCount % 3 == 0 && (enemyCount < 20 && enemyCount > 10)) {
                    enemyQueue.push(new Enemy(0, -currentSpeed, currentRound));
                    // enemyQueue.push(new Enemy(0, currentRound));
                    enemyCount--; 
                }
            }  
            else {
                // CIVIES SPAWNED HERE IN SPECIAL ROUND:
                // DOESN'T ACTUALLY SPAWN CIVIES. Just normal enemies at coord 0 lol:
                // REMEMBER: enemyCount only refers to num. of enemies to push to array :)
                if (enemyCount > 0) {
                    enemyQueue.push(new Enemy(0, -currentSpeed, currentRound));
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

function nadeCollision(nade, orc) {
    if (
        // FRONT:
        nade.y + nade.size >= orc.y && 
        nade.x + nade.size >= orc.x && 
        // BACK:
        // YES, THIS IS CORRECT:
        nade.x - nade.size <= orc.x + orc.width
        
    ) {
        return true;
    }

}

// collission successful.
function collision(bullet, orc) {
    if (
        // BACKWARDS SHOOTING:
        //  for forward ground and air (ensure bullet is inbetween x and width)
        (bullet.x + bullet.size >= orc.x && bullet.x <= orc.x + orc.width &&
        bullet.y + bullet.size >= orc.y && bullet.y <= orc.y + orc.height) 
        // GRENADE SHIT:
        //  && bullet.x - bullet.size >= orc.x && bullet.x - bullet.size <= orc.x + orc.width)
        || (bullet.x <= orc.x + orc.width && 
            bullet.x >= orc.x &&
            bullet.y > orc.y && 
            bullet.y < orc.y + orc.width &&
            (bullet.y < orc.y + orc.height))
        //  BULLET ON BULLET CONTACT:
        || (bullet.x + bullet.size >= orc.x && bullet.y <= orc.y + orc.size && 
            bullet.y + bullet.size >= orc.y)
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
    handleSnack()
    handleState();
    handleStatus();

    handleProjectile(enemyQueue);
    handleNade(enemyQueue);

    console.log(frame);

    if (state == "RUNNING") frame++;

    //setTimeout(animate, 5); // <<< Game runs much slower with this in conjunction with animate() VVV
    window.requestAnimationFrame(animate);
}
  
// animate();
window.requestAnimationFrame(animate);
// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";

// YOOO MAKE SURE YOUR CANVAS HAS THIS ID:
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

const flora = new Floor();
flora.draw();

const shooter = new Shooter(100, flora.y - 50);
shooter.draw();

// FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
}
  
animate();
  
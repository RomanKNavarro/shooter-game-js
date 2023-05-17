// keyboard keys
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// TODO: while shooting straight, pressing d+w makes bullets shoot up instead of diagnal,
// yet, pressing w+d does make it diagnal.    --DONE. Simply had to move if statement to bottom of cases.

export default class InputHandler {
    constructor(entity) {
      let keys = {"space": false, "d": false, "w": false};

      const mouse = {
        x: 10,
        y: 10,
        width: 0.1,
        height: 0.1,
        clicked: false
      };
      
      document.addEventListener("keydown", (event) => {
        // TODO: try using if statements instead.

        // what this do? sets respective keys value to true.
        keys[event.key] = true;
        //console.log(entity.angle);
        
        switch (event.key) {
          // this is just for SHOOTING, not look direction
          case ' ':
            //this.shooting
            entity.shooting = true;
            break;

          case 'w':
            entity.angle = "up";          
            break;
        }

        // if (keys["w"] && keys["d"] || keys["d"] && keys["w"]) entity.angle = "diagnal";
       if (keys["d"] && keys["w"]) entity.angle = "diagnal";
      });
  
      document.addEventListener("keyup", (event) => {

        keys[event.key] = false;

        switch (event.key) {
          case ' ':
            entity.shooting = false;
            break;

          case 'w':
            entity.angle = "straight";
            break;
        }
      });

      // MOUSE INPUT: 
      canvas.addEventListener("mousedown", function () {
        mouse.clicked = true;
      });
      canvas.addEventListener("mouseup", function () {
        mouse.clicked = false;
      });
      
      // here is what actually reads the mouse's location:
      let canvasPosition = canvas.getBoundingClientRect();
      canvas.addEventListener("mousemove", function (e) {
        mouse.x = e.x - canvasPosition.left;
        mouse.y = e.y - canvasPosition.top;
      });
      canvas.addEventListener("mouseleave", function () {
        mouse.x = undefined;
        mouse.y = undefined;
      });
    }
  }
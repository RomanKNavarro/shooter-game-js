// keyboard keys
var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// TODO: while shooting straight, pressing d+w makes bullets shoot up instead of diagnal,
// yet, pressing w+d does make it diagnal.    --DONE. Simply had to move if statement to bottom of cases.

export default class InputHandler {
  constructor(entity) {
    // why doesn't this work as "this.keys"?
    let keys = {"space": false, "d": false, "w": false, "s": false, "a": false};
    
    document.addEventListener("keydown", (event) => {
      // TODO: try using if statements instead.

      // what this do? sets respective keys value to true. "key" is a built-in property of "event" lol
      keys[event.key] = true;
      
      switch (event.key) {
        // this is just for SHOOTING, not look direction
        case ' ':
            entity.shooting = true;
            break;

        case 'w':
          entity.angle = "up";          
          break;

        case 's':
          entity.angle = "down";
          break;
        
        case 'a':
          entity.angle = "back";
          break;
      }

      if (keys["d"] && keys["w"]) entity.angle = "diagnal";
      else if (keys["a"] && keys["s"]) entity.angle = "down-back";
      else if (keys["a"] && keys["w"]) entity.angle = "diagnal-back";

    });

    document.addEventListener("keyup", (event) => {

      keys[event.key] = false;

      switch (event.key) {
        // SPACE BAR:
        case ' ':
          entity.shooting = false;
          break;

        case 'w':
        case 's':
        case 'a':
          entity.angle = "straight";
          break;
        
        
        // case 'a':
        //   entity.angle = "back";
        //   break;
      }
    });

    // MOUSE INPUT: 
    document.addEventListener("mousedown", function () {
      entity.mouse.clicked = true;
    });
    document.addEventListener("mouseup", function () {
      entity.mouse.clicked = false;
    });
    
    // here is what actually reads the mouse's location:
    let canvasPosition = canvas.getBoundingClientRect();
    canvas.addEventListener("mousemove", function (e) {
      entity.mouse.x = e.x - canvasPosition.left;
      entity.mouse.y = e.y - canvasPosition.top;
    });
    canvas.addEventListener("mouseleave", function () {
      entity.mouse.x = undefined;
      entity.mouse.y = undefined;
    });
  }
}
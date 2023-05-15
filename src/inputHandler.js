// keyboard keys

// TODO: while shooting straight, pressing d+w makes bullets shoot up instead of diagnal,
// yet, pressing w+d does make it diagnal.    --DONE. Simply had to move if statement to bottom of cases.

export default class InputHandler {
    constructor(entity) {
      let keys = {"space": false, "d": false, "w": false};

      
      document.addEventListener("keydown", (event) => {
        // TODO: try using if statements instead.

        console.log(keys);
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
    }
  }
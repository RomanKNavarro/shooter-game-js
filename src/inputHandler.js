// keyboard keys
export default class InputHandler {
    constructor(entity) {
      let keys = {"space": false, "d": false, "w": false};
      document.addEventListener("keydown", (event) => {
        // TODO: try using if statements instead.

        keys[event.key] = true;
        //console.log(keys);

        if (keys["w"] && keys["d"]) entity.angle = "diagnal";
        
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
        console.log(entity.shooting);
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
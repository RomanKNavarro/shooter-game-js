// keyboard keys
export default class InputHandler {
    constructor(entity) {
      document.addEventListener("keydown", (event) => {
        // TODO: try using if statements instead.

        switch (event.key) {
          // this is just for SHOOTING, not look direction
          case 's':
            //this.shooting
            entity.shooting = true;
            break;

          case 'w':
            entity.angle = "up";          
            break;
        }
      });
  
      document.addEventListener("keyup", (event) => {
        switch (event.key) {
          case 's':
            entity.shooting = false;
            break;

          case 'w':
            entity.angle = "straight";
            break;
        }
      });
    }
  }
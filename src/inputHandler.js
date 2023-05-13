// keyboard keys
export default class InputHandler {
    constructor(entity) {
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case 's':
            //this.shooting
            entity.shooting = true;
            entity.directions["straight"] = true;

            console.log(entity.shooting, entity.name);
            console.log(entity.timer);
            break;
        }
      });
  
      document.addEventListener("keyup", (event) => {
        switch (event.key) {
          case 's':
            entity.shooting = false;
            break;
        }
      });
    }
  }
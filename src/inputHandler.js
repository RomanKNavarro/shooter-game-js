// keyboard keys
class InputHandler {
    constructor(entity) {
      document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
          case 65:
            entity.shooting = true;
        }
      });
  
      document.addEventListener("keyup", (event) => {
        switch (event.keyCode) {
          case 65:
            entity.shooting = false;
            break;
  
          case 27:
            togglePause();
            break;
        }
      });
    }
  }
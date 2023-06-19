const CANVAS_SIZE = [800, 800];
const SNAKE_START = [
  [5, 16],
  [5, 17],
];
const FOOD_START = [8, 3];
const SCALE = 40;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

const DEFAULT = {
  merch: {
    modifierSnake: "#FFFFFF",
    modifierBoard: "#000000",
    modifierFood: "#FF0000",
    // other properties
  },
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  FOOD_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  DEFAULT
};

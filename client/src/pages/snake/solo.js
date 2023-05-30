import React, { useEffect, useState, useRef } from "react";
import "./assets/style.css";
import { useInterval } from "./useInterval.js";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  GROWTH,
} from "./constants";

const Solo = () => {
  //grid/play space
  //snake
  //pick up randomly generating to the grid but not where the snake is
  //movement usng arrow keys can not reverse driection
  //snake grow and moves fast when getting pick up
  //game over conditons 1 hitting boarder 2 hitting self
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [direction, setDirection] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const movement = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        if ((direction === DIRECTIONS[39])) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 38:
        if ((direction === DIRECTIONS[40])) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 39:
        if ((direction === DIRECTIONS[37])) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 40:
        if ((direction === DIRECTIONS[38])) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      default:
    }
  };

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [
      snakeCopy[0][0] + direction[0],
      snakeCopy[0][1] + direction[1],
    ];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    } else {
      for (let i = 0; i <= GROWTH; i++) {
        snakeCopy.push(snakeCopy[snakeCopy.length - 1]);
      }
    }
    setSnake(snakeCopy);
  };

  const gameStart = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDirection(DIRECTIONS[38]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <>
      <div role="button" tabIndex="0" onKeyDown={(e) => movement(e)}>
        <canvas
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && <div>game over</div>}
        <button onClick={gameStart}>start game</button>
      </div>
    </>
  );
};

export default Solo;

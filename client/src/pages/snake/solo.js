import React, { useEffect, useState, useRef } from "react";
import { useInterval } from "./useInterval.js";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE, UPDATE_CURRENCY } from "../../utils/mutations";
import { QUERY_CURRENCY } from "../../utils/queries";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import {
  CANVAS_SIZE,
  SNAKE_START,
  FOOD_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  DEFAULT,
} from "./constants";

const Solo = () => {
  const canvasRef = useRef();
  const timerId = useRef();
  let time = useRef(0);

  const [addScore] = useMutation(ADD_SCORE);
  const [updateCurrency] = useMutation(UPDATE_CURRENCY);
  const {  data } = useQuery(QUERY_CURRENCY);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(FOOD_START);
  const [direction, setDirection] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  //ensure game has theme on first time playing
  let theme = JSON.parse(localStorage.getItem("themeSnake"));

  localStorage.setItem("default", JSON.stringify(DEFAULT));

  if (!theme) {
    theme = JSON.parse(localStorage.getItem("default"));
  }



  const startTimer = () => {
    timerId.current = setInterval(() => {
      time.current++;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    time.current = 0;
  };

  const updateGamesAndCurrency = async () => {
    const newCurrency = data?.me.currency + score;
    console.log(data?.me.currency)
    console.log(score)
    try {
      await addScore({
        variables: { score: score, time: time.current },
      });
      await updateCurrency({
        variables: { currency: newCurrency },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    stopTimer();
    updateGamesAndCurrency();
  };

  const movement = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        if (direction === DIRECTIONS[39]) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 38:
        if (direction === DIRECTIONS[40]) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 39:
        if (direction === DIRECTIONS[37]) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      case 40:
        if (direction === DIRECTIONS[38]) break;
        setDirection(DIRECTIONS[keyCode]);
        break;
      default:
    }
  };

  const createFood = () =>
    food.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

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

  const checkFoodCollision = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = createFood();
      while (checkCollision(newFood, newSnake)) {
        newFood = createFood();
      }
      setFood(newFood);
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
    if (checkCollision(newSnakeHead)) {
      endGame();
    }
    if (!checkFoodCollision(snakeCopy)) {
      snakeCopy.pop();
    } else {
      let currentScore = score;
      setScore(currentScore + 1);
      for (let i = 0; i <= score / 10; i++) {
        snakeCopy.push(snakeCopy[snakeCopy.length - 1]);
      }
    }
    setSnake(snakeCopy);
  };

  const gameStart = () => {
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDirection(DIRECTIONS[38]);
    setSpeed(SPEED);
    setScore(0);
    setGameOver(false);
    startTimer();
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.focus();
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = theme.merch.modifierSnake;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = theme.merch.modifierFood;
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food, gameOver, theme]);

  return (
    <Container autoFocus tabIndex="0" onKeyDown={(e) => movement(e)}>
      {/*  */}
      <Row>
        <Col className=" d-flex justify-content-center pt-5 pb-3 ">
          <canvas
            role="button"
            className="border-primary"
            style={{
              border: "1px solid",
              backgroundColor: theme.merch.modifierBoard,
            }}
            ref={canvasRef}
            width={`${CANVAS_SIZE[0]}px`}
            height={`${CANVAS_SIZE[1]}px`}
          />
          {gameOver && (
            <Alert
              variant="danger"
              className="text-center position-absolute top-50 start-50 translate-middle"
            >
              <h3>GAME OVER</h3>
              <h4>You got {score} apples!</h4>
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8} className="text-center">
          <Card className="bg-dark border-primary rounded-4">
            <Row className="p-2">
              <Col>Points : {score}</Col>
              <Col>Timer : {time.current}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className=" d-flex justify-content-center py-2">
          <Button onClick={gameStart}>Start Game</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Solo;

const db = require("../config/connection");
const { User, Merch } = require("../models");

db.once("open", async () => {
  await Merch.deleteMany();

  const merch = await Merch.insertMany([
    {
      name: "Malachite",
      description: "Change the colour of snake to purple",
      image: "2",
      price: 10,
      modifierSnake: "#1afe49",
      modifierBoard: "#041348",
      modifierFood: "#de004e", //laser
    },
    {
      name: "Aureolin",
      description: "Change the colour of snake to Orange Red",
      price: 10,
      modifierSnake: "#FCEE0C",
      modifierBoard: "#000000",
      modifierFood: "#03D8F3", //cyberpunk game
    },
    {
      name: "Halo",
      description: "Change the colour of snake to Cyan",
      price: 10,
      modifierSnake: "#b7c1de",
      modifierBoard: "#092047",
      modifierFood: "#63345e", //halo
    },
    {
      name: "Vodka",
      description: "Changes the board to Midnight Blue",
      price: 10,
      modifierSnake: "#c4ffff",
      modifierBoard: "#1261d1",
      modifierFood: "#af43be", //2 phase fabric
    },
    {
      name: "Diamond",
      description: "Changes the board to Dark Slate Gray",
      price: 10,
      modifierSnake: "#FAC4B8",
      modifierBoard: "#8f704b",
      modifierFood: "#44786ea", //desert city
    },
    {
      name: "Blueberry",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#3E82F7",
      modifierBoard: "#ff2a6d",
      modifierFood: "#f2e0df", //red jacket
    },
    {
      name: "July",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#bb1212",
      modifierBoard: "#eeeeee",
      modifierFood: "#537da3",
    },
    {
      name: "Soft",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#519fde",
      modifierBoard: "#7b7e25",
      modifierFood: "#519fde", 
    },
    {
      name: "Tiny",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#d8aa01",
      modifierBoard: "#2f530d",
      modifierFood: "#eedb07",
    },
    {
      name: "Lake",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#b1d1ab",
      modifierBoard: "#3c91bf",
      modifierFood: "#2b343a", 
    },
    {
      name: "Asphalt",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#b1c6c4",
      modifierBoard: "#c9d6d9",
      modifierFood: "#060707", 
    },
    {
      name: "Neon",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#ef39a4",
      modifierBoard: "#fdc71d",
      modifierFood: "#0b72c4", 
    },
    {
      name: "4Deal",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#fe320d",
      modifierBoard: "#bbbbbb",
      modifierFood: "#feab0d", 
    },
    {
      name: "Lake",
      description: "Changes the board to Maroon",
      price: 10,
      modifierSnake: "#000f00",
      modifierBoard: "#0d6608",
      modifierFood: "#feff15", 
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create([
    {
      username: "one",
      email: "one@one.com",
      password: "11111",
    },
    {
      username: "two",
      email: "two@two.com",
      password: "22222",
    },
    {
      username: "three",
      email: "three@three.com",
      password: "33333",
    },
    {
      username: "four",
      email: "four@four.com",
      password: "44444",
      games: [{score: 50, time: 150},],
      inventory: [
        { merch: merch[0]._id },
        { merch: merch[1]._id },
        { merch: merch[2]._id },
      ],
    },
  ]);

  console.log("users seeded");

  process.exit();
});

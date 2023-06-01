const db = require("../config/connection");
const { User, Merch } = require("../models");

db.once("open", async () => {
  await Merch.deleteMany();

  const merch = await Merch.insertMany([
    {
      name: "Pale Green Snake",
      description: "Change the colour of snake to purple",
      image: "2",
      price: 10,
      modifierSnake: "palegreen",
    },
    {
      name: "Orange Red Snake",
      description: "Change the colour of snake to Orange Red",
      price: 10,
      modifierSnake: "orangered",
    },
    {
      name: "Cyan Snake",
      description: "Change the colour of snake to Cyan",
      price: 10,
      modifierSnake: "cyan",
    },
    {
      name: "Midnight Blue Board",
      description: "Changes the board to Midnight Blue",
      price: 10,
      modifierBoard: "midnightblue",
      modifierFood: "silver",
    },
    {
      name: "Dark Slate Gray Board",
      description: "Changes the board to Dark Slate Gray",
      price: 10,
      modifierBoard: "darkslategray",
      modifierFood: "violet",
    },
    {
      name: "Maroon Board",
      description: "Changes the board to Maroon",
      price: 10,
      modifierBoard: "maroon",
      modifierFood: "thistle",
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
      inventory: [
        {
          merch: merch[0]._id
        }
      ]
    },
  ]);

  console.log("users seeded");

  process.exit();
});

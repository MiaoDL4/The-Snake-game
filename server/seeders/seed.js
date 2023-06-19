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
          merch: merch[0]._id,
          merch: merch[1]._id,
          merch: merch[2]._id,
        },
      ],
    },
  ]);

  console.log("users seeded");

  process.exit();
});

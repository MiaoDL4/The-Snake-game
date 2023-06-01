const db = require("../config/connection");
const { User, Merch } = require("../models");

db.once("open", async () => {
  await Merch.deleteMany();

  const merch = await Merch.insertMany([
    {
      name: "Purple snakes",
      description: "change the colour of snake to purple",
      image: "2",
      price: 10,
      modifier: "purple",
    },
    {
      name: "Red snakes",
      description: "change the colour of snake to red",
      image: "2",
      price: 10,
      modifier: "red",
    },
    {
      name: "Green snakes",
      description: "change the colour of snake to green",
      image: "2",
      price: 10,
      modifier: "green",
    },
    {
      name: "Blue Board",
      description: "Dark background",
      image: "1",
      price: 10,
      modifier: "blue",
    },
    {
      name: "gray",
      description: "Dark background",
      image: "1",
      price: 10,
      modifier: "gray",
    },
    {
      name: "pink",
      description: "Dark background",
      image: "1",
      price: 10,
      modifier: "pink",
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

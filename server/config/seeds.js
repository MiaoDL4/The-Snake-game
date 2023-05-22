const db = require("./connection");
const { User, Profile, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([{ name: "Cosmetic" }]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "purple snakes",
      description: "change the colour of snake to purple",
      image: "",
      category: categories[0]._id,
      price: 1,
    },
    {
      name: "Night Grid",
      description: "Dark background",
      image: "",
      category: categories[0]._id,
      price: 1,
    },
  ]);

  console.log("products seeded");

  await Profile.deleteMany();

  const profiles = await Profile.insertMany([
    {
      win: 0,
      loss: 0,
      currency: 100,
      item: [{ products: [products[0]._id] }],
    },
    {
      win: 0,
      loss: 0,
      currency: 100,
      item: [{ products: [products[1]._id] }],
    },
  ]);

  await User.deleteMany();

  await User.create([
    {
      username: "one",
      email: "one@one.com",
      password: "11111",
      profile: profiles[0],_id,
    },
    {
      username: "two",
      email: "two@two.com",
      password: "22222",
      profile: profiles[0],_id,
    },
    {
      username: "three",
      email: "three@three.com",
      password: "33333",
      profile: profiles[1],_id,
    },
    {
      username: "four",
      email: "four@four.com",
      password: "44444",
      profile: profiles[1],_id,
    },
  ]);

  console.log("users seeded");

  process.exit();
});

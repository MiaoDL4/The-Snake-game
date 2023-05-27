const db = require("./connection");
const { User, Profile, Product, Category, Purchases } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "snake" },
    { name: "board" },
  ]);

  console.log("categories seeded");
  console.log(categories)

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "purple snakes",
      description: "change the colour of snake to purple",
      image: "2",
      price: 10,
      category: categories[0]._id,
    },
    {
      name: "Night Grid",
      description: "Dark background",
      image: "1",
      price: 10,
      category: categories[1]._id,
    },
  ]);

  console.log("products seeded");

  console.log(products)

  await Purchases.deleteMany();
  const purchases = await Purchases.insertMany([
    {
      product:products[0]._id,
    },
    {
      product:products[1]._id,
    },
    {
      product:products[1]._id,
    },
    {
      product:products[1]._id,
    },
    {
      product:products[1]._id,
    }
  ]);
  
  console.log("purchases seeded");

  console.log(purchases)

  await Profile.deleteMany();

  const profiles = await Profile.insertMany([
    {
      win:10,
      loss: 5,
      purchases: [purchases[0]._id, purchases[4]._id],

    },
    {
      win: 5,
      loss: 6,
      currency: 10,
      purchases: [purchases[1]._id],
    },
    {
      win: 1,
      loss: 2,
      currency: 50,
      purchases: [purchases[2]._id],
    },
    {
      win: 0,
      loss: 1,
      currency: 150,
      purchases: [purchases[3]._id],
    },
  ]);

  console.log("profiles seeded");

  console.log(profiles)
  
  await User.deleteMany();

  await User.create([
    {
      username: "one",
      email: "one@one.com",
      password: "11111",
      profile: profiles[0]._id,
    },
    {
      username: "two",
      email: "two@two.com",
      password: "22222",
      profile: profiles[1]._id,
    },
    {
      username: "three",
      email: "three@three.com",
      password: "33333",
      profile: profiles[2]._id,
    },
    {
      username: "four",
      email: "four@four.com",
      password: "44444",
      profile: profiles[3]._id,
    },
  ]);

  console.log("users seeded");

  process.exit();
});

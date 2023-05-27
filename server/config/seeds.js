const db = require("./connection");
const { User, Profile, Product, Category, Purchase } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "snake" },
    { name: "board" },
  ]);

  console.log("categories seeded");

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

  await Purchase.deleteMany();
  const purchased = await Purchase.insertMany([
    {
      products:products[0]._id,
    },
    {
      products:products[1]._id,
    },
    {
      products:products[1]._id,
    },
    {
      products:products[1]._id,
    },
    {
      products:products[1]._id,
    }
  ]);
  
  console.log("purchased seeded");

  console.log(purchased)

  await Profile.deleteMany();

  const profiles = await Profile.insertMany([
    {
      win:10,
      loss: 5,
      purchased: [purchased[0]._id, purchased[4]._id],

    },
    {
      win: 5,
      loss: 6,
      currency: 10,
      purchased: [purchased[1]._id],
    },
    {
      win: 1,
      loss: 2,
      currency: 50,
      purchased: [purchased[2]._id],
    },
    {
      win: 0,
      loss: 1,
      currency: 150,
      purchased: [purchased[3]._id],
    },
  ]);

  console.log("profiles seeded");
  
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

const db = require("./connection");
const { User, Item, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Burgers" },
    { name: "Wings" },
    { name: "Drinks" },
  ]);

  console.log("categories seeded");

  await Item.deleteMany();

  const items = await Item.insertMany([
    {
      name: "Mushroom Swiss",
      description:
        "Swiss cheese, suateed mushroooms, chopped romaine lettuce, tomato, and red onion on a pretzel bun.",
      image: "mushroom_swiss.jpg",
      category: categories[0]._id,
      price: 14,
      quantity: 500,
    },
    {
      name: "Jiffy Burger",
      description:
        "Provolone cheese, applewood smoked bacon, chopped romaine lettuce, and creamy peanut butter on a brioche bun.",
      image: "jiffy_burger.jpg",
      category: categories[0]._id,
      price: 14,
      quantity: 500,
    },
    {
      name: "Buffalo Bacon Burger",
      description:
        "Buffalo burger with sharp cheddar, bacon jam, bourbon bbq sauce, arugula, onion ring, and chipotle aioli on a brioche bun.",
      image: "buffalo_bacon.jpg",
      category: categories[0]._id,
      price: 17,
      quantity: 500,
    },
    {
      name: "Garlic Parmesan Wings",
      category: categories[1]._id,
      description:
        "This Italian-inspired twist on wings features salty parmesan cheese and plenty of garlic",
      image: "garlic.jpg",
      price: 9,
      quantity: 500,
    },
    {
      name: "Jalapeno Cheddar Wings",
      category: categories[1]._id,
      description:
        "Forget jalapeño poppers, these spicy wings are slathered in buffalo sauce and topped with melty cheddar cheese.",
      image: "jalapeno.jpg",
      price: 11,
      quantity: 100,
    },
    {
      name: "Maple BBQ Wings",
      category: categories[1]._id,
      description:
        "Keto wings! They're low-carb, but they're still packed with savory-sweet flavor.  ",
      image: "maple_bbq.jpg",
      price: 11,
      quantity: 200,
    },
    {
      name: "American IPA",
      category: categories[2]._id,
      description:
        "Big on the aroma with a hoppy-sweet finish that will leave you wanting another sip.",
      image: "ipa.jpg",
      price: 7,
      quantity: 150,
    },
    {
      name: "Blond Ale",
      category: categories[2]._id,
      description:
        "An approachable, malt-oriented American beer that is well-balanced and great for easy-drinking",
      image: "blonde_ale.jpg",
      price: 7,
      quantity: 200,
    },
  ]);

  console.log("items seeded");

  await User.deleteMany();

  await User.create({
    username: "don",
    email: "don@gmail.com",
    password: "123456",
    orders: [
      {
        items: [items[0]._id, items[1]._id, items[2]._id],
      },
    ],
  });

  process.exit();
});

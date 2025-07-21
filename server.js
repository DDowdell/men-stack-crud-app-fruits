
const dotenv = require('dotenv'); // require dotenv package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require('mongoose'); // require mongose package

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Fruit model
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));


//Routes below
app.get("/", async (req, res) => {
    res.render('index.ejs');
});

//get new fruits route
app.get("/fruits/new", (req, res) => {
    res.render('fruits/new.ejs');
});


// POST /fruits
app.post("/fruits", async (req, res) => {
      if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body); //database transaction
  res.redirect("/fruits/new");

  console.log(req.body);
});



//Routes above
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Static files serve karne ke liye (e.g., CSS, JS)

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/formDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed", err));

// Listen on port
app.listen(3005, () => {
  console.log("Server running at http://localhost:3005");
});

// new data
const User = require("./models/User");

app.post("/submit", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });

    await newUser.save(); // Save data in MongoDB
    res.send("Data saved successfully!");
  } catch (err) {
    console.error("Error saving data", err);
    res.status(500).send("Internal Server Error");
  }
});

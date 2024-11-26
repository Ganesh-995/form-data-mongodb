const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/formDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed", err));

// Serve Main Form HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Main form page
});

const User = require("./models/User");

// Handle Form Submission
app.post("/submit", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    // Save data to MongoDB
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phon: req.body.phon,
    });
    await newUser.save(); // Save the user data

    // Serve `po.html` after successful submission
    res.sendFile(path.join(__dirname, "public", "po.html"));
  } catch (err) {
    console.error("Error saving data", err);
    res.status(500).send("Internal Server Error");
  }
});

// Listen on port
app.listen(3005, () => {
  console.log("Server running at http://localhost:3005");
});

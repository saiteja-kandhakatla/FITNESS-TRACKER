const mongoose = require("mongoose");
const ex = require("express");
const userApp = ex.Router();
const User = require("../Models/User");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userApp.get("/home", (req, res) => {
  res.send("User Home Page");
});

// Middleware to check if user is logged in
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};

// Sign Up
userApp.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, age, password } = req.body;
    const userInDb = await User.find({ email });

    if (userInDb.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userObj = new User({
      name,
      email,
      age,
      password: hashedPassword,
    });

    const userDoc = await userObj.save();

    if (userDoc) {
      res.status(201).send({ message: "User created successfully", payload: userDoc });
    } else {
      res.status(400).send({ message: "User creation failed" });
    }
  })
);

// Login
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userInDb = await User.findOne({ email });
    if (!userInDb) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userInDb.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: userInDb.email, id: userInDb._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        _id: userInDb._id,
        name: userInDb.name,
        email: userInDb.email,
        age: userInDb.age,
      },
    });
  })
);

// Protected Profile Route
userApp.get(
  "/HomePage",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "User Profile", payload: req.user });
  })
);

// userApp.get("/userProfile",)

module.exports = userApp;

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/users");
const authenticate = require("../middleware/authenticate");
router.get("/", (req, res) => {
  res.send(`hello world from the server router.js`);
});

//Async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Field required" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save();
    res.status(201).json({ message: "user registered successful" });
  } catch (err) {
    console.log(err);
  }
});

//Login Route
router.post("/signIn", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwToken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "user SignIn successfully " });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about us page
router.get("/about", authenticate, (req, res) => {
  console.log("hello from about");
  res.send(req.rootUser);
});

//get user data
router.get("/contactData", authenticate, (req, res) => {
  console.log("hello my contact page");
  res.send(req.rootUser);
});
//contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "plz filled the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "user contact successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

//logout page
router.get("/logout", (req, res) => {
  console.log("hello from logout");
  res.clearCookie("jwToken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;

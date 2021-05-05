const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-Parser");

//get cookies
app.use(cookieParser());

//.env
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

const User = require("./model/users");

//port
const PORT = process.env.PORT;

//mongodb
require("./db/conn");

//json
app.use(express.json());

//Router
app.use(require("./router/auth"));

//Middleware
const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

// app.get("/contact", (req, res) => {
//   res.send(`hello world from the contact`);
// });

app.get("/signIn", (req, res) => {
  res.send(`hello world from the signIn`);
});
app.get("/signup", (req, res) => {
  res.send(`hello world from the signup`);
});
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});

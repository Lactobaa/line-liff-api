// const express = require("express");
// import 'babel-polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
const app = express();

const port = 5000;
// const __dirname = path.resolve();
// Body parser
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});


// app.use(bodyParser.json({ limit: '280mb' }));
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });
app.use("/public", express.static(path.join(__dirname, "./public")));
// Home route
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

// Mock APIs
app.get("/users", (req, res) => {
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" }
  ]);
});

app.post("/user", (req, res) => {
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});
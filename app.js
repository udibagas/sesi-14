require("dotenv").config();
const express = require("express");
const app = express();

console.log(process.env);

app.use(express.json());
app.use(require("./routes"));

module.exports = app;

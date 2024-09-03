require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(require("./routes"));

// error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.name,
    message: err.message,
  });
});

module.exports = app;

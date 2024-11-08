const express = require("express");
const bookRoutes = require("../routes/bookRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/book", bookRoutes);

module.exports = app;

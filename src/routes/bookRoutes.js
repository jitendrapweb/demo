const express = require("express");
const { addBook } = require("../services/bookService");
const router = express.Router();

router.post("/", addBook);

module.exports = router;

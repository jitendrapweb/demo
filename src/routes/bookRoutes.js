const express = require("express");
const { addBook } = require("../services/bookService");
const router = express.Router();

//  POST /book
router.post("/", addBook);

module.exports = router;

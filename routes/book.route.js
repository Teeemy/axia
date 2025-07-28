const express = require("express");
const { createBook, getBook } = require("../controllers/book.controller");
const authentication = require("../middlewares/auth.middleware")
const route = express.Router();

route.post("/", authentication, createBook);
route.get("/", getBook);

module.exports = route;
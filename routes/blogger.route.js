const express = require("express")
const { getAllBloggers, createBlogger, updateBlogger, deleteBlogger } = require("../controllers/blogger.controller")

//console.log({ getBlogger, createBlogger, updateBlogger, deleteBlogger });


const route = express.Router();

//route.get("/", getAllBloggers);

route.post("/", createBlogger);

route.put("/", updateBlogger);

route.delete("/", deleteBlogger);

module.exports = route;
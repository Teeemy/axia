const express = require("express");
const { createPost, deletePost, updatePost, getPosts, getSinglePost } = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middleware");
const route = express.Router();
const upload = require("../utils/multer");

const postUploads = upload.fields([
    { name: "previewPix", maxcount: 1 },
    { name: "detailedPix", maxcount: 1 },
]);



route.post("/post",postUploads,authentication,createPost);
route.delete("/post",authentication, deletePost);
route.put("/post", authentication,updatePost);
route.get("/post", getPosts);
route.get("/single-post", getSinglePost);

module.exports = route;
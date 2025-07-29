//import express from "express " 
const express = require("express");
const bloggerRoutes = require("./routes/blogger.route") // relative import
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const kycRoutes = require("./routes/kyc.route");
const bookRoutes = require("./routes/book.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL) // create connection
    .then(() => console.log("connection was successful"))
    .catch((error) => console.log(error));
app.use(express.json());
app.use(express.text());
app.use(express.text({ type: "application/javascript" }));
app.use(express.text({ type: "text/html" }));
app.use(express.urlencoded());// to get form that does not contain image

const Port = process.env.PORT || 5000; // this is to use tRENDER to assign a porto instead of providing the port.process.env is method used 

app.use(cookieParser());

app.use("/blog",bloggerRoutes);// app.use is  middleware to create endpoint for database manipulation
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use(kycRoutes);
app.use("/book", bookRoutes);


app.use((err, req, res, next) => {
    //console.error(err.stack);
    res.status(err.status || 501).json({ message: err.message || "Something went wrong" });
});
  
app.listen(Port, () => {
    console.log(`App is running on port: ${Port}`);
});




// app.listen(4000, () => {
//     console.log("my app is running on port 4000")
// });
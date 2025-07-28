const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dlooj57rr",
    api_key: "444225367927963",
    api_secret: "0icFgZk4BMy5VuhqIM_NUtCTp4s"
});

module.exports = cloudinary;
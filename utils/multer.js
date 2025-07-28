const multer = require("multer");// middleware for file/image upload
const upload = multer({ dest: "uploads/" }); 

module.exports = upload;
const express = require("express")
const { getUser, createUser, updateUser, deleteUser, loginUser, getAllUSer, addManyUser, statusCode, redirectPath, contentType, singleFile, arrayFile, multipleFile} = require("../controllers/user.controller")

const upload = require("../utils/multer");

//const authentication = require("../middlewares/auth.middleware")

// upload multiple fields
const moreField = upload.fields([{name: "previewPix", maxCount:1},{name: "detailedPix", maxCount:1},{name: "video", maxCount:1},])


const route = express.Router();

route.get("/", getUser);

route.post("/", createUser);

route.put("/", updateUser);

route.delete("/", deleteUser);

route.post("/user-login", loginUser);

route.get("/all-users", getAllUSer);

route.post("/multi", addManyUser);

route.get("/status", statusCode);

route.get("/redirect", redirectPath);

route.post("/type", contentType);// json,text,javascript,html,xml

route.post("/single", upload.single("dp"),singleFile);

route.post("/arrays", upload.array("dp", 3), arrayFile);// expecting 2 argument i.e filename and max file expecting in the field

route.post("/multiple", moreField, multipleFile);

module.exports = route;
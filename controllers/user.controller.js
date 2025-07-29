const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs/promises"); // filesystem to remove file uploaded from server
const cloudinary = require("../utils/cloudinary");

const createUser = async (req, res) => {
    // get the persons registration details and spread others
    const { email, password, ...others } = req.body;
    // check if email and password exists
    if (!email || !password) {
        return res.send("please provide valid email and password");
    }
    // check if user exists in database
    const isUser = await userModel.findOne({ email: email })
    if (isUser) {
        return res.send("User already exist, please login")
    }
    // create hash password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // continue with registration
    try {
        const newUser = new userModel({ email, password, ...others }); // if u want to hashpassword, u put hashedpassword after password
        
        const savedUser = await newUser.save()
        return res.json(savedUser)
    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong")
    }
};

const getUser = async (req, res) => {
    const {id} = req.user // to get a user
    const allUsers = await userModel.findById(id).populate("kyc").populate("posts").populate("books") //to get all user but use find ()instead of findby id
    return res.json(allUsers)
};

const updateUser = async (req, res) => {
    const { id } = req.query;
    const payload = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, { ...payload }, { new: true }) // expect 3 parameters but we can spread by putting (others) then include new as true
    return res.send(updatedUser)
};

const deleteUser = async (req, res) => {
    const { id } = req.query;
    const deletedUser = await userModel.findByIdAndDelete(id)
    return res.json(deletedUser)

};

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // get the user from database
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.send("This account does not exist,create account")
    };
    // compare password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.send("Invalid passowrd!!!");
    };

    //create token
    const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_SECRET,{expiresIn: "2hr"});// sign particular token by provinding info
    console.log(token);
    
    // return basic information
    //return res.json({ id: user.id, name: user.name, email: user.email });
   
    res.cookie("token", token, { maxAge: 1000 * 60 * 60, secure: true, httponly: true,}).json({ message: "login successful" });
    // maxage :1000 *60 is converting the time*(hr) for the cookie to stay to 60 seconds
    // secure and http only means http only should be use and cookie is secure
    //return res.json({ message: "Successful" });
};

const getAllUSer = async (req, res) => {
    try {
        const getAllUSers = await userModel.find({ gender: "Female" }, "name email gender age married _id")// to get a particular field from the document
        return res.json(getAllUSers)
        
        // const getAllUSers = await userModel.find().where("gender").equals("Male").where("age").gte(20).lt(100); gte is greater than equal to while lt is less than
        // return res.json(getAllUSers)
        
        
        // const getAllUSers = await userModel.find({gender: "Male", age: { $gt: 20 } }).limit(10).select({ name: 1, _id: 0, gender: 1, email: 1, age: 1 }).sort({ age: -1 });
        // return res.json(getAllUSers) // another method to get a particular field from documents.using alphabethical  is 1while -1 descending order
      
    } catch (error) {
        return res.send("something went wrong");
    }
};

const addManyUser = async (req, res) => {
  const alluser = [
    {
      "name": "Ayo",
      "email": "ayo@gmail.com",
      "password": "55555",
      "gender": "Female",
      "married": "false",
      "admin": false,
      "age": 28
    },
    {
      "name": "Ade ",
      "email": "ade@yahoo.com",
      "password": "55555",
      "gender": "Male",
      "married": "true",
      "admin": false,
      "age": 30
    },
    {
      "name": "Oyin",
      "email": "oyin03@gmail.com",
      "password": "55555",
      "gender": "Female",
      "married": "true",
      "admin": false,
      "age": 32
    },
  ];
    
  const insertedUser = await userModel.insertMany(alluser);
  res.send("Users added successfully");
};

// const statusCode = async (req, res) => {
//     return res.status.json(201)({ message: "created" });
    
// };

// const statusCode = async (req, res) => {
//     return res.redirect(301, "/redirect");

// };

const statusCode = async (req, res, next) => {
    const error = new Error("something happened here");
    error.status = 504
    next(error);
};

const redirectPath = async (req, res) => {
    throw new Error("Another thing happened")
};

// const redirectPath = async (req, res) => {
//     return res.status(200).json({ message: "redirected path" })
// }

const contentType = async (req, res, next) => {
    //console.log('Content-Type header:', req.headers['content-type']);
    console.log(req.body);
    return res.send("Type received");
};

const singleFile = async (req, res, next) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path);
        console.log(response);
        await fs.unlink(req.file.path); // unlink is use to remove the file after uploading
        // console.log(req.file);
        // console.log(req.body);
        return res.send("uploaded")
        
    } catch (error) {
        await fs.unlink(req.file.path); 
        next(error)
    }

};

const arrayFile = async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    return res.send("Files uploaded")

};

const multipleFile = async (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
    return res.send("Successful")

};

    module.exports = { getUser, createUser, updateUser, deleteUser, loginUser, getAllUSer, addManyUser, statusCode, redirectPath, contentType, singleFile, arrayFile, multipleFile };
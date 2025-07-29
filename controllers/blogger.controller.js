const userModel = require('../models/user.model')


// const getBlogger = (req, res) => {
//     return res.json("getting all bloggers")
//   }


const getAllBloggers = async (req, res) => {
    try {
        const bloggers = await userModel.find();  // Or your blogger model if different
        return res.json(bloggers);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
  
const createBlogger = async (req, res) => {
    const payload = req.body
    const newBloger = new userModel(payload);
    const savedBlogger = await newBloger.save();
    return res.send(savedBlogger)
}

const updateBlogger = (req, res) => {
    return res.send("This is the update request")
}

const deleteBlogger = (req, res) => {
    return res.send("account has been deleted")

}

module.exports = { getAllBloggers, createBlogger, updateBlogger, deleteBlogger }
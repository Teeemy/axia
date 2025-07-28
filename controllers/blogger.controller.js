const userModel = require('../models/user.model')


const getBlogger = (req, res) => {
    return res.json("getting all bloggers")
  }
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

module.exports = { getBlogger, createBlogger, updateBlogger, deleteBlogger }
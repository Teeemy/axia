const postModel = require("../models/post.model");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs/promises")

const createPost = async (req, res) => {
  const body = req.body;
  const file = req.files // for upload files 
  const { id } = req.user;
  //const id = req.user //"68547f5b86a19906ff318a3f"; // using id instead of the req.user
  console.log(body)
  //console.log(file)// to get the file uploaded
  //console.log(file["previewPix"][0].path)// to get individual item in a file
  //console.log(file["detailedPix"]) // to get a particular file

  
  //console.log(req.user)
  //const { token } = req.cookies;

  try {
    // upload to cloudinary
    const previewPixResponse = await cloudinary.uploader.upload(file["previewPix"][0].path) // to get individual item in the file
    const detailePixResponse = await cloudinary.uploader.upload(file["detailedPix"][0].path)

    console.log(previewPixResponse.secure_url)
    console.log(detailePixResponse.secure_url)
    // to append the uploaded field to the body
    body["previewPix"] = previewPixResponse.secure_url
    body["detailedPix"] = detailePixResponse.secure_url
    console.log(body)
    //const payload = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(payload);
    
    //create post after appending uploaded field to body
    const newPost = new postModel({ creator: id, ...body });
    const savedPost = await newPost.save();
    //return res.json(savedPost); 
    //modify user acctount after creating post. modification is done by 3 ways 
    //1st way const userInfo = await userModel.findById(id)
    // 2nd way userInfo.posts.push(savedPost.id);// get field that have array of all posts by user
    //await userInfo.save()     
    await userModel.findByIdAndUpdate(id, { $push: { posts: savedPost.id } }, { new: true }

    );

    // unlink the file here
    await fs.unlink(file["previewPix"][0].path)
    await fs.unlink(file["detailedPix"][0].path)
    return res.send("post created successfully")

  } catch (error) {
    await fs.unlink(file["previewPix"][0].path) // unlink is removing the files from our server i.e cloudinary
    await fs.unlink(file["detailedPix"][0].path)
    //console.log(error.message)
    return res.send(error.message);
  }
};
  
  // const createPost = async (req, res) => {
  //   const body = req.body;
  //   const cookies = req.cookies;
  //   //console.log(cookies)
  //  const { token } = req.cookies;
  //   try {
  //    const newPost = new postModel({ creator:userId, ...body });
  //     const savedPost = await newPost.save();
  //    return res.json(savedPost);

  //  } catch (error) {
  //    return res.send(error.message);

  //     }
  // };

const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id, admin } = req.user;
  console.log(req.user)

  //check for post existence
  const post = await postModel.findById(postId);
  //const payload = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(payload);
  if (!post) {
    return res.send("post does not exist");
  }
  //console.log(userId);
  console.log(post.creator);
  // check if it is the creator
  if (id != post.creator && !admin) {
    return res.send("this post does not belong to you!!!")
  }
  try {
    await postModel.findByIdAndDelete(postId);
    return res.send("post deleted");
  } catch (error) {
    return res.send(error.message);
  }
};

const updatePost = async (req, res) => {
  const { postId, userId } = req.query;
  const body = req.body;

  // get the post
  const post = await postModel.findById(postId);
  if (!post) {
    return res.send("post does not exist !!! ")
  }

  // check post owner
  if (userId != post.creator) {
    return res.send("You can only update your post!!!")
  }
  try {
    await postModel.findByIdAndUpdate(postId, { ...body }, { new: true });
    res.send("post updated successfully")
  } catch (error) {
    return res.send ("Something went wrong!!!")
  }
};

// get all posts by user
const getPosts =  async (req, res) => {
  const { userId } = req.query;
  try {
    const posts = await postModel.find({ creator: userId }) // get all posts by a user
    return res.json(posts);
  } catch (error) {
    return res.send("Something went wrong.")
  }
}
// get single post
const getSinglePost = async (req, res) => {
  const { postId } = req.query;
  try {
    const post = await postModel.findById(postId).populate("creator")
    return res.json(post);


  } catch (error) {
    return res.send('something went wrong')
  }
};
module.exports = { createPost, deletePost, updatePost, getPosts,getSinglePost};
const  mongoose  = require("mongoose");
const kycModel = require("../models/kyc.model")
const userModel = require("../models/user.model")


const createKyc = async (req, res) => {
    const payload = req.body;
  const { id } = req.user;
  // check kyc existance 
  const checkKyc = await kycModel.findOne({ user: id });
  if (checkKyc) {
    return res.json({message: "kyc already exist"})
  }
  try {
    const newKyc = new kycModel({ user: id, ...payload });// create  kyc
    const savedKyc = await newKyc.save();

    // update user details
    await userModel.findByIdAndUpdate(id, { kyc: savedKyc.id },{new: true});

  } catch (error) {
    return res.send("something went wrong")
  }
    
}
const getOneKyc = async (req, res) => {
  const { kycId } = req.query;
  try {
    const kyc = await kycModel.findById(kycId).populate("user")// to populate the user info in kyc
    
    console.log(typeof kyc.user);
    return res.json(kyc)

   

    
  } catch (error) {
    return res.send("something went wrong")
  }
}
module.exports = { createKyc, getOneKyc };
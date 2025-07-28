const mongoose = require("mongoose")

const kycSchema = new mongoose.Schema(
  {
  passportPhoto: {
    type: String,
    required: true
  },
  docType: {
    type: String,
    required: true
  },
  frontPage: {
    type: String,
    required: true
  },
  backPage: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  },
  { timestamps: true }
);

const kycModel = mongoose.model("Kyc", kycSchema);

module.exports = kycModel;
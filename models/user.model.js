const mongoose = require("mongoose"); // import 
const bcrypt = require("bcryptjs");

// create a schema for the user model..// create a method that accept an object for a schema. schema is how we want the info to be
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"],
        },
        admin: {
            type: Boolean,
            default: false,
        },
        married: {
            type: Boolean,
            required: false,
        },
            
        age: {
            type: Number,
            required: true,
            
        
        },
        kyc: {
            type: mongoose.Types.ObjectId,// one to one relationship btw kyc and user
            ref: "Kyc",
        },
        posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],// one to many relationships
        books:[{type: mongoose.Types.ObjectId, ref:"Book"}],
    },
    { timestamps: true }  // ✅ Correct placement: this is the Schema options object
);

// mongoose middleware is created before compiling model i.e after creating schema. it is your customise middleware

// DOCUMENT MIDDLEWARE USING PRE POST HOOK

userSchema.pre("save", function (next) {
    const hashedPassword = bcrypt.hashSync(this.password, 10) //10 means sort by 10
    this.password = hashedPassword; // 
    console.log(this);
    next();
    
});

userSchema.post("save", function (doc, next) {
    console.log(doc)
    next();
});

//MODEL MIDDLEWARE 
userSchema.pre("insertMany", function (next) {
    console.log("inserted many documents");
    next();
});

userSchema.post("insertMany", function (doc, next) {
    console.log(doc);
    next();

});

    // QUERY MIDDLEWARE
userSchema.pre("findOne", function (next) {
    console.log("finding one user")
    next();
});




// create model using schema
const userModel = mongoose.model("User", userSchema); // create model for a folder to be used in db which takes in two argument i.e user and userschema

module.exports = userModel;

//const Blogger = [
    //{ id: 1, name: "Mayowa", email: "mayowa@gmail.com", password: "123456" },
    //{ id: 2, name: "Musa", email: "emusa@gmail.com", password: "123456" },
    //{ id: 3, name: "Aisha", email: "aisha@gmail.com", password: "123456" },
//]

module.exports = bloggers


const mongoose = require('mongoose');

const bloggerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
});

const bloggerModel = mongoose.model('Blogger', bloggerSchema);

module.exports = bloggerModel;

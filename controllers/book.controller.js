const bookModel = require("../models/book.model");
const userModel = require("../models/user.model");

const createBook = async (req, res) => {
    const { authors, ...others } = req.body;
    const { id } = req.user // get user id 
    const allAuthors = [...authors, id] // get all creators
    
    try {

        // create book
        const newBook = new bookModel({ authors: allAuthors, ...others });
        const savedBook = await newBook.save();

        // update users info by user by using for of loop
        for (const authorId of allAuthors) {
            await userModel.findByIdAndUpdate(authorId, { $push: { books: savedBook.id } }
          );
        }
        return res.send("Book created successfully")
    } catch (error) {
      console.log(error)
        return res.send("Something went wrong")
    }
}

const getBook = async (req, res) => {
  const { bookId } = req.query;
  try {
    const book = await bookModel.findById(bookId).populate("authors")
    return res.json(book);
  } catch (error) {
    return res.send("book not found")
  }
}

module.exports= {createBook,getBook}
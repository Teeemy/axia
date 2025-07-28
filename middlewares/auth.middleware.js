const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const {token}= req.cookies // get the token from cookies

  if (!token) {
    return res.json({ message: "Please login to create a post" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.json({ message: "Invalid token" });
    }

    // attach user to request
    req.user = { id: payload.id, admin: payload.admin };
    next(); //only call next() after successful verify
  });
};

module.exports = authentication;

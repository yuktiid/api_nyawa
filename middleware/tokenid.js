const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Middleware2 } = process.env;

function tokenId(req, res, next) {
  const token = req.headers.authorization; 
 console.log(token)
  if (!token) { 
    return res.json({status:false, message: "Token tidak ditemukan" });
  } 

  jwt.verify(token, Middleware2, (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: "Token tidak valid" });
    }

    req.email = decoded.email;
    next();
  });
}

module.exports = tokenId;

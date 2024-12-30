const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Middleware } = process.env;
function verifyToken(req, res, next) {
  const token = req.headers.authorization; 
 
  if (!token) { 
    return res.json({status:false, message: "Token tidak ditemukan" });
  } 

  jwt.verify(token, Middleware, (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: "Token tidak valid" });
    }
    req.userId = decoded.userId; // Menyimpan ID pengguna dalam objek permintaan
    next();
  }); 
}
module.exports = verifyToken;

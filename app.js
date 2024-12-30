var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, 
    max: 300, 
    message: 'Too many requests, please try again later.'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produksRouter = require("./routes/produks");
var kategorisRouter = require("./routes/kategoris");
var paymentsRouter = require("./routes/payments");
var fendRouter = require("./routes/fend");
var loginFe = require("./routes/login-fe");
// var cartsRouter = require("./routes/carts");
var app = express();
app.use(limiter);
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:8000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Akses ditolak oleh CORS"));
    }
  },
  allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
  allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/produks", produksRouter);
app.use("/kategoris", kategorisRouter);
app.use("/payments", paymentsRouter);
app.use("/fend", fendRouter);
app.use("/login-fe", loginFe);
app.use('/users', usersRouter);
app.get("/media/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/routes/file/media/${filename}`);
});
module.exports = app;
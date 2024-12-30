const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { Middleware2,Email, PassEmail, } = process.env;
const apikey = require("../middleware/apikey");
let verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email, 
    pass:  PassEmail
}
});

router.post('/send',apikey, (req, res) => {
  const {email} = req.body;

  const verificationCode = crypto.randomBytes(3).toString('hex');

  verificationCodes[email] = verificationCode;

  const mailOptions = {
    from: Email,
    to: email,
    subject: 'Kode Verifikasi Login',
    text: `Kode verifikasi login Anda adalah: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({
        status: false,
        message: 'Gagal mengirim email.',
      });
    }
    res.
    json({
      status: true,
      message: 'Email dengan kode verifikasi telah dikirim.',
    });
  });
});

router.post('/verify',apikey, (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] && verificationCodes[email] === code) {

    const token = jwt.sign({ email }, Middleware2, { expiresIn: '1h' });

    delete verificationCodes[email];

    res.json({
      status: true,
      message: 'Verifikasi berhasil, lanjutkan login.',
      email: email,
      token: token,
    });
  } else {
    res.json({
      status: false,
      message: 'Kode verifikasi tidak valid.',
    });
  }
});

module.exports = router;
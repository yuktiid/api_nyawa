var express = require("express");
var router = express.Router();
const { Users } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const crypto = require("crypto");
// Konfigurasi image
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var path = require("path");
const { MEDIA } = process.env;

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id_akun", "nama", "email", "status", "foto"],
      order: [["status", "ASC"]],
    });
    res.json({ users, MEDIA });
  } catch (error) {
    console.error(error);
    res.json({
      status: false,
      message: "Terjadi kesalahan saat mengambil daftar pengguna",
    });
  }
});

router.get("/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const users = await Users.findOne({
      where: { email },
      attributes: ["id_akun", "nama", "email", "status", "foto"],
    });
    if (!users) {
      return res.json({ status: false, message: "Data tidak ditemukan" });
    }
    res.json({ status: true, users, MEDIA });
  } catch (error) {
    console.error(error);
    res.json({
      status: false,
      message: "Terjadi kesalahan saat mengambil daftar pengguna",
    });
  }
});

router.post("/", verifyToken, upload.single("foto"), async (req, res) => {
  const { nama, email, password, status } = req.body;
  const exdata = await Users.findOne({ where: { email } });
  if (exdata) {
    return res.json({ status: false, message: "Email sudah ada!" });
  }
  // upload Image
  if (!req.file) {
    return res.json({ status: false, message: "Tidak ada gambar yang diunggah." });
  } 
  const { buffer, size } = req.file;
  // Periksa ukuran gambar
  if (size <= 300 * 1024) {
    var uniqueFileName = `foto-${Date.now()}-${Math.floor(
      Math.random() * 1000000000
    )}.webp`;

    fs.writeFileSync(path.join("routes/file/media", uniqueFileName), buffer);
  } else {
    if (size > 1024 * 1024) {
      var Tq = 20;
    } else if (size < 1024 * 1024) {
      var Tq = 30;
    }

    const compressedImageBuffer = await sharp(buffer)
      .jpeg({ quality: Tq })
      .toBuffer();

    var uniqueFileName = `foto-${Date.now()}-${Math.floor(
      Math.random() * 1000000000
    )}.webp`;

    fs.writeFileSync(
      path.join("routes/file/media", uniqueFileName),
      compressedImageBuffer
    );
  }
  // end upload Image
  try {
    const salt = crypto.randomBytes(16).toString("hex");

    const iterations = 10000;
    const keylen = 64;
    const digest = "sha512";
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, iterations, keylen, digest)
      .toString("hex");
    await Users.create({
      id_akun: Date.now(),
      nama,
      email,
      password: hashedPassword,
      salt,
      status,
      foto: uniqueFileName,
    });
    res.json({status:true, message: "Data pengguna berhasil ditambahkan" });
  } catch (error) {
    res.json({status:false, message: "Terjadi kesalahan saat membuat pengguna" });
  }
});

router.put(
  "/update/:id",
  verifyToken,
  upload.single("foto"),
  async (req, res) => {
    const data = await Users.findOne({ where: { id_akun: req.params.id } });
    // return res.json(req.body);
    if (!data) {
      return res.json({ status: false, message: "Data tidak ditemukan" });
    }
    const { nama, email } = req.body;

    // upload Image
    if (req.file) {
      const { buffer, size } = req.file;
      // Periksa ukuran gambar
      if (size <= 300 * 1024) {
        var uniqueFileName = `foto-${Date.now()}-${Math.floor(
          Math.random() * 1000000000
        )}.webp`;

        fs.writeFileSync(
          path.join("routes/file/media", uniqueFileName),
          buffer
        );
      } else {
        if (size > 1024 * 1024) {
          var Tq = 20;
        } else if (size < 1024 * 1024) {
          var Tq = 30;
        }

        const compressedImageBuffer = await sharp(buffer)
          .jpeg({ quality: Tq })
          .toBuffer();

        var uniqueFileName = `foto-${Date.now()}-${Math.floor(
          Math.random() * 1000000000
        )}.webp`;

        fs.writeFileSync(
          path.join("routes/file/media", uniqueFileName),
          compressedImageBuffer
        );
      }

      // Path file lama (jika ada)
      const oldFilePath = path.join("routes/file/media", data.foto);

      // Periksa apakah ada gambar lama yang perlu dihapus
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Hapus gambar lama
      }
    }
    // end upload Image

    const exupdate = { nama, email, foto: uniqueFileName };
    await Users.update(exupdate, { where: { id_akun: data.id_akun } });

    res.json({ status: true, message: "Data berhasil diupdate" });
  }
);

router.post("/change-password/:id", verifyToken, async (req, res) => {
  try {
    const id_akun = req.params.id;
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findOne({ where: { id_akun } });

    if (!user) {
      return res.json({ status: false, message: "Data tidak ditemukan" });
    }
    const iterations = 10000;
    const keylen = 64;
    const digest = "sha512";

    const oldHashedPassword = crypto
      .pbkdf2Sync(oldPassword, user.salt, iterations, keylen, digest)
      .toString("hex");

    if (oldHashedPassword !== user.password) {
      return res.json({ status: false, message: "Kata sandi lama salah" });
    }

    const newSalt = crypto.randomBytes(16).toString("hex");
    const newHashedPassword = crypto
      .pbkdf2Sync(newPassword, newSalt, iterations, keylen, digest)
      .toString("hex");

    user.password = newHashedPassword;
    user.salt = newSalt;
    await user.save();

    res.json({ status: true, message: "Kata sandi berhasil diubah" });
  } catch (error) {
    return res.json({
      status: false,
      message: "Terjadi kesalahan saat mengubah kata sandi",
    });
  }
});

router.delete("/delete/:email", verifyToken, async (req, res) => {
  const data = await Users.findOne({ where: { email: req.params.email } });
  if (!data) {
    return res.json({ status: false, message: "Data tidak ditemukan" });
  }
  const oldFilePath = path.join("routes/file/media", data.foto);

  if (fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }
  await data.destroy();
  return res.json({ status: true, message: "Data berhasil dihapus" });
});

/* login */
const { Middleware } = process.env;
const jwt = require("jsonwebtoken");
const revokedTokens = [];
// Memverifikasi login pengguna
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user) {
      const iterations = 10000;
      const keylen = 64;
      const digest = "sha512";
      const hashedPassword = crypto
        .pbkdf2Sync(password, user.salt, iterations, keylen, digest)
        .toString("hex");

      if (hashedPassword === user.password) {
        const data = {
          id_akun: user.id_akun,
          nama: user.nama,
          email: user.email,
          status: user.status,
          foto: MEDIA + user.foto,
        };

        const token = jwt.sign(
          {
            userId: user.id_akun,
          },
          Middleware
        );

        res.json({
          status: true,
          message: "Login berhasil",
          user_data: data,
          jwt_token: token,
        });
      } else {
        return res.json({ status: false });
      }
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: "Terjadi kesalahan saat memproses login",
    });
  }
});

router.post("/logout", verifyToken, (req, res) => {
  const { token } = req.body;
  revokedTokens.push(token);

  res.json({ message: "Token dicabut (logout) berhasil" });
});

/* end login */
module.exports = router;

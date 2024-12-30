var express = require("express");
var router = express.Router();
const { Kategoris, Users } = require("../models");
const verifyToken = require("../middleware/verifyToken");
// Konfigurasi image
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var path = require("path");
const { MEDIA } = process.env;

router.get("/", verifyToken, async (req, res, next) => {
  const data = await Kategoris.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Users,
        attributes: ["id_akun", "nama", "email", "foto"],
        as: "author",
      },
    ],
  });
  
  res.json({ data, MEDIA });
});

router.post("/add", verifyToken, upload.single("foto"), async (req, res) => {
  try {
    const { id_akun, nama_kategori, slug, deskripsi } = req.body;
    const exdata = await Kategoris.findOne({ where: { nama_kategori } });
    if (exdata) {
      return res.json({ status: false, message: "Nama kategori sudah ada" });
    }
    // upload Image
    if (!req.file) {
      return res.send("Tidak ada gambar yang diunggah.");
    }
    const { buffer, size } = req.file;
    // Periksa ukuran gambar
    if (size <= 300 * 1024) {
      var uniqueFileName = `cat-${Date.now()}-${Math.floor(
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

      var uniqueFileName = `cat-${Date.now()}-${Math.floor(
        Math.random() * 1000000000
      )}.webp`;

      fs.writeFileSync(
        path.join("routes/file/media", uniqueFileName),
        compressedImageBuffer
      );
    }
    // end upload Image
    await Kategoris.create({
      id_kategori: Date.now(),
      id_akun,
      nama_kategori,
      slug,
      deskripsi,
      gambar: uniqueFileName,
    });
    res
      .status(200)
      .json({ status: true, message: "Kategori Berhasil Disimpan" });
  } catch (error) {
    res.json({
      status: false,
      message: "Terjadi kesalahan saat membuat Kategori",
    });
  }
});

router.put("/update/:slug",verifyToken,upload.single("foto"),async (req, res) => {
    try {
      const slugs = req.params.slug;

      const data = await Kategoris.findOne({ where: { slug: slugs } });
      if (!data) {
        return res.json({ status: false, message: "Kategori tidak ditemukan" });
      }
      // upload Image
      if (req.file) {
        const { buffer, size } = req.file;
        // Periksa ukuran gambar
        if (size <= 300 * 1024) {
          var uniqueFileName = `cat-${Date.now()}-${Math.floor(
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

          var uniqueFileName = `cat-${Date.now()}-${Math.floor(
            Math.random() * 1000000000
          )}.webp`;

          fs.writeFileSync(
            path.join("routes/file/media", uniqueFileName),
            compressedImageBuffer
          );
        }

        // Path file lama (jika ada)
        const oldFilePath = path.join("routes/file/media", data.gambar);

        // Periksa apakah ada gambar lama yang perlu dihapus
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Hapus gambar lama
        }
      }
      // end upload Image
      const { id_akun, nama_kategori, slug, deskripsi } = req.body;
      const exupdate = { id_akun, nama_kategori, slug, deskripsi, gambar: uniqueFileName };
      await Kategoris.update(exupdate, {
        where: { id_kategori: data.id_kategori },
      });
      res.json({ status: true, message: "Kategori berhasil diubah" });
    } catch (error) {
      res.json({ error: "Terjadi kesalahan saat merubah Kategori" });
    }
  }
);
router.delete("/delete/:slugs", verifyToken, async (req, res) => {
  try {
    const data = await Kategoris.findOne({ where: { slug: req.params.slugs } });
    if (!data) {
      return res.json({ status: false, message: "Data tidak ditemukan" });
    }
    const oldFilePath = path.join("routes/file/media", data.gambar);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
    await data.destroy();
    return res.json({ status: true, message: "Data berhasil dihapus" });
  } catch (error) {
    res.json({ error: "Terjadi kesalahan saat menghapus Kategori" });
  }
});

module.exports = router;

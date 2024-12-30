var express = require("express");
var router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const tokenId = require("../middleware/tokenid");
const { Produks, Kategoris, Users, Payments, PaymentItems } = require("../models");
require("dotenv").config();
const { MEDIA } = process.env;
// Konfigurasi image
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var path = require("path");

router.get("/",verifyToken, async (req, res, next) => { 
  const data = await Produks.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Kategoris,
        attributes: ["nama_kategori", "slug"],
        as: "kategori_id",
      },
      {
        model: Users,
        attributes: ["id_akun", "nama", "email", "foto"],
        as: "author",
      },
    ],
  });
  res.json({ status: true, data, MEDIA });
});

router.get("/payment/all", verifyToken, async (req, res, next) => {
  try {
    const pending = await Payments.findAll({
      where: { status: "pending" },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: PaymentItems,
          as: "items",
          include: [
            {
              model: Produks,
              as: "produk",
              include: [
                {
                  model: Kategoris,
                  attributes: ["nama_kategori", "slug"],
                  as: "kategori_id",
                },
              ],
            },
          ],
        },
      ],
    });

    const settled = await Payments.findAll({
      where: { status: "settled" },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: PaymentItems,
          as: "items",
          include: [
            {
              model: Produks,
              as: "produk",
              include: [
                {
                  model: Kategoris,
                  attributes: ["nama_kategori", "slug"],
                  as: "kategori_id",
                },
              ],
            },
          ],
        },
      ],
    });

    const delivered = await Payments.findAll({
      where: { status: "delivered" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: PaymentItems,
          as: "items",
          include: [
            {
              model: Produks,
              as: "produk",
              include: [
                {
                  model: Kategoris,
                  attributes: ["nama_kategori", "slug"],
                  as: "kategori_id",
                },
              ],
            },
          ],
        },
      ],
    });

    const accepted = await Payments.findAll({
      where: { status: "accepted" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: PaymentItems,
          as: "items",
          include: [
            {
              model: Produks,
              as: "produk",
              include: [
                {
                  model: Kategoris,
                  attributes: ["nama_kategori", "slug"],
                  as: "kategori_id",
                },
              ],
            },
          ],
        },
      ],
    });

    res.json({ status: true, pending, settled, delivered, accepted, MEDIA });
  } catch (error) {
    next(error);
  }
});

router.get("/payment/all/:email",tokenId, async (req, res, next) => {
  const {email} = req.params
  try {
    const pending = await Payments.findAll({
      where: { status: "pending", email: email },
      order: [["updatedAt", "DESC"]],
      attributes: ["nama_pengiriman", "harga_pengiriman", "total_harga", "checkout_link"],
      include: [
        {
          model: PaymentItems,
          as: "items",
          attributes: ["nama_produk", "ukuran", "jumlah_barang", "harga_satuan"],
          include: [
            {
              model: Produks,
              as: "produk",
              attributes: ["gambar"],
            },
          ],
        },
      ],
    });

    const settled = await Payments.findAll({
      where: { status: "settled", email: email },
      order: [["updatedAt", "DESC"]],
      attributes: ["nama_pengiriman", "harga_pengiriman", "total_harga"],
      include: [
        {
          model: PaymentItems,
          as: "items",
          attributes: ["nama_produk", "ukuran", "jumlah_barang", "harga_satuan"],
          include: [
            {
              model: Produks,
              as: "produk",
              attributes: ["gambar"],
            },
          ],
        },
      ],
    });

    const delivered = await Payments.findAll({
      where: { status: "delivered", email: email },
      order: [["createdAt", "DESC"]],
      attributes: ["id_payment","nama_pengiriman", "harga_pengiriman", "total_harga", "noResi"],
      include: [
        {
          model: PaymentItems,
          as: "items",
          attributes: ["nama_produk", "ukuran", "jumlah_barang", "harga_satuan"],
          include: [
            {
              model: Produks,
              as: "produk",
              attributes: ["gambar"],
            },
          ],
        },
      ],
    });

    const accepted = await Payments.findAll({
      where: { status: "accepted", email: email },
      order: [["createdAt", "DESC"]],
      attributes: ["nama_pengiriman", "harga_pengiriman", "total_harga", "noResi"],
      include: [
        {
          model: PaymentItems,
          as: "items",
          attributes: ["nama_produk", "ukuran", "jumlah_barang", "harga_satuan"],
          include: [
            {
              model: Produks,
              as: "produk",
              attributes: ["gambar"],
              
            },
          ],
        },
      ],
    });

    res.json({ status: true, pending, settled, delivered, accepted, MEDIA });
  } catch (error) {
    next(error);
  }
});

router.get("/:slug",verifyToken, async (req, res, next) => {
  const slug = req.params.slug;
  const data = await Produks.findOne({
    where: { slug },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Kategoris,
        attributes: ["id_kategori", "nama_kategori", "slug"],
        as: "kategori_id",
      },
      {
        model: Users,
        attributes: ["id_akun", "nama", "email", "foto"],
        as: "author",
      },
    ],
  });
  if (!data) {
    return res.json({ status: false, message: "Data tidak ditemukan" });
  }
  res.json({ status: true, data, MEDIA });
});

router.post("/add-produk",verifyToken, upload.array("images"), async (req, res) => {
  const {
    id_akun,
    nama_produk,
    slug,
    deskripsi,
    id_kategori,
    stok,
    harga,
    diskon,
    ukuran,
    berat,
    warna,
  } = req.body;

  const exdata = await Produks.findOne({ where: { nama_produk } });
  if (exdata) {
    return res.json({ status: false, message: "Nama Produk sudah ada" });
  }
  const compressedImages = [];
  const images = req.files;
  for (const image of images) {
    const { buffer, size } = image;
    if (size <= 300 * 1024) {
      var uniqueFileName = `foto-${Date.now()}-${Math.floor(
        Math.random() * 1000000000
      )}.webp`;

      fs.writeFileSync(path.join("routes/file/media", uniqueFileName), buffer);
    } else {
      // Periksa ukuran gambar
      if (size > 1024 * 1024) {
        Tq = 20;
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
    compressedImages.push(uniqueFileName);
  }
  // bhj
  await Produks.create({
    id_produk: Date.now(),
    id_akun,
    nama_produk,
    slug,
    deskripsi,
    id_kategori,
    stok,
    harga,
    diskon,
    ukuran,
    berat,
    warna,
    gambar: JSON.stringify(compressedImages),
  });
  res.status(200).json({ status: true, message: "Produk Berhasil Disimpan" });
});

router.put(
  "/update-produk/:slugs",
  verifyToken,upload.array("images"),
  async (req, res) => {
    const exdata = await Produks.findOne({ where: { slug: req.params.slugs } });
    if (!exdata) {
      return res.json({ status: false, message: "Data tidak ditemukan" });
    }

    const compressedImages = [];
    const images = req.files;
    for (const image of images) {
      const { buffer, size } = image;
      if (size <= 300 * 1024) {
        var uniqueFileName = `foto-${Date.now()}-${Math.floor(
          Math.random() * 1000000000
        )}.webp`;

        fs.writeFileSync(
          path.join("routes/file/media", uniqueFileName),
          buffer
        );
      } else {
        // Periksa ukuran gambar
        if (size > 1024 * 1024) {
          Tq = 20; // Kualitas kompresi yang lebih tinggi untuk gambar besar
        } else if (size < 1024 * 1024) {
          var Tq = 30;
        }

        // Mengompres gambar
        const compressedImageBuffer = await sharp(buffer)
          .jpeg({ quality: Tq })
          .toBuffer();

        // Simpan gambar yang sudah dikompres
        var uniqueFileName = `foto-${Date.now()}-${Math.floor(
          Math.random() * 1000000000
        )}.webp`;

        fs.writeFileSync(
          path.join("routes/file/media", uniqueFileName),
          compressedImageBuffer
        );
      }
      // Simpan data gambar
      compressedImages.push(uniqueFileName);
    }
    const gold = JSON.parse(exdata.gambar);

    const gnew = gold.concat(compressedImages);
    const {
      id_akun,
      nama_produk,
      slug,
      deskripsi,
      id_kategori,
      stok,
      harga,
      diskon,
      ukuran,
      berat,
      warna,
    } = req.body;
    const exupdate = {
      id_akun,
      nama_produk,
      slug,
      deskripsi,
      id_kategori,
      stok,
      harga,
      diskon,
      ukuran,
      berat,
      warna,
      gambar: JSON.stringify(gnew),
    };
    await Produks.update(exupdate, {
      where: { id_produk: exdata.id_produk },
    });
    res.status(200).json({ status: true, message: "Produk Berhasil Diupdate" });
  }
);

router.delete("/delete-produk/:slug",verifyToken, async (req, res) => {
  const { slug } = req.params;
  const data = await Produks.findOne({ where: { slug } });
  if (!data) {
    return res.json({ status: false, message: "Produk tidak ditemukan" });
  }
  const gambar = JSON.parse(data.gambar);
  for (const gm of gambar) {
    const oldFilePath = path.join("routes/file/media", gm);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }
  await data.destroy();
  res.json({ status: true, message: "Produk berhasil dihapus" });
});

router.delete("/delgam/:id_produk/:nama_gambar", async (req, res) => {
  const { id_produk, nama_gambar } = req.params;
  const data = await Produks.findByPk(id_produk);
  if (!data) {
    return res.json({ status: false, message: "Data tidak ditemukan" });
  }
  const gambar = JSON.parse(data.gambar);
  const index = gambar.indexOf(nama_gambar);
  if (index !== -1) {
    gambar.splice(index, 1);
    data.gambar = JSON.stringify(gambar);
    const oldFilePath = path.join("routes/file/media", nama_gambar);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
    // Simpan data
    await data.save();
  }
  res.json({ status: true, message: "Gambar berhasil dihapus" });
});

// Endpoint untuk mengunggah gambar
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  if (req.file) {
    const { buffer, size } = req.file;
    // Periksa ukuran gambar
    if (size <= 300 * 1024) {
      var uniqueFileName = `foto-${Date.now()}-${Math.floor(
        Math.random() * 1000000000
      )}.webp`;

      fs.writeFileSync(path.join("routes/file/media", uniqueFileName), buffer);
    }

    if (size > 1024 * 1024) {
      var Tq = 20;
    } else if (size < 1024 * 1024) {
      var Tq = 30;
    }
    // Mengompres gambar
    const compressedImageBuffer = await sharp(buffer)
      .jpeg({ quality: Tq })
      .toBuffer();

    // Simpan gambar ke file atau kirim sebagai respons, sesuai kebutuhan Anda
    var uniqueFileName = `foto-${Date.now()}-${Math.floor(
      Math.random() * 1000000000
    )}.webp`;

    fs.writeFileSync(
      path.join("routes/file/media", uniqueFileName),
      compressedImageBuffer
    );
    // Gambar telah diunggah, berikan respons
    const imageUrl = `${MEDIA}${uniqueFileName}`;
    console.log(`${imageUrl}`);
    res.json({ uploaded: 1, url: imageUrl });
  } else {
    res.json({ uploaded: 0, error: "Gagal mengunggah gambar" });
  }
});
module.exports = router;

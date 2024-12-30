var express = require("express");
var router = express.Router();
const { Produks, Kategoris, Users } = require("../models");
require("dotenv").config();
const { MEDIA, RajaOngkir } = process.env;
var CryptoJS = require("crypto-js");
const apikey = require("../middleware/apikey");
router.post("/enkripsi", async (req, res) => {
  try { 
    const encryptedData = req.body.enk;
    const encryptedDatas = atob(encryptedData);
    const key = "your_secret_key1q2w3e4r";
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedDatas, key);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );
    res.json({ status: true, data:decryptedData });
  } catch (error) {
    res.json({
      status: false,
      message: "Gagal enkripsi data",
    });
  }
});

router.get("/",apikey, async (req, res, next) => {
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

  // Mengubah struktur objek sebelum mengirimkannya sebagai respons
  const modifiedData = data.map((product) => {
    // Menguraikan string JSON untuk mendapatkan array gambar
    const gambarArray = JSON.parse(product.gambar);

    // Ambil gambar pertama sebagai img_thumb
    const imgThumb = gambarArray[0];

    // Jika ada gambar kedua, ambil sebagai img_hover, jika tidak, beri nilai null
    const imgHover = gambarArray[1] || null;
    // Mengembalikan objek yang telah diubah
     const stokObj = JSON.parse(product.stok).reduce(
       (acc, curr) => ({ ...acc, ...curr }),
       {}
     );
    return {
      id_produk: product.id_produk,
      nama_produk: product.nama_produk,
      slug: product.slug,
      stok: stokObj,
      warna: product.warna,
      ukuran: JSON.parse(product.ukuran),
      berat: product.berat,
      harga: product.harga,
      diskon: product.diskon,
      img_thumb: imgThumb,
      img_hover: imgHover,
      images: gambarArray,
      nama_kategori: product.kategori_id.nama_kategori,
      slug_kategori: product.kategori_id.slug,
      nama_author: product.author.nama,
      email: product.author.email,
      foto_author: product.author.foto,
    };
  });

  res.json({ status: true, data: modifiedData, MEDIA });
});

router.get("/promo",apikey, async (req, res, next) => {
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

  // Mengubah struktur objek sebelum mengirimkannya sebagai respons
  const modifiedData = data
    .filter((product) => product.diskon > 0) // Filter produk yang memiliki diskon
    .map((product) => {
      // Menguraikan string JSON untuk mendapatkan array gambar
      const gambarArray = JSON.parse(product.gambar);

      // Ambil gambar pertama sebagai img_thumb
      const imgThumb = gambarArray[0];

      // Jika ada gambar kedua, ambil sebagai img_hover, jika tidak, beri nilai null
      const imgHover = gambarArray[1] || null;

      // Mengubah stok dari array objek menjadi satu objek
      const stokObj = JSON.parse(product.stok).reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );

      return {
        id_produk: product.id_produk,
        nama_produk: product.nama_produk,
        slug: product.slug,
        stok: stokObj,
        warna: product.warna,
        ukuran: JSON.parse(product.ukuran),
        berat: product.berat,
        harga: product.harga,
        diskon: product.diskon,
        img_thumb: imgThumb,
        img_hover: imgHover,
        images: gambarArray,
        nama_kategori: product.kategori_id.nama_kategori,
        slug_kategori: product.kategori_id.slug,
        nama_author: product.author.nama,
        email: product.author.email,
        foto_author: product.author.foto,
      };
    });

  res.json({ status: true, data: modifiedData, MEDIA });
});


router.get("/produk/:slugs",apikey, async (req, res) => {
  const { slugs } = req.params;
  const data = await Produks.findOne({
    where: { slug: slugs },
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

  if (!data) {
    // Handle the case where no product is found with the given slug
    return res.json({ status: false, message: "Product not found" });
  }

  // Mengembalikan objek yang telah diubah
  const modifiedData = {
    id_produk: data.id_produk,
    images: JSON.parse(data.gambar),
    nama_produk: data.nama_produk,
    slug: data.slug,
    deskripsi: data.deskripsi,
    stok: JSON.parse(data.stok).reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    ),
    warna: data.warna,
    ukuran: JSON.parse(data.ukuran),
    berat: data.berat,
    harga: data.harga,
    diskon: data.diskon,
    nama_kategori: data.kategori_id.nama_kategori,
    slug_kategori: data.kategori_id.slug,
    nama_author: data.author.nama,
    email: data.author.email,
    foto_author: data.author.foto,
  };

  res.json({ status: true, data: modifiedData, MEDIA });
});

router.get('/kategori',apikey, async (req, res) => {
  const data = await Kategoris.findAll()
  res.json({status: true, data, MEDIA})
})

router.get('/kategori/:slug', async (req, res) => {
  const {slug} = req.params
  const kategori = await Kategoris.findOne({
    where: {slug}
  })
  if (!kategori) {
    return res.json({status: false, message:"Kategori tidak ada"})
  }
  const data = await Produks.findAll({
    where: {id_kategori: kategori.id_kategori},
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
  // Mengubah struktur objek sebelum mengirimkannya sebagai respons
  const modifiedData = data.map((product) => {
    // Menguraikan string JSON untuk mendapatkan array gambar
    const gambarArray = JSON.parse(product.gambar);

    // Ambil gambar pertama sebagai img_thumb
    const imgThumb = gambarArray[0];

    // Jika ada gambar kedua, ambil sebagai img_hover, jika tidak, beri nilai null
    const imgHover = gambarArray[1] || null;
    // Mengembalikan objek yang telah diubah
     const stokObj = JSON.parse(product.stok).reduce(
       (acc, curr) => ({ ...acc, ...curr }),
       {}
     );
    return {
      id_produk: product.id_produk,
      nama_produk: product.nama_produk,
      slug: product.slug,
      stok: stokObj,
      warna: product.warna,
      ukuran: JSON.parse(product.ukuran),
      berat: product.berat,
      harga: product.harga,
      diskon: product.diskon,
      img_thumb: imgThumb,
      img_hover: imgHover,
      images: gambarArray,
      nama_kategori: product.kategori_id.nama_kategori,
      slug_kategori: product.kategori_id.slug,
      nama_author: product.author.nama,
      email: product.author.email,
      foto_author: product.author.foto,
    };
  });
  res.json({status: true, kategori,data: modifiedData, MEDIA})
})

router.get('/api/province',apikey, async (req, res) => {
  try {
    const response = await fetch('https://api.rajaongkir.com/starter/province', {
      headers: {
        key: RajaOngkir
      }
    });
    const data = await response.json();
    res.json(data.rajaongkir.results);
  } catch (error) {
    res.status(500).send('Error fetching provinces');
  }
});

router.get('/api/city/:provinceId',apikey, async (req, res) => {
    const { provinceId } = req.params;
    try {
        const response = await fetch(`https://api.rajaongkir.com/starter/city?province=${provinceId}`, {
            headers: {
                key: RajaOngkir
            }
        });
        const data = await response.json();
        res.json(data.rajaongkir.results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cities' });
    }
});

router.post('/cek-ongkir', async (req, res) => {
  try {
    const { origin, destination, weight, courier } = req.body; // Ambil data dari request body

    const response = await fetch('https://api.rajaongkir.com/starter/cost', {
      method: 'POST',
      headers: {
        key: RajaOngkir,
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        origin,         // ID kota asal
        destination,    // ID kota tujuan
        weight,         // Berat barang dalam gram
        courier         // Kurir yang dipilih (jne, tiki, pos)
      }).toString()
    });

    const data = await response.json();
    res.json(data.rajaongkir.results[0].costs); // Kirim hasil ongkir ke frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipping cost' });
  }
});

module.exports = router;

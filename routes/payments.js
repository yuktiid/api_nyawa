var express = require("express");
var router = express.Router();
const { Produks, Payments, PaymentItems } = require("../models");
const { v4: uuidv4 } = require('uuid');
const tokenId = require("../middleware/tokenid");
router.post("/", async (req, res) => {
  const {
    nama,
    email,
    checkout_link,
    external_id,
    no_hp,
    total_harga,
    alamat,
    berat,
    items, // Array of items
    nama_pengiriman,
    harga_pengiriman,
  } = req.body;

  try {
    // Buat entri pembayaran
    const payment = await Payments.create({
      id_payment: Date.now().toString(), // Generate payment ID
      nama,
      email,
      checkout_link,
      external_id,
      no_hp,
      alamat,
      harga_pengiriman,
      berat,
      total_harga,
      nama_pengiriman,
      status: "pending",
    });

    // Loop through items array and create PaymentItems for each
    await Promise.all(
      items.map(async (item) => {
        await PaymentItems.create({
          id_item: uuidv4(), // Unique item ID, can use UUID or another approach
          id_payment: payment.id_payment,
          id_produk: item.id_produk,
          nama_produk: item.nama_produk,
          ukuran: item.ukuran,
          jumlah_barang: item.jumlah_barang,
          harga_satuan: item.harga_satuan,
          total_harga: item.jumlah_barang * item.harga_satuan,
        });

        // Mengurangi stok berdasarkan ukuran
        const produk = await Produks.findByPk(item.id_produk);
        if (produk) {
          const stok = JSON.parse(produk.stok);

          // Cari stok yang sesuai dengan ukuran di dalam array
          const sizeIndex = stok.findIndex(s => s.hasOwnProperty(item.ukuran));

          if (sizeIndex !== -1) {
            // Mengurangi stok sesuai ukuran
            stok[sizeIndex][item.ukuran] -= item.jumlah_barang;

            // Pastikan stok tidak kurang dari 0
            if (stok[sizeIndex][item.ukuran] < 0) {
              stok[sizeIndex][item.ukuran] = 0;
            }

            // Simpan stok yang sudah diperbarui
            produk.stok = JSON.stringify(stok);
            await produk.save();
          } else {
            throw new Error(`Ukuran ${item.ukuran} tidak tersedia dalam stok.`);
          }
        } else {
          throw new Error(`Produk dengan ID ${item.id_produk} tidak ditemukan.`);
        }
      })
    );

    res.json({
      status: true,
      message: "Pembayaran berhasil diproses",
      checkout_link,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat memproses pembayaran",
    });
  }
});

router.post("/webhook", async (req, res) => {
  res.json({ status: true, message: "Webhook received" }); // Respons segera

  // Lakukan pemrosesan data di latar belakang
  processWebhookData(req.body).catch(error => {
    console.error("Error processing webhook data:", error);
  });
});

async function processWebhookData(data) {

  try {
    // Pastikan data adalah array
    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }

    for (const item of data) {
      if (!item || !item.status || !item.external_id) {
        console.error("Missing required fields in webhook item");
        continue;
      }

      const status = item.status.toLowerCase();
      const externalId = item.external_id;

      // Proses setiap item
      const payment = await Payments.findOne({ where: { external_id: externalId } });

      if (!payment) {
        console.log("Payment not found for external_id:", externalId);
        continue;
      }

      if (payment.status === "settled") {
        console.log("Payment already processed for external_id:", externalId);
        continue;
      }

      await payment.update({ status });
      console.log("Payment status updated for external_id:", externalId);
    }
  } catch (error) {
    console.error("Error processing webhook data:", error.message);
  }
}

router.post("/pesanan-selesai/:id_payment", tokenId, async (req, res) => {
  const { id_payment } = req.params
  try{
    const payment = await Payments.findOne({ where: { id_payment } });
    if(!payment){
      return res.json({status: false, message: "Tidak ada pesanan"})
    }
    await payment.update({ status: "accepted" });
    res.json({status: true, message: "Pesanan telah sampai"})
  }catch(error){
    res.json({status: false, message: "Gagal merubah status pesanan"})
  }
})



router.put("/add-resi/:id_payment", async (req, res) => {
  const { id_payment } = req.params;
  const { noResi } = req.body;
  const data = await Payments.findOne({ where: { noResi } });
  if (data) {
    return res.json({ status: false, message: "No.Resi sudah ada!" });
  }
  await Payments.update(
    { noResi, status: "delivered" },
    {
      where: { id_payment },
    }
  );

  res.json({ status: true, message: "No.Resi berhasil ditambahkan" });
});

async function deleteStatus(){
  try {
    const data = await Payments.findAll({
      where: {status: 'expired'}
    })
    if (!data || data.length === 0) {
      console.log("Tidak ada data yang memenuhi kondisi.");
      return;
    }
    await Promise.all(data.map(item => item.destroy()));
    console.log(`${data.length} data dengan status 'expired' telah dihapus.`);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}
const intervalInMilliseconds = 60 * 60 * 1000; // 5 menit
setInterval(deleteStatus, intervalInMilliseconds);

// Mulai pembaruan pertama kali saat aplikasi berjalan
// deleteStatus();

module.exports = router;

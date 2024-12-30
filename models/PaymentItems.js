// paymentItems.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentItems = sequelize.define(
    "PaymentItems",  // Pastikan nama model sesuai
    {
      id_item: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_payment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_produk: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_produk: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ukuran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah_barang: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harga_satuan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "paymentitems",
    }
  );

  // Asosiasi dengan Payments dan Produks
  PaymentItems.associate = (models) => {
    PaymentItems.belongsTo(models.Payments, {
      foreignKey: "id_payment",
      as: "payment",
    });
    PaymentItems.belongsTo(models.Produks, {
      foreignKey: "id_produk",
      as: "produk",
    });
  };

  return PaymentItems;
};

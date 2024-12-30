// payments.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Payments = sequelize.define(
    "Payments",
    {
      id_payment: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      noResi: {
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      checkout_link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_pengiriman: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga_pengiriman: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      berat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_harga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "payments",
    }
  );

  // Asosiasi dengan PaymentItems
  Payments.associate = (models) => {
    Payments.hasMany(models.PaymentItems, {
      foreignKey: "id_payment",
      as: "items",
    });
  };
  
  return Payments;
};

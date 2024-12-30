const { DataTypes } = require("sequelize");
// h
module.exports = (sequelize) => {
  const Produks = sequelize.define(
    "Produks",
    {
      id_produk: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_akun: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_kategori: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_produk: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stok: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      warna: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ukuran: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      berat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      diskon: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gambar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "produks",
    }
  );
Produks.associate = (models) => {
  Produks.belongsTo(models.Kategoris, {
    foreignKey: "id_kategori",
    as: "kategori_id",
  });
  Produks.belongsTo(models.Users, {
    foreignKey: "id_akun",
    as: "author",
  });
};
  return Produks;
};

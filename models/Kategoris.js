const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Kategoris = sequelize.define(
    "Kategoris",
    {
      id_kategori: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_kategori: {
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
      gambar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "kategoris",
    }
  );
Kategoris.associate = (models) => {
  Kategoris.belongsTo(models.Users, {
    foreignKey: "id_akun",
    as: "author",
  });
};
  return Kategoris;
};

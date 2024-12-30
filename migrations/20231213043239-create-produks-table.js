'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("produks", {
      id_produk: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_akun: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_kategori: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_produk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stok: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      warna: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ukuran: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      berat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      harga: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      diskon: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gambar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produks');
    
  }
};

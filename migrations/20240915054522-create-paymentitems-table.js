module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("paymentItems", {
      id_item: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_produk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_produk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ukuran: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlah_barang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      harga_satuan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_harga: {
        type: Sequelize.INTEGER,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("paymentItems");
  }
};

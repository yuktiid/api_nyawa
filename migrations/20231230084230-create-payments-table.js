module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id_payment: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      noResi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      checkout_link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      external_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_hp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_pengiriman: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      harga_pengiriman: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      berat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_harga: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  }
};

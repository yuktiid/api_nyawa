'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("kategoris", {
      id_kategori: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_akun: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_kategori: {
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
      gambar: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('kategoris');
    
  }
};

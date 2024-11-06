'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Items', 'courierNote', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Menghapus kolom 'description'
    await queryInterface.removeColumn('Items', 'description');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Items', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('Items', 'courierNote');
  }
};

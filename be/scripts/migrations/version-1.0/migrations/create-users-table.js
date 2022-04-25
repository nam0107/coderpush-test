'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
          },
          full_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue: 0,
          },
          age: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          image: {
            type: Sequelize.DataTypes.STRING,
          },
          meta_data: {
            type: Sequelize.DataTypes.JSON,
            allowNull: true,
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: true,
          },
          updated_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: true,
          },
        },
        { schema: process.env.POSTGRES_SCHEMA }
      );
    } catch (error) {
      console.error(`CREATE USER ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'users',
      schema: process.env.POSTGRES_SCHEMA,
    });
  },
};

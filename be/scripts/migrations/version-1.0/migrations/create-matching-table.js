'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        'matchings',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
          },
          from_user_id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          to_user_id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
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
      console.error(`CREATE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'matchings',
      schema: process.env.POSTGRES_SCHEMA,
    });
  },
};

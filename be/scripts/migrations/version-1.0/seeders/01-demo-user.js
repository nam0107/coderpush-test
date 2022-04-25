// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const randomUser = [];
    const totalUser = 20;
    for (var i = 0; i < totalUser; i++) {
      const passed = [];
      // const liked = i === 0 ? [4, 5, 6] : [];

      randomUser.push({
        full_name: faker.name.findName(),
        age: faker.random.number({ min: 18, max: 30 }),
        meta_data: JSON.stringify({ passed }),
        image: `/images/${i % 10}.jpg`,
      });
    }

    return queryInterface.bulkInsert(
      { tableName: 'users', schema: process.env.POSTGRES_SCHEMA },
      randomUser,
      {
        schema: process.env.POSTGRES_SCHEMA,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      { tableName: 'users', schema: process.env.POSTGRES_SCHEMA },
      null,
      {}
    );
  },
};

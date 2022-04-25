import {
  Sequelize,
  Options,
  ConnectionError,
  ConnectionTimedOutError,
  TimeoutError
} from 'sequelize';
import config from '../../config';
import { Logger } from '../../logger';

const logger = Logger.getInstance(module);
const postgresDb = {} as { sequelize: Sequelize; };

const connection: Options = {
  host: config.postgresDB.host,
  dialect: 'postgres',
  port: config.postgresDB.port,
  quoteIdentifiers: false,
  retry: {
    max: 5,
    match: [ConnectionError, ConnectionTimedOutError, TimeoutError]
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 60000,
    idle: 10000,
  }
};

const sequelize: Sequelize = new Sequelize(
  config.postgresDB.database,
  config.postgresDB.user,
  config.postgresDB.password,
  connection,
);

const connectPostgresDB = (): Sequelize => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info(
        'Connection to postgre has been established successfully',
      );
    })
    .catch((err: Error) => {
      logger.error(
        `Unable to connect to the postgre database: ${JSON.stringify(config.postgresDB.database)} ${JSON.stringify(err)}`,
      );
    });

  postgresDb.sequelize = sequelize;

  return postgresDb.sequelize;
};

export { connectPostgresDB, postgresDb };

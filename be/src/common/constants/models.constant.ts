import config from '../../config';

const MODEL_NAME = {
  USERS: 'users',
  MATCHING: 'matchings'
};

const SCHEMA = config.postgresDB.schema;

export { MODEL_NAME, SCHEMA };

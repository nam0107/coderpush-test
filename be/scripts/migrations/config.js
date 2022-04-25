/* eslint-disable @typescript-eslint/no-var-requires */
const dotenvSafe = require('dotenv-safe');
const path = require('path');

dotenvSafe.config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../example.env')
});

const config = {
  username: process.env.POSTGRES_USER_NAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST_NAME,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
};

module.exports = {
  local: config,
  dev: config,
  stg: config,
  prd: config
};

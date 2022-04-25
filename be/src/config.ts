import dotenvSafe from 'dotenv-safe';
import path from 'path';

dotenvSafe.config({
  allowEmptyValues: true,
  example: path.join(__dirname, '../example.env'),
});

export interface IConfig {
  env: string;
  port: string;
  postgresDB: {
    schema: string;
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
  };
}

const config = <IConfig>{
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  postgresDB: {
    schema: process.env.POSTGRES_SCHEMA,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST_NAME,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
  },
};

export default config;

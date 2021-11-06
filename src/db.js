import { Sequelize } from 'sequelize';
import config from './config';

const db = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres',
  logging: false,
});

export default db;

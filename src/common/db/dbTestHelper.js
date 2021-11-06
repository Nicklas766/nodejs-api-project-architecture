/* eslint no-underscore-dangle: 0 */
import mongoose from 'mongoose';
import db from './db';

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const connect = async () => {
  const mongoUri = global.__MONGO_DB_NAME__
    ? `${global.__MONGO_URI__.split('/').slice(0, -1).join('/')}/${global.__MONGO_DB_NAME__}`
    : global.__MONGO_URI__;

  await db.connect(mongoUri);
};

const clearCollection = async (colName) => {
  await mongoose.connection.collection(colName).deleteMany();
};

const addToCollection = async (colName, data) => {
  await mongoose.connection.db.collection(colName).insertMany(data);
};

export default {
  close,
  connect,
  clearCollection,
  addToCollection,
};

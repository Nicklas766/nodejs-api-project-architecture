import mongoose from 'mongoose';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async (mongoUri) => mongoose.connect(mongoUri, mongooseOptions);

export default {
  connect,
};

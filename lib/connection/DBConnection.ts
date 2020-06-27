import mongoose from 'mongoose';
import _ from 'lodash';

const user: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASSWORD || '';

if (_.isEmpty(user) || _.isEmpty(password)) {
  console.log(`DB username or password is not configured... Exiting application`);
  process.exit(1);
}

const mongodbURI: string = `mongodb+srv://${user}:${password}@cluster0-owebi.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log(`Connected to Mongo DB...`);
  } catch (error) {
    console.log(`Can't conncet to Mongo DB ${error}... Exiting application`);
    process.exit(1);
  }
}

export default connectDB;
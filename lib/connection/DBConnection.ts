import _ from 'lodash';
import { Sequelize } from 'sequelize';

const user: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASSWORD || '';

if (_.isEmpty(user) || _.isEmpty(password)) {
  console.log(`DB username or password is not configured... Exiting application`);
  process.exit(1);
}

const sequelize = new Sequelize('blog_app_db', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const closeDBConnection = async () => {
  sequelize.close();
};

export {
  sequelize,
  connectDB,
  closeDBConnection
}
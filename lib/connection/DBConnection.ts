import _ from 'lodash';
import { Sequelize } from 'sequelize';
import * as config from '../../config/config.json';

const ENV = process.env.NODE_ENV;
const DB_NAME = _.get(config, `${ENV}.database`);
const USER_NAME = _.get(config, `${ENV}.username`);
const PASSWORD = _.get(config, `${ENV}.password`);

if (_.isEmpty(ENV)) {
  console.log('Environment is not set... Exiting application');
  process.exit(1);
} else if (_.isEmpty(DB_NAME)) {
  console.log('DB name is not set... Exiting application');
  process.exit(1);
} else if (_.isEmpty(USER_NAME)) {
  console.log('DB Username is not set... Exiting application');
  process.exit(1);
}

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
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
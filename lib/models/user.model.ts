import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../connection/DBConnection';

const User = sequelize.define('User', {

  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Users',
});

export default User;
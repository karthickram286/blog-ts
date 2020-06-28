import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres:blog_app_db');

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
  tableName: 'users',
});

export default User;
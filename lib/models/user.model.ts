import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres::memory:');

const User = sequelize.define('User', {

  id: {
    type: DataTypes.UUID,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
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
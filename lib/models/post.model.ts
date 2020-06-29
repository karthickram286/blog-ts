import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../connection/DBConnection';

const Post = sequelize.define('Post', {

  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  body: {
    type: DataTypes.STRING,
    allowNull: false
  },

  author_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'Posts',
});

export default Post;
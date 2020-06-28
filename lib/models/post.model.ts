import { Sequelize, DataTypes } from 'sequelize';
import { min } from 'lodash';

const sequelize = new Sequelize('postgres::memory:');

const Post = sequelize.define('Post', {

  id: {
    type: DataTypes.UUID,
    allowNull: false,
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
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'posts',
});

export default Post;
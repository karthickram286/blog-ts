import _ from 'lodash';

import Post from '../models/post.model';

const createPost = async (post: any) => {
  if (post instanceof Post) {
    await post.save();
  } else {
    throw new Error('Passed object is not of the type Post');
  }
};

const getPostById = async (post_id: string) => {
  let post = await Post.findOne({
    where: {
      id: post_id
    }
  });

  return post;
};

const getAllPostsByLimit = async (limit: number) => {
  let posts = await Post.findAll({
    order: [
      ['updatedAt', 'DESC']
    ],
    limit: limit
  });

  return posts;
}

export {
  createPost,
  getPostById,
  getAllPostsByLimit
};
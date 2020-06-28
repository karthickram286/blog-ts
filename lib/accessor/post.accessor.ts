import Post from '../models/post.model';

const createPost = async (post: any) => {
  if (post instanceof Post) {
    await post.save();
  } else {
    throw new Error('Passed object is not of the type Post');
  }
};

export {
  createPost
};
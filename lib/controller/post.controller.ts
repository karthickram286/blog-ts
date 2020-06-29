import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import {
  createPost,
  getPostById,
  getAllPostsByLimit
} from '../accessor/post.accessor';
import Post from '../models/post.model';
import { authorize } from '../middleware/authorize.middleware';

/**
 * Adds a new Post 
 * @param req 
 * @param res 
 */
const addPost: RequestHandler = async (req, res) => { 

  let { title, body, author_id } = req.body;

  let authResponse = authorize(req, author_id);
  if (authResponse.status != 200) {
    return res.status(authResponse.status)
      .json(authResponse.message);
  }

  let id: string = uuidv4();

  const post = await Post.create({
    id: id,
    title: title,
    body: body,
    author_id: author_id
  });

  await createPost(post);

  return res.status(200)
              .json(post);
};

/**
 * Returns a Post for a given post id
 * @param req 
 * @param res 
 */
const getPost: RequestHandler = async (req, res) => {

  let post_id = req.params.id;

  const post = await getPostById(post_id);

  if (!_.isEmpty(post)) {
    return res.status(200)
                .json(post);
  } else {
    return res.status(404)
                .json({
                  error: `Post not found for id: ${post_id}`
                });
  }
};

const getAllPosts: RequestHandler = async (req, res) => {
  
  let posts = await getAllPostsByLimit(10);

  if (!_.isEmpty(posts)) {
    return res.status(200)
                .json(posts);
  } else {
    return res.status(404)
                .json({
                  error: `No posts found`
                });
  }
};

export {
  addPost,
  getPost,
  getAllPosts
}
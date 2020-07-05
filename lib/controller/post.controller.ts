import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import {
  createPost,
  getPostById,
  getAllPostsByLimit
} from '../accessor/post.accessor';
import { getUserById } from '../accessor/user.accessor';
import Post from '../models/post.model';
import { authorize } from '../middleware/authorize.middleware';
import { getByUserId } from './user.controller';

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

interface PostResponse {
  id: string,
  title: string,
  body: string,
  author: string,
  createdAt: string,
  updatedAt: string
}

const createPostResponse = async (post: any) => {
  let user = await getUserById(post.author_id);

  let postResponse: PostResponse = { 
    id: post.id,
    title: post.title,
    body: post.body,
    author:  _.get(user, 'username'),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };

  return postResponse;
};

const getAllPosts: RequestHandler = async (req, res) => {

  let posts = await getAllPostsByLimit(10);

  if (!_.isEmpty(posts)) {
    let postsResp: any = [];

    for (const post of posts) {
      const postResp = await createPostResponse(post);
      postsResp.push(postResp);
    }
    
    return res.status(200)
      .json(postsResp);
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
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import {
  createPost
} from '../accessor/post.accessor';
import Post from '../models/post.model';

/**
 * Adds a new Post 
 * @param req 
 * @param res 
 */
const addPost: RequestHandler = async (req, res) => { 

  let { title, body, author_id } = req.body;
  let id: string = uuidv4();

  const post = await Post.create({
    id: id,
    title: title,
    body: body,
    author_id: author_id
  });

  await createPost(post);

  res.status(200)
      .json(post);
};

export {
  addPost
}
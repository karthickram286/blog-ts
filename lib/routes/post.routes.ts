import Router from 'express';

import { 
  addPost,
  getPost,
  getAllPosts
} from '../controller/post.controller';

const router = Router();

router.post('/create', addPost);

router.get('/:id', getPost);

router.get('/', getAllPosts);

export default router;
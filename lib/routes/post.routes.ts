import Router from 'express';

import { 
  addPost 
} from '../controller/post.controller';

const router = Router();

router.post('/create', addPost);

export default router;
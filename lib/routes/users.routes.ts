import Router from 'express';
import { 
  createUser, 
  deleteUser 
} from '../controller/user.controller';

const router = Router();

router.post('/create', createUser);

router.delete('/delete/:id', deleteUser);

export default router;


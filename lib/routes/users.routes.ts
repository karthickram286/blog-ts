import Router from 'express';
import { 
  createUser, 
  deleteUser,
  getByUserId
} from '../controller/user.controller';

const router = Router();

router.post('/create', createUser);

router.get('/get/:id', getByUserId);

router.delete('/delete/:id', deleteUser);

export default router;


import Router from 'express';
import { createUser, deleteUser } from '../controller/user.controller';

const router = Router();

router.post('/create', createUser);

router.get('/tess', (req, res) => {
  res.send('hi');
});

export default router;


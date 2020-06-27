import Router from 'express';
import { createUser, deleteUser } from '../controller/user.controller';

const router = Router();

router.post('/create', createUser);

export default router;


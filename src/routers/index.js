import { Router } from 'express';
import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterRouter } from './water.js';

const router = Router();


router.use('/auth', authRouter);
router.use('/water', waterRouter);
router.use('/user', usersRouter);

export default router;

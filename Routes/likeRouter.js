import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearLike } from '../Controllers/likeController.js';

const router = Router();

router.post('/', verifyToken, crearLike);

export default router;
import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearLike,  sacarLike } from '../Controllers/likeController.js';

const router = Router();

router.post('/', verifyToken, crearLike);
router.delete('/', verifyToken, sacarLike);

export default router;
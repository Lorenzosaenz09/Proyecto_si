import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearLike,  sacarLike, obtenerLikes } from '../Controllers/likeController.js';

const router = Router();

router.post('/', verifyToken, crearLike);
router.delete('/', verifyToken, sacarLike);
router.get('/:id_mascota', verifyToken, obtenerLikes);

export default router;
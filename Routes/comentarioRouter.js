import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearComentario, obtenerComentarios } from '../Controllers/comentarioController.js';

const router = Router();

router.post('/', verifyToken, crearComentario);
router.get('/:id_mascota', verifyToken, obtenerComentarios);

export default router;
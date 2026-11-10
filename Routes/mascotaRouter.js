import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearMascota, obtenerMascotas, editarMascota } from '../Controllers/mascotaController.js';

const router = Router();

router.post('/', verifyToken, crearMascota);
router.get('/', verifyToken, obtenerMascotas);
router.put('/:id', verifyToken, editarMascota);

export default router;
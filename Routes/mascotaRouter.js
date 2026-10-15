import Router from 'express';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearMascota, obtenerMascotas} from '../Controllers/mascotaController.js';

const router = Router();

router.post('/', verifyToken, crearMascota);
router.get('/', verifyToken, obtenerMascotas);

export default router;
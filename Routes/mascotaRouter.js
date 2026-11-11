import Router from 'express';
import multer from 'multer';
import { verifyToken } from '../Middlewares/middleware.js';
import { crearMascota, obtenerMascotas, editarMascota } from '../Controllers/mascotaController.js';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    defParamCharset: 'utf8' // Sin esto, el campo "tamaño" llega con la ñ rota
});

router.post('/', verifyToken, upload.array('imagenes', 5), crearMascota);
router.get('/', verifyToken, obtenerMascotas);
router.put('/:id', verifyToken, upload.array('imagenes', 5), editarMascota);

export default router;

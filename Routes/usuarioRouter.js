import Router from 'express'; 
import { verifyToken } from '../Middlewares/middleware.js';
import { crearUsuario, login, obtenerUsuario } from '../Controllers/usuarioController.js';

const router = Router();

router.post('/registro', crearUsuario); 
router.post('/login', login);
router.get('/:id', verifyToken, obtenerUsuario);



export default router;


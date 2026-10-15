import 'dotenv/config';
import { insertUsuario, getUsuarioByMail } from '../Services/usuarioService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export async function crearUsuario(req, res) {

    const user = req.body;

    if(!user.nombre || !user.apellido || !user.mail || !user.telefono || !user.contraseña)
        return res.status(400).json({message:"Debes completar todos los campos"})

    const hashedPwd = await bcrypt.hash(user.contraseña,10);

    try {
        const result = await insertUsuario(
            user.nombre,
            user.apellido,
            user.mail,
            user.telefono,
            hashedPwd
        )

        console.log("result.rows", result.rows)

        res.status(201).json({
            message:"Usuario creado!",
            id: result.rows[0].id_usuario
        })
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}
export async function login(req, res) {

    const user = req.body;

    if(!user.mail || !user.contraseña)
        return res.status(400).json({message:"Debes completar todos los campos"})

    try {
        const result = await getUsuarioByMail(user.mail)

        if (result.rowCount == 0)
            return res.status(400).json({message:"Usuario inexistente o clave incorrecta"})

        const dbUser = result.rows[0];

        const passOK = await bcrypt.compare(user.contraseña, dbUser.contraseña)

        if (!passOK) {
            return res.status(400).json({message:"Usuario inexistente o clave incorrecta"})
        }

        const payload = {
            id: dbUser.id_usuario
        }

        const token = jwt.sign(payload, secret, {expiresIn:'1h'})

        return res.status(200).json({token})
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}
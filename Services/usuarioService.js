import pkg from 'pg'
import dbconfig from '../db.js'

const {Pool} = pkg;
const pool = new Pool(dbconfig)


export async function insertUsuario(nombre, apellido, mail, telefono, contraseña) {
    return await pool.query(
        "insert into usuario(nombre, apellido, mail, telefono, contraseña) values ($1,$2,$3,$4,$5) returning id_usuario",
        [nombre, apellido, mail, telefono, contraseña]
    )
}
export async function getUsuarioByMail(mail) { 
    return await pool.query( 
        "select id_usuario, contraseña from usuario where mail = $1", [mail] ) }


        
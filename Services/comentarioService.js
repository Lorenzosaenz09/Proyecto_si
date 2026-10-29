import pkg from 'pg'
import dbconfig from '../db.js'

const {Pool} = pkg;
const pool = new Pool(dbconfig)

export async function insertComentario(texto, id_mascota_1, id_mascota_2) {
    return await pool.query(
        'INSERT INTO comentario (texto, fecha, id_mascota_1, id_mascota_2) VALUES ($1, CURRENT_DATE, $2, $3) RETURNING id_comentario',
        [texto, id_mascota_1, id_mascota_2]
    )
}

export async function getComentarios(id_mascota_2) {
    return await pool.query(
        'SELECT * FROM comentario WHERE id_mascota_2 = $1 ORDER BY fecha DESC',
        [id_mascota_2]
    )
}
import pkg from 'pg'
import dbconfig from '../db.js'

const {Pool} = pkg;
const pool = new Pool(dbconfig)

export async function insertMatch(id_mascota_1, id_mascota_2) {
    return await pool.query(
        'insert into "match" (id_mascota_1, id_mascota_2, fecha) values ($1,$2,CURRENT_DATE) returning id_match',
        [id_mascota_1, id_mascota_2]
    )
}
export async function deleteMatch(id_mascota_1, id_mascota_2) {
    return await pool.query(
        'DELETE FROM "match" WHERE (id_mascota_1 = $1 AND id_mascota_2 = $2) OR (id_mascota_1 = $2 AND id_mascota_2 = $1)',
        [id_mascota_1, id_mascota_2]
    )
}
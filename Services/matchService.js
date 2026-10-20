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
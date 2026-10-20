import pkg from 'pg'
import dbconfig from '../db.js'

const {Pool} = pkg;
const pool = new Pool(dbconfig)

export async function insertLike(id_mascota_1, id_mascota_2) {
    return await pool.query(
        'insert into "like" (id_mascota_1, id_mascota_2, fecha) values ($1,$2,CURRENT_DATE) returning id_like',
        [id_mascota_1, id_mascota_2]
    )
}

export async function getLike(id_mascota_1, id_mascota_2) {
    return await pool.query(
        'select * from "like" where id_mascota_1 = $1 and id_mascota_2 = $2',
        [id_mascota_1, id_mascota_2]
    )
}
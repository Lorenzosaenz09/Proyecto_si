import pkg from 'pg'
import dbconfig from '../db.js'

const {Pool} = pkg;
const pool = new Pool(dbconfig)

export async function insertMascota(nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, id_usuario) {
    return await pool.query(
        "insert into mascota(nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, id_usuario) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id_mascota",
        [nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, id_usuario]
    )
}

export async function getMascotas(especie, raza, sexo, tamaño, ubicacion, color) {
    return await pool.query(
        `select * from mascota
        where ($1::text is null or especie = $1)
        and ($2::text is null or raza = $2)
        and ($3::text is null or sexo = $3)
        and ($4::text is null or tamaño = $4)
        and ($5::text is null or ubicacion = $5)
        and ($6::text is null or color = $6)`,
        [especie, raza, sexo, tamaño, ubicacion, color]
    )
}
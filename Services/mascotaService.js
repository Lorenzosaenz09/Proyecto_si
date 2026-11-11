import pkg from 'pg';
import { randomUUID } from 'crypto';
import dbconfig from '../db.js';
import supabase from '../supabase.js';

const {Pool} = pkg;
const pool = new Pool(dbconfig)

export async function insertMascota(nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, descripcion, id_usuario) {
    return await pool.query(
        "insert into mascota(nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, descripcion, id_usuario) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id_mascota",
        [nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, descripcion, id_usuario]
    )
}

export async function getMascotas(especie, raza, sexo, tamaño, ubicacion, color) {
    return await pool.query(
        `select mascota.*, coalesce(
            (select json_agg(imagen.url) from imagen where imagen.id_mascota = mascota.id_mascota),
            '[]'::json
        ) as imagenes
        from mascota
        where ($1::text is null or especie = $1)
        and ($2::text is null or raza = $2)
        and ($3::text is null or sexo = $3)
        and ($4::text is null or tamaño = $4)
        and ($5::text is null or ubicacion = $5)
        and ($6::text is null or color = $6)`,
        [especie, raza, sexo, tamaño, ubicacion, color]
    )
}

export async function updateMascota(id_mascota, nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, descripcion, id_usuario) {
    return await pool.query(
        `UPDATE mascota
        SET nombre = $1,
            especie = $2,
            raza = $3,
            sexo = $4,
            nacimiento = $5,
            tamaño = $6,
            color = $7,
            ubicacion = $8,
            descripcion = $9
        WHERE id_mascota = $10 AND id_usuario = $11
        RETURNING id_mascota`,
        [nombre, especie, raza, sexo, nacimiento, tamaño, color, ubicacion, descripcion, id_mascota, id_usuario]
    )
}
export async function subirImagen(file, id_mascota) {
    const nombreArchivo = `${id_mascota}/${randomUUID()}`;

    const { data, error } = await supabase.storage
        .from('mascotas')
        .upload(nombreArchivo, file.buffer, {
            contentType: file.mimetype
        });

    if (error) {
        throw error;
    }

    const { data: urlData } = supabase.storage
        .from('mascotas')
        .getPublicUrl(nombreArchivo);

    return urlData.publicUrl;
}


export async function borrarMascotaCreada(id_mascota) {
    await pool.query("delete from imagen where id_mascota = $1", [id_mascota]);
    await pool.query("delete from mascota where id_mascota = $1", [id_mascota]);
}

export async function insertImagen(url, id_mascota) {
    return await pool.query(
        "insert into imagen(url, id_mascota) values ($1, $2)",
        [url, id_mascota]
    );
}

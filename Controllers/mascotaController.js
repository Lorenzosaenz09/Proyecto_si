import { insertMascota, getMascotas, updateMascota } from '../Services/mascotaService.js';

export async function crearMascota(req, res) {

    const mascota = req.body;

    if(!mascota.nombre || !mascota.especie || !mascota.raza || !mascota.sexo || !mascota.nacimiento || !mascota.tamaño || !mascota.color || !mascota.ubicacion)
        return res.status(400).json({message:"Debes completar todos los campos"})

    try {
        const result = await insertMascota(
            mascota.nombre,
            mascota.especie,
            mascota.raza,
            mascota.sexo,
            mascota.nacimiento,
            mascota.tamaño,
            mascota.color,
            mascota.ubicacion,
            mascota.descripcion || null, 
            req.user_id
        );

        console.log("result.rows", result.rows);

        res.status(201).json({
            message:"Mascota creada!",
            id: result.rows[0].id_mascota
        });
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}   
export async function obtenerMascotas(req, res) {
    try {
        const result = await getMascotas(
            req.query.especie || null,
            req.query.raza || null,
            req.query.sexo || null,
            req.query.tamaño || null,
            req.query.ubicacion || null,
            req.query.color || null
        );

        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}
export async function editarMascota(req, res) {

    const mascota = req.body;
    const id = req.params.id;

    if (!mascota.nombre || !mascota.especie || !mascota.raza || !mascota.sexo || !mascota.nacimiento || !mascota.tamaño || !mascota.color || !mascota.ubicacion)
        return res.status(400).json({message:"Debes completar todos los campos"})

    try {
        const result = await updateMascota(
            id,
            mascota.nombre,
            mascota.especie,
            mascota.raza,
            mascota.sexo,
            mascota.nacimiento,
            mascota.tamaño,
            mascota.color,
            mascota.ubicacion,
            mascota.descripcion || null,
            req.user_id
        );

        if (result.rowCount == 0)
            return res.status(404).json({message:"Mascota inexistente o no te pertenece"});

        return res.status(200).json({
            message:"Mascota actualizada!",
            id: result.rows[0].id_mascota
        });
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}
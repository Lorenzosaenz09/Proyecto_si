import { insertComentario, getComentarios } from '../Services/comentarioService.js';

export async function crearComentario(req, res) {

    const comentario = req.body;

    if (!comentario.texto || !comentario.id_mascota_1 || !comentario.id_mascota_2)
        return res.status(400).json({message:"Debes completar todos los campos"});

    if (comentario.id_mascota_1 == comentario.id_mascota_2)
        return res.status(400).json({message:"No puedes comentar tu propia mascota"});

    try {
        const result = await insertComentario(
            comentario.texto,
            comentario.id_mascota_1,
            comentario.id_mascota_2
        );

        return res.status(201).json({
            message:"Comentario creado!",
            id: result.rows[0].id_comentario
        });
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}

export async function obtenerComentarios(req, res) {

    try {
        const result = await getComentarios(req.params.id_mascota);

        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}
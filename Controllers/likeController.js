import { insertLike, getLike } from '../Services/likeService.js';

export async function crearLike(req, res) {

    const like = req.body;

    if(!like.id_mascota_1 || !like.id_mascota_2)
        return res.status(400).json({message:"Debes completar todos los campos"})

    try {
        const result = await getLike(
            like.id_mascota_1,
            like.id_mascota_2
        );

        if (result.rowCount > 0)
            return res.status(400).json({message:"Este like ya existe"})

        const nuevoLike = await insertLike(
            like.id_mascota_1,
            like.id_mascota_2
        );

        return res.status(201).json({
            message:"Like creado!",
            id: nuevoLike.rows[0].id_like
        });
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}
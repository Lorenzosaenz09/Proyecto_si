import { insertLike, getLike, getLikeMutuo, deleteLike } from '../Services/likeService.js';
import { insertMatch, deleteMatch } from '../Services/matchService.js';

export async function crearLike(req, res) {

    const like = req.body;

    if(!like.id_mascota_1 || !like.id_mascota_2)
        return res.status(400).json({message:"Debes completar todos los campos"})

    if(like.id_mascota_1 == like.id_mascota_2)
        return res.status(400).json({message:"No te podes dar like a vos mismo"})

    try {
        const result = await getLike(
            like.id_mascota_1,
            like.id_mascota_2
        );

        if (result.rowCount > 0)
            return res.status(400).json({message:"Este like ya existe"})

        const likeMutuo = await getLikeMutuo(
            like.id_mascota_1,
            like.id_mascota_2
        );

        const nuevoLike = await insertLike(
            like.id_mascota_1,
            like.id_mascota_2
        );

        if (likeMutuo.rowCount > 0) {
            const nuevoMatch = await insertMatch(
                like.id_mascota_1,
                like.id_mascota_2
            );

            return res.status(201).json({
                message: "Like creado! Hay match!",
                id_like: nuevoLike.rows[0].id_like,
                id_match: nuevoMatch.rows[0].id_match
            });
        }

        return res.status(201).json({
            message: "Like creado!",
            id: nuevoLike.rows[0].id_like
        });
    }
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
    }
}
export async function sacarLike(req, res) {

    const like = req.body;

    if (!like.id_mascota_1 || !like.id_mascota_2)
        return res.status(400).json({message:"Debes indicar las dos mascotas"});

    try {
        const result = await deleteLike(
            like.id_mascota_1,
            like.id_mascota_2
        );

        if (result.rowCount == 0)
            return res.status(404).json({message:"Like inexistente"});

        await deleteMatch(
            like.id_mascota_1,
            like.id_mascota_2
        );

        return res.status(200).json({message:"Like eliminado! Match eliminado si existía."});
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}
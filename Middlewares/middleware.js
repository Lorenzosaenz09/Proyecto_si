import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error: 'No llegó ningún token en los headers' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, secret);

        req.user_id = payload.id;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).send({ error: 'Unauthorized' });
    }
}
import jwt from 'jsonwebtoken';

export const authorization = async (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(403).json({message: "Need Authorization to access it"});
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (err) {
        return res.status(403).json(err.message);
    }
}
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: "Token não fornecido" });

    const [, token] = authHeader.split(" "); // "Bearer token"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // opcional: incluir dados do user no req
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

const adminMiddleware = (req, res, next) => {
    // O authMiddleware já deve ter setado req.user
    if (req.user && req.user.isAdmin) {
        next(); // usuário é admin, segue
    } else {
        return res
            .status(403)
            .json({ error: "Acesso negado: administrador apenas" });
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};

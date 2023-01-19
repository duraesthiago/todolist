const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthToken = (req, res, next) => {
    //Verificar se o token é valido
    try {
        //Guardar as informações do usuário
        req.user = jwt.verify(req.token, process.env.TOKEN_SECRET);
    } catch (error) {
        return res.status(403).json({ erro: 'Perdeu Playboy!' });
    }

    next();
}

module.exports = AuthToken;
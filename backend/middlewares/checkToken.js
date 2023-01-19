const CheckToken = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        return res.status(401).json({ erro: "Bad Authentication!" });
    }

    if (req.headers.authorization.indexOf('bearer') == -1) {
        return res.status(400).json({ erro: "Bad Request!" });
    } //Verifica a existencia da palavra BEARER

    let token = req.headers.authorization.replace('bearer ', '');

    req.token = token;

    next();
}

module.exports = CheckToken;
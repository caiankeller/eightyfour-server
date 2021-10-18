const jwt = require("jsonwebtoken");

module.exports = {
    async verifyJwt(req, res, next) {
        const token = req.headers['x-access-token']

        if (!token) 
            res.status(401).json({"error": "token missing"})
        else
            jwt.verify(token, "topsecret", (e, decoded) => {
                if (e)
                    res.status(401).json({"error": "token invalid"})
                else{
                   req.userIdentification = decoded.id
                   next()
                }
            })
    }
}
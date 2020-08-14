const { jwtSecret } = require("../config/secrets");

const secrets = require("../config/secrets.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    if(!req.headers.authorization) {
        res.status(401).json({ message: "Missing Authorization Header "});
    } else {
        const [authType, token] = req.headers.authorization.split(" ");

        if(authType && authType.toLowerCase() === "bearer" && token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                req.jwt = decodedToken;
                next();
            });
        } else {
            res.status(403).json({ message: "Invalid Token: Access Denied!" });
        }
    }
}
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/usersModel.js");

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(!(username && password)) {
        res.status(400).json({ message: "Missing username and/or password"});
    } else {

        Users.findBy({ username })
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).json({username: user.username, token});
                } else {
                    res.status(403).json({ message: "Invalid username or password" });
                }
            })
            .catch(err => res.status(500).json({ message: "Error retrieving user data", err}));
    }
});

router.post("/register", (req, res) => {
    const user = req.body;

    if(!(user.firstName && user.lastName && user.email && user.username && user.password)) {
        res.status(400).json({ message: "Missing required data: First Name, Last Name, Email, Username, Password" });
    } else {

        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => res.status(500).json({ message: "Error adding user to database", err }));
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        created_at: Date.now(),
    };

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
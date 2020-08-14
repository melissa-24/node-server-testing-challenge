const router = require("express").Router();

const Users = require("./usersModel.js");

router.get("/", (req, res) => {
    Users.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: "Error retrieving users", err }));
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if(user) {
                Users.remove(id)
                    .then(() => res.status(204).end())
                    .catch(err => res.status(500).json({ message: "Error removing user from database", err }));
            } else {
                res.status(404).json({ message: "User Id not found!" });
            }
        })
        .catch(err => res.status(500).json({ message: "Error retrieving user data", err }));
    
});

module.exports = router;
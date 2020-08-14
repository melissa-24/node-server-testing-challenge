const db = require("../database/db-config.js");

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update
}

function findAll() {
    return db("users");
}

function findById(id) {
    return db("users").where({ id: id }).first();
}

function findBy(filter) {
    return db("users").where(filter).first();
}

function add(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            return findById(ids[0]);
        });
}

function remove(id) {
    return db("users").where({id: id}).delete();
}

function update(changes, id) {
    return null;
}
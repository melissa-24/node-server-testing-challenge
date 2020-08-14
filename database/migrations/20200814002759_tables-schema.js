exports.up = function(knex) {
    return knex.schema
        .createTable("users", tbl => {
            tbl.increments();
            tbl.string("firstName", 128).notNullable();
            tbl.string("lastName", 128).notNullable();
            tbl.string("email", 128).notNullable().unique();
            tbl.varchar("username", 128).notNullable().unique();
            tbl.varchar("password", 128).notNullable();
            tbl.integer("dependents").defaultTo(0);
        })
        .createTable("chores", tbl => {
            tbl.increments();
            tbl.string("choreName", 128).notNullable();
            tbl.string("choreFrequency", 2).notNullable().defaultTo("biweekly");
            tbl.varchar("username", 128)
                .unsigned()
                .notNullable()
                .references("users.username")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        })
        .then(() => console.log("\n*** Created Tables, Ready To Seed ***\n"));
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("chores")
        .dropTableIfExists("users")  
};
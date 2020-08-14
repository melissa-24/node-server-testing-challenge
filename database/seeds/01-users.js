exports.seed = function(knex) {
  return knex("users").insert([
    {
      firstName: "Test",
      lastName: "Tester",
      email: "tester@lambdastudents.com",
      username: "tester",
      password: "1234",
      dependents: 0,
    }
  ])
  .then(() => console.log("\n** Users table seeded successfully! **\n"));
};
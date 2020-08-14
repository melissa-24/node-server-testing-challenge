exports.seed = function(knex) {
  return knex("chores").insert([
    {
      choreName: 'dishes',
      choreFrequency: 'weekly',
      username: 'tester'
    }
  ])
  .then(() => console.log("\n** Income table seeded successfully! **\n"));
};
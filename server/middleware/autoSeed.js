const seeder = require('./../seeding-script/seeder');

const seedIfEmpty = (req, res, next) =>
  seeder.seedIfEmpty().then((seedData) => next());

module.exports = seedIfEmpty;
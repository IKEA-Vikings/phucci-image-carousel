const express = require('express');
const db = require('./database/index').db;
const seeder = require('./seeding-script/seeder');
const path = require('path');


const app = express();
const port = 3004;
app.use(express.static(path.join(__dirname, '/../public')));
seeder.seedIfEmpty();

app.get('/images/org/:id', (req, res) => {
  db.getOriginal(req.params.id)
    .then((images) => res.send(images));
});


const server = app.listen(port, function () {
  console.log(`listenting on port:${port}`);
});


module.exports = server;
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/index').db;
const seeder = require('./seeding-script/seeder');


const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
seeder.seedIfEmpty();

app.get('/images/org/:id', (req, res) => {
  db.getOriginal(req.params.id)
    .then((images) => res.send(images));
});

app.listen(port, () => {
  console.log(`listenting on port:${port}`);
});
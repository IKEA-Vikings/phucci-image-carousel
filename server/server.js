const express = require('express');
const db = require('./database/index').db;
const seeder = require('./seeding-script/seeder');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3004;
app.use(express.static(path.join(__dirname, '/../public')));
app.use(morgan('dev'));

app.use(cors({
  origin: ['http://localhost:3004', 'http://127.0.0.1:3004'],
  credentials: true
}));



seeder.seedIfEmpty();

app.get('/images/org/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3004');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Origin', '*');

  db.getOriginal(req.params.id)
    .then((images) => res.send(images));
});


const server = app.listen(port, function () {
  console.log(`listenting on port:${port}`);
});


module.exports = server;
const express = require('express');
const db = require('./database/index').db;
const seeder = require('./seeding-script/seeder');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const corsAccess = require('./middleware/corsAuth');
const autoSeed = require('./middleware/autoSeed');

const app = express();
const port = 3004;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(morgan('dev'));
app.use(corsAccess.setHeaders);
app.use(cors({
  origin: ['http://localhost:3004', 'http://127.0.0.1:3004'],
  credentials: true
}));
app.use(autoSeed);


seeder.seedIfEmpty();

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/images/org/:id', (req, res) => {
  db.getOriginal(req.params.id)
    .then((images) => res.send(images));
});

app.get('/images/sizeService/:id', (req, res) => {
  db.getSizeService(req.params.id)
    .then((image) => res.send(image));
});


app.get('/images/colors/:id', (req, res) => {
  db.getColors(req.params.id)
    .then((image) => res.send(image));
});


const server = app.listen(port, function () {
  console.log(`listenting on port:${port}`);
});


module.exports = server;
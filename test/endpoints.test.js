const request = require('request');
const expect = require('chai').expect;
const server = require('./../server/server.js');
const seeder = require('./../server/seeding-script/seeder');
const mongoose = require('mongoose');

describe('API Endpoints', () => {

  test(`should make a GET request to the endpoint with a productId
  and recieve back an array of original size images of the
  product that belongs to the productId`, done => {

    seeder.seedData((err, data) => {
      let productId = 0;

      request({
        method: 'GET',
        uri: `http://127.0.0.1:3004/images/org/${productId}`

      }, (error, response, body) => {
        if (error) { console.log('CONNECTION ERROR = ', error); }
        let images = JSON.parse(body);

        expect(images).to.be.an('array');
        expect(images).to.have.lengthOf(4);

        images.map((image) => {
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=g');
        });

        mongoose.connect('mongodb://localhost/images', () => mongoose.connection.db.dropDatabase(() => {
          mongoose.connection.close(() => {
            server.close(done);
          });
        }));

      });

    });
  });

});
const expect = require('chai').expect;
const seedData = require('./../server/seeding-script/seeder');
const mongoose = require('./../server/database/index').mongoose;
console.log('seedData = ', seedData);

describe('Seed Data', () => {

  beforeEach(() => {
    mongoose.connect('mongodb://localhost/images', () => mongoose.connection.db.dropDatabase());
  });

  it('shoud insert seeded data into db and return a collection of the inserted data', () => {
    seedData()
      .then((seededData) => {
        expect(seededData).to.be.an('array');
      });
  });


  it('each product in the collection should be an object', () => {
    seedData()
      .then((seededData) => {
        let firstProduct = seedData[0];
        expect(firstProduct).to.be.an('object');
      });
  });

  it('each product should have a collection of large images', () => {
    seedData()
      .then((seededData) => {
        let firstProduct = seedData[0];
        let image = firstProduct.large[0];
        expect(firstProduct.large).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });

  it('each product should have a collection of regular images', () => {
    seedData()
      .then((seededData) => {
        let thirdProduct = seedData[2];
        let image = thirdProduct.large[1];
        expect(thirdProduct.regular).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });

  it('each product should have a collection of colors images', () => {
    seedData()
      .then((seededData) => {
        let secondProduct = seedData[1];
        let image = secondProduct.large[3];
        expect(secondProduct.colors).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });

  it('each product should have a collection of sizeService images', () => {
    seedData()
      .then((seededData) => {
        let secondProduct = seedData[1];
        let image = secondProduct.large[1];
        expect(secondProduct.sizeService).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });


  it('each product should have a collection of largeThumbnails images', () => {
    seedData()
      .then((seededData) => {
        let thirdProduct = seedData[2];
        let image = thirdProduct.large[3];
        expect(thirdProduct.largeThumbnails).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });

  it('each product should have a collection of mediumThumbnails images', () => {
    seedData()
      .then((seededData) => {
        let secondProduct = seedData[1];
        let image = secondProduct.large[2];
        expect(secondProduct.mediumThumbnails).to.be.an('array');
        expect(image).to.be.a('string');
      });
  });


});
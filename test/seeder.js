const expect = require('chai').expect;
const seedData = require('./../server/seeding-script/seeder').seedData;
const mongoose = require('./../server/database/index').mongoose;

describe('Seed Data', () => {

  beforeEach(() => {
    mongoose.connect('mongodb://localhost/images', () => mongoose.connection.db.dropDatabase());
  });

  it('shoud insert seeded data into db and return a collection of the inserted data', (done) => {
    seedData()
      .then((seededData) => {
        expect(seededData).to.be.an('array');
        done();
      });
  });


  it('each product in the collection should be an object', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => expect(product).to.be.an('object'));
        done();
      });
  });

  it('each product should have a collection of large images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.large[0];
          expect(product.large).to.be.an('array');
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=s');
        });
        done();
      });
  });

  it('each product should have a collection of regular images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.regular[0];
          expect(product.regular).to.be.an('array');
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=xxs');
        });
        done();
      });
  });

  it('each product might have a collection of colors images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.colors[0];
          expect(product.colors).to.be.an('array');

          product.colors.length === 0 ?
            expect(image).to.be.undefined :
            expect(image).to.be.a('string') && expect(image).to.have.string('f=xu');
        });
        done();
      });
  });

  it('each product should have a collection of sizeService images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.sizeService[0];
          expect(product.sizeService).to.be.an('array');
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=xs');
        });
        done();
      });
  });


  it('each product should have a collection of largeThumbnails images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.largeThumbnails[0];
          expect(product.largeThumbnails).to.be.an('array');
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=xxxs');
        });
        done();
      });
  });

  it('each product should have a collection of mediumThumbnails images', (done) => {
    seedData()
      .then((seededData) => {
        seededData.map((product) => {
          let image = product.mediumThumbnails[0];
          expect(product.mediumThumbnails).to.be.an('array');
          expect(image).to.be.a('string');
          expect(image).to.have.string('f=u');
        });
        done();
      });
  });


});
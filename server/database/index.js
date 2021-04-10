const Promise = require('bluebird');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/images', () => {
//   // mongoose.connection.db.dropDatabase();
// });

// mongoose.connect('mongodb://localhost:27017/images', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


mongoose.connect('mongodb://54.67.28.46:27017:27017/images', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// mongoose.connect('mongodb://mongo:27017/images', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const ImageSchema = mongoose.Schema({
  _id: Number,
  original: [String],
  large: [String],
  regular: [String],
  colors: [String],
  sizeService: [String],
  largeThumbnails: [String],
  mediumThumbnails: [String],
});

const Image = mongoose.model('Image', ImageSchema);

const db = {
  getOriginal: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('original')
      .then(((images) => cb(null, images[0].original)))
      .catch((err) => {
        console.log('GETTING ORIGINAL IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getLarge: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('large')
      .then(((images) => cb(null, images[0].large)))
      .catch((err) => {
        console.log('GETTING LARGE IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getRegular: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('regular')
      .then(((images) => cb(null, images[0].regular)))
      .catch((err) => {
        console.log('GETTING REGULAR IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getColors: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('colors')
      .then(((images) => cb(null, images[0].colors)))
      .catch((err) => {
        console.log('GETTING COLOR THUMBNAILS IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getSizeService: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('sizeService')
      .then(((images) => cb(null, images[0].sizeService)))
      .catch((err) => {
        console.log('GETTING SIZE-SERVICE IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getLargeThumbnails: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('largeThumbnails')
      .then(((images) => cb(null, images[0].largeThumbnails)))
      .catch((err) => {
        console.log('GETTING LARGE THUMBNAILS IMAGES ERROR = ', err);
        cb(err, null);
      });
  },

  getMediumThumbnails: (productId, cb) => {
    Image.find({ '_id': productId })
      .select('mediumThumbnails')
      .then(((images) => cb(null, images[0].mediumThumbnails)))
      .catch((err) => {
        console.log('GETTING MEDIUM THUMBNAILS IMAGES ERROR = ', err);
        cb(err, null);
      });
  }
};

Object.keys(db).map((method) => db[method] = Promise.promisify(db[method]));

module.exports.Image = Image;
module.exports.mongoose = mongoose;
module.exports.db = db;
const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/imagesDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


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


const findSimilarTypeIds = (productId) => {
  if (productId >= 1 && productId <= 46) { return [1, 46] };
  if (productId >= 47 && productId <= 77) { return [47, 77] };
  if (productId >= 78 && productId <= 100) { return [78, 100] };
};

const generateColorsImages = (productId) => {

  let colorsImages = [];
  let filteredData = require('./../seeding-script/seeder').filterData();
  let [min, max] = findSimilarTypeIds(productId);

  for (let i = 0; i < 4; i++) {
    let colorsId = Math.floor(Math.random() * (max - min) + min) - 1;
    colorsId = (colorsId + i) < max ? colorsId += i : colorsId -= (i - 4);

    let colorImage = filteredData[colorsId].original[0];
    colorsImages.push(colorImage);
  }

  colorsImages = colorsImages.map((url) => url.replace('f=g', 'f=xu'));

  return colorsImages;
};

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
      .then(((images) => {
        if (images[0].colors.length > 0) { return cb(null, images[0].colors); }
        let colorsImages = generateColorsImages(productId);
        cb(null, colorsImages);
      }))
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
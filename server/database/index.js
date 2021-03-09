const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/images', () => {
  // mongoose.connection.db.dropDatabase();
});

const ImageSchema = mongoose.Schema({
  _id: Number,
  large: [String],
  regular: [String],
  colors: [String],
  sizeService: [String],
  largeThumbnails: [String],
  mediumThumbnails: [String],
});

const Image = mongoose.model('Image', ImageSchema);


var getLarge = (productId) => {
  Image.find({ '_id': productId })
    .select('large')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING LARGE IMAGES ERROR = ', err);
    });
};

var getRegular = (productId) => {
  Image.find({ '_id': productId })
    .select('regular')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING REGULAR IMAGES ERROR = ', err);
    });
};

var getColors = (productId) => {
  Image.find({ '_id': productId })
    .select('colors')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING COLOR THUMBNAILS IMAGES ERROR = ', err);
    });
};


var getSizeService = (productId) => {
  Image.find({ '_id': productId })
    .select('sizeService')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING HAND-DRAWN IMAGES ERROR = ', err);
    });
};

var getLargeThumbnails = (productId) => {
  Image.find({ '_id': productId })
    .select('largeThumbnails')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING LARGE THUMBNAILS IMAGES ERROR = ', err);
    });
};


var getMediumThumbnails = (productId) => {
  Image.find({ '_id': productId })
    .select('mediumThumbnails')
    .then(((images) => {
      console.log('images = ', images);
    }))
    .catch((err) => {
      console.log('GETTING MEDIUM THUMBNAILS IMAGES ERROR = ', err);
    });
};


// getLarge(0);
// getRegular(0);
// getColors(0);
// getSizeService(0);
// getLargeThumbnails(0);
// getMediumThumbnails(0);


module.exports.Image = Image;
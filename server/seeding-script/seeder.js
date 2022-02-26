const images = require('./rawData/index');
const ImageModel = require('./../database/index').Image;
const Promise = require('bluebird');
const s3Data = require('./s3Data/index');

const hasCondition = (url, type) => {
  switch (type) {
  case 'original' : return url !== '' && url.indexOf('f=g 1600w') !== -1;
  case 'large': return url !== '' && url.indexOf('f=s 500w') !== -1;
  case 'regular': return url !== '' && url.indexOf('f=xxs 300w') !== -1;
  case 'colors': return url !== '' && url.indexOf('f=xu 40w') !== -1;
  case 'sizeService': return url !== '' && url.indexOf('f=g 1600w') !== -1;
  case 'largeThumbnail': return url !== '' && url.indexOf('f=xxxs 160w') !== -1;
  case 'mediumThumbnail': return url !== '' && url.indexOf('f=u 80w') !== -1;
  }
};

const getThumbnails = (urls, type) => {
  let currentImg = 0;
  let thumbnails = [];

  for (let url of urls.split('\n')) {
    if (url === '') { currentImg++; }

    if (currentImg === 0 || currentImg === 2) {
      if (hasCondition(url, type)) {

        thumbnails.push(url.split(' ')[2]);
        if (currentImg === 2) { return thumbnails; }
      }
    }
  }

  return [];
};

const getUrls = (urls, type) => urls.split('\n').filter((url) =>
  hasCondition(url, type)).map((url) =>
  url.split(' ')).reduce((urls, url) =>
  [...urls, url[2]], []);


const getSizeServiceUrls = (urls) => {
  for (let url of urls.split('\n')) {
    if (hasCondition(url, 'sizeService')) {
      return [url.split(' ')[2]];
    }
  }
};

const getLargeThumbnailUrls = (urls) => getThumbnails(urls, 'largeThumbnail');
const getMedThumbnailUrls = (urls) => getThumbnails(urls, 'mediumThumbnail');

const getLargeUrls = (urls) => getUrls(urls, 'large');
const getRegularUrls = (urls) => getUrls(urls, 'regular');
const getColorslUrls = (urls) => getUrls(urls, 'colors');

const getOrginalUrls = (urls) => getUrls(urls, 'original');

const generateData = (id, urls, colorUrls) => {
  return {
    '_id': id,
    original: getOrginalUrls(urls),
    large: getLargeUrls(urls),
    regular: getRegularUrls(urls),
    colors: getColorslUrls(colorUrls),
    sizeService: getSizeServiceUrls(urls),
    largeThumbnails: getLargeThumbnailUrls(urls),
    mediumThumbnails: getMedThumbnailUrls(urls)
  };
};

let productId = 0;

const filterData = () => {
  let filteredData = [];

  Object.keys(images).forEach((itemType) =>
    images[itemType].forEach((item) =>
      filteredData.push(generateData(productId += 1, item.urls, item.colorUrls))));

  return filteredData;
};

let seedData = (cb) => ImageModel.insertMany(filterData())
  .then((seededData) => cb(null, seededData))
  .catch((err) => cb(err, null));


seedData = Promise.promisify(seedData);

const seedIfEmpty = () => ImageModel.findOne({})
  .then((image) => !image ? seedData() : null);


module.exports.seedData = seedData;
module.exports.seedIfEmpty = seedIfEmpty;
module.exports.filterData = filterData;
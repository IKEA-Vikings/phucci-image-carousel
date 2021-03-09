const images = require('./rawData/index');
const ImageModel = require('./../database/index').Image;

const hasCondition = (url, type) => {
  switch (type) {
  case 'large': return url !== '' && url.indexOf('f=s 500w') !== -1;
  case 'regular': return url !== '' && url.indexOf('f=xxs 300w') !== -1;
  case 'colors': return url !== '' && url.indexOf('f=xu 40w') !== -1;
  case 'sizeService': return url !== '' && url.indexOf('f=xs 400w') !== -1;
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

        thumbnails.push(url.split(' ')[0]);
        if (currentImg === 2) { return thumbnails; }
      }
    }
  }
};

const getUrls = (urls, type) => urls.split('\n').filter((url) =>
  hasCondition(url, type)).map((url) =>
  url.split(' ')).reduce((urls, url) =>
  [...urls, url[0]], []);

const getSizeServiceUrls = (urls) => {
  for (let url of urls.split('\n')) {
    if (hasCondition(url, 'sizeService')) {
      return [url.split(' ')[0]];
    }
  }
};

const getLargeThumbnailUrls = (urls) => getThumbnails(urls, 'largeThumbnail');
const getMedThumbnailUrls = (urls) => getThumbnails(urls, 'mediumThumbnail');

const getLargeUrls = (urls) => getUrls(urls, 'large');
const getRegularUrls = (urls) => getUrls(urls, 'regular');
const getColorslUrls = (urls) => getUrls(urls, 'colors');


const generateData = (id, urls, colorUrls) => {
  return {
    '_id': id,
    large: getLargeUrls(urls),
    regular: getRegularUrls(urls),
    colors: getColorslUrls(colorUrls),
    sizeService: getSizeServiceUrls(urls),
    largeThumbnails: getLargeThumbnailUrls(urls),
    mediumThumbnails: getMedThumbnailUrls(urls)
  };
};

let productId = -1;

const filterData = () => Object.keys(images).map((itemType) =>
  images[itemType].reduce((filteredData, item) =>
    generateData(productId += 1, item.urls, item.colorUrls), []));

const seedData = () => {
  ImageModel.insertMany(filterData())
    .then((seededData) => {
      console.log('seededData = ', seededData);
    })
    .catch((err) => {
      console.log('INSERTING DATA ERRROR = ', err);
    });
};

seedData();


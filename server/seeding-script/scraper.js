const puppeteer = require('puppeteer');
const _ = require('lodash');
const width = 1280;
const height = 720;
const fs = require('fs');
const path = require('path');

let dataDir = path.join(__dirname, 'rawData/dataType');

const scrapeUrls = async (searchedItems, type, count) => {
  let images = {};
  let file = '';
  let regUrlsSelector = '.range-revamp-media-grid__media-container > .range-revamp-aspect-ratio-image > .range-revamp-aspect-ratio-image__image';
  let colorUrlsSelector = '.range-revamp-product-styles__item > .range-revamp-aspect-ratio-image > .range-revamp-aspect-ratio-image__image';

  for (let i = 0; i < count; i++) {

    let browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    });

    let productUrl = searchedItems[i];

    let page = await browser.newPage();
    await page.goto(productUrl);
    await page.waitForSelector(regUrlsSelector, [{ visible: true }, {timeout: 0}]);

    images.urls = await page.$$eval(regUrlsSelector, (images) =>
      images.reduce((urls, image) => urls += image.srcset, ''));

    images.colorUrls = await page.$$eval(colorUrlsSelector, (images) =>
      images.reduce((urls, image) => urls += image.srcset, ''));

    await browser.close();

    file += `const regUrls${i + 1} = \`${images.urls}\`;\n\n`;
    file += `const colorUrls${i + 1} = \`${images.colorUrls}\`;\n\n`;
  }

  return file;
};

const constructProductSet = (file, type, count) => {
  file += `const ${type}sSet = {\n`;

  for (let i = 0; i < count; i++) {
    file += `  ${i + 1}: {
    urls: regUrls${i + 1},
    colorUrls: colorUrls${i + 1},
  },\n`;
  }

  file += '};\n\n';
  file += `module.exports = Object.keys(${type}sSet).map((${type}) => ${type}sSet[${type}]);`;

  return file;
};

const scrapeImages = async (searchedItems, type, count) => {
  type = type[type.length - 1] === 's' ? type += 'e' : type;

  let filename = await path.join(dataDir, `${type}s.js`);
  let file = await scrapeUrls(searchedItems, type, count);
  file = constructProductSet(file, type, count);

  await fs.writeFile(filename, file, (err) => {
    if (err) { return console.log('ERROR WRITING FILE = ', err); }
    console.log(`FILE WRITTEN FOR ${type}`);
  });

};



const getImages = async (type, count, cb) => {
  let set = {};

  let selector = '#search-results > .product-fragment > a';

  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  let page = await browser.newPage();
  await page.goto(`https://www.ikea.com/us/en/search/products/?q=${type}`);

  for (let i = 0; i < 40; i++) {
    await page.waitForSelector(selector, [{ visible: true }, {timeout: 0}]);
  }


  let searchedItems = await page.$$eval(selector, (items) => items.map((item) => item.href));
  await console.log(`${searchedItems.length} products found for ${type}`);

  count = searchedItems.length > count ? count : searchedItems.length;
  set = await scrapeImages(searchedItems, type, count);
  await browser.close();
};


getImages('cushion', 46);
getImages('blanket', 31);
getImages('mattress', 23);

module.exports.getImages = getImages;
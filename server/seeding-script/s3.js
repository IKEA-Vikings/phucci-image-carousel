const puppeteer = require('puppeteer');
const path = require('path');

const AWS = require('aws-sdk');
require('dotenv').config({ path: path.join(__dirname, './../../.env') });

const filterData = require('./seeder').filterData;
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const upload = async (buffer, id) => {
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: buffer,
    Key: `img${id}.jpg`,
  };

  return s3.upload(params).promise();
};


const scrapeMultipart = async (url, id) => {
  try {
    let browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    });

    let selector = 'img';
    let page = await browser.newPage();

    let viewSource = await page.goto(url, { waitUntil: 'load', timeout: 0 });
    let buffer = await viewSource.buffer();

    await browser.close();
    return buffer;

  } catch (e) {
    console.log('ERROR GOING TO PAGE: ', url);
    console.log('ERROR SCRAPING PRODUCT NUMBER: ', id);
    console.log('ERROR = ', e);
    return scrapeMultipart(url, id);
  }
};

const uploadToS3 = async (url, id) => {
  let buffer = await scrapeMultipart(url, id);
  let uploaded = await upload(buffer, id);
  return uploaded;
};


const initProductContainer = (s3Data, i, id) => {
  s3Data.push({});
  s3Data[i]['_id'] = id;
  s3Data[i]['original'] = [];
  s3Data[i]['large'] = [];
  s3Data[i]['regular'] = [];
  s3Data[i]['colors'] = [];
  s3Data[i]['sizeService'] = [];
  s3Data[i]['largeThumbnails'] = [];
  s3Data[i]['mediumThumbnails'] = [];
};


const fetchData = async () => {
  let filteredData = filterData();

  let s3Data = [];
  let count = 0;

  console.log('uploading files to S3...');

  for (let i = 0; i < filteredData.length; i++) {
    let product = filteredData[i];
    let imageTypes = Object.keys(product);
    let id = product[imageTypes[0]];

    initProductContainer(s3Data, i, id);

    for (let j = 1; j < imageTypes.length; j++) {
      let imageType = imageTypes[j];
      let images = product[imageType];

      if (images) {
        for (let imageUrl of images) {
          let uploaded = await uploadToS3(imageUrl, count += 1);
          let s3Url = uploaded.Location;
          s3Data[i][imageType].push(s3Url);
        }
      }

    }
  }

  console.log('s3Data = ', s3Data);
};

fetchData();

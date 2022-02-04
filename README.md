# Project Name
Ikea's image micro-service

> Project description
Displaying an image carousel and provides images source to other micro-services

## Related Projects
> https://github.com/IKEA-Vikings/phucci-proxy
> https://github.com/IKEA-Vikings/vbao-product-size
> https://github.com/IKEA-Vikings/vbao-others-also-viewed
> https://github.com/IKEA-Vikings/kim-service-1
> https://github.com/IKEA-Vikings/josh-service-reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Basic Usage & Sample JSONs
> Examples are based on: https://www.ikea.com/us/en/p/malm-underbed-storage-box-for-high-bed-black-brown-60252721/

  - For regular images displayed on the product main page.
    -> GET api/images/default/rg/:productId
  ```JSON
  {
    "regular": [
      "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723091_pe733853_s5.jpg?f=xxs",
      "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723093_pe733855_s5.jpg?f=xxs",
      "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723092_pe733856_s5.jpg?f=xxs"
    ],
  }
  ```

  - For large images when the user clicks on the image on the produce size
    -> GET api/images/default/lg/:productId
  ```JSON
  {
    "large": [
      "https://www.ikea.com/us/en/images/products/aina-cushion-cover-beige__0569582_pe665973_s5.jpg?f=s",
      "https://www.ikea.com/us/en/images/products/aina-cushion-cover-beige__0569583_pe665975_s5.jpg?f=s",
      "https://www.ikea.com/us/en/images/products/aina-cushion-cover-beige__0889590_pe672869_s5.jpg?f=s",
      "https://www.ikea.com/us/en/images/products/aina-cushion-cover-beige__0889588_pe665974_s5.jpg?f=s"
    ],
  }
  ```

  - For tiny images used on:
    * "Colors" under "About" section
    -> GET api/images/thumnail/colors/:productId
    ```JSON
      {
        "colors": [
          "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723091_pe733853_s5.jpg?f=xu",
          "https://www.ikea.com/us/en/images/products/koelax-bedspread-gray__0723085_pe733849_s5.jpg?f=xu"
        ],
      }
    ```

  - For hand-drawn-style images of the product-size service if any
    -> GET api/images/sizeService/:productId
  ```JSON
    {
      "sizeService": [
         "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723091_pe733853_s5.jpg?f=xs"
      ]
    }
  ```

  - For large thumbnail images used on:
    -> GET api/images/thumnail/lg/:productId
    * "Other also viewed"
    * "Goes well with"
    * "More from product series"
    ```JSON
      {
        "largeThumbnails": [
          "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723091_pe733853_s5.jpg?f=xxxs",
          "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723092_pe733856_s5.jpg?f=xxxs"
        ],
      }
    ```

  - For medium thumbnail images used on:
    -> GET api/images/thumnail/med/:productId
    * "Similar Products"
    ```JSON
    {
      "mediumThumbnails": [
        "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723091_pe733853_s5.jpg?f=u",
        "https://www.ikea.com/us/en/images/products/koelax-bedspread-dark-green__0723092_pe733856_s5.jpg?f=u"
      ],
    }
    ```



## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

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
      "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0636236_pe697747_s5.jpg?f=xxs',
      'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0452609_ph133274_s5.jpg?f=xxs',
      'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0735708_pe740106_s5.jpg?f=xxs'
    ]
  }
  ```

  - For large images when the user clicks on the image on the produce size
    -> GET api/images/default/lg/:productId
  ```JSON
    {
     "large": [
       "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0636236_pe697747_s5.jpg?f=s',
       'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0452609_ph133274_s5.jpg?f=s',
       'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0735708_pe740106_s5.jpg?f=s'
     ],
    }
  ```


  - For ids of other colors images of the current product
    -> GET api/images/colors/:productId
    - These ids will be used to make API requests for other colors
    - These other colors are actual products (different price, name)
  ```JSON
    {
      "colors": [ 1, 2, 3 ]
    }
  ```

  - For hand-drawn-style images of the product-size service if any
    -> GET api/images/hand/:productId
  ```JSON
    {
      "handDrawns": [
        "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0722637_pe733678_s5.jpg?f=xxs'
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
          "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0636236_pe697747_s5.jpg?f=xxxs',
          'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0452609_ph133274_s5.jpg?f=xxxs'
        ],
      }
    ```

  - For medium thumbnail images used on:
    -> GET api/images/thumnail/med/:productId
    * "Similar Products"
    ```JSON
      "mediumThumbnails": [
        "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0636236_pe697747_s5.jpg?f=u',
        'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0452609_ph133274_s5.jpg?f=u'
      ],
    ```

  - For small thumbnail images used on:
    -> GET api/images/thumnail/sm/:productId
    * "Colors" under "About" section
    ```JSON
      {
        "smallThumbnails": [
          "https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-black-brown__0636236_pe697747_s5.jpg?f=xu',
          'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-gray-stained__0780033_pe759757_s5.jpg?f=xu',
          'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-white__0636233_pe697745_s5.jpg?f=xu',
          'https://www.ikea.com/us/en/images/products/malm-underbed-storage-box-for-high-bed-white-stained-oak-veneer__0636234_pe697749_s5.jpg?f=xu'
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


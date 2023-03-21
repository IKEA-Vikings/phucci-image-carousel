# Project Name
Ikea's image micro-service

> Project description
Displaying an image carousel and provides images source to other micro-services

[![Watch the video](https://i.imgur.com/cyjZeF9.png)](https://drive.google.com/file/d/1clxczrx_AeUCkR0XrMiDyBJDVpqwz4O9/view?usp=share_link)

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
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img7.jpg",
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img8.jpg",
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img9.jpg"
    ],
  }
  ```

  - For large images when the user clicks on the image on the produce size
    -> GET api/images/default/lg/:productId
  ```JSON
  {
    "large": [
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img4.jpg",
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img5.jpg",
      "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img6.jpg"
    ],
  }
  ```

  - For tiny images used on:
    * "Other Colors" under "About" section
    -> GET api/images/thumnail/colors/:productId
    ```JSON
      {
        "colors": [
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img10.jpg",
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img11.jpg",
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img12.jpg",
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img13.jpg",
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img14.jpg",
        ],
      }
    ```

  - For hand-drawn-style images of the product-size service if any
    -> GET api/images/sizeService/:productId
  ```JSON
    {
      "sizeService": [
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img24.jpg"
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
          "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img25.jpg"
        ],
      }
    ```

  - For medium thumbnail images used on:
    -> GET api/images/thumnail/med/:productId
    * "Similar Products"
    ```JSON
    {
      "mediumThumbnails": [
        "https://ikea-clone-image-service.s3.us-west-1.amazonaws.com/img26.jpg"
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


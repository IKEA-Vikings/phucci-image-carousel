import $ from 'jquery';

const request = {
  getOrgImages: (successCb) => {
    let productId = window.location.href.split('/')[3];
    productId = !productId ? 1 : productId;

    $.ajax({
      url: `images/org/${productId}`,
      type: 'GET',
      success: successCb,
      error: () => console.log('Failed to get regular size images for id: ', productId)
    });
  }
};

export default request;
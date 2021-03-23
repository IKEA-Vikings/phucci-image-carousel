import $ from 'jquery';

const request = {
  getOrgImages: (successCb) => {
    let productId = window.location.href.split('/')[3];
    productId = !productId ? 1 : productId;

    $.ajax({
      url: `http://127.0.0.1:3004/images/org/${productId}`,
      type: 'GET',
      success: successCb,
      error: () => console.log('Failed to get regular size images for id: ', id)
    });
  }
};

export default request;
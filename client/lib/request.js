import $ from 'jquery';

const request = {
  getOrgImages: (id, successCb) => {
    $.ajax({
      url: `/images/org/${id}`,
      type: 'GET',
      success: successCb,
      error: () => console.log('Failed to get regular size images for id: ', id)
    });
  }
};

export default request;
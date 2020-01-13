import httpService from './http.service'

export const addProductService = {
   newProd,
   register_instagram,
   getInstaInfo,
   validateInstagram,
   uploadInsight,
   addProduct
};

/**
 *
 * @param username  :   instagram user name ex. leomessi
 */
function newProd(username) {
   return httpService.post("instaaccount/new", {username})
}

function register_instagram(username) {
   return httpService.post("instaaccount/new", {username})
}

function getInstaInfo(username) {
   let insta_api = `https://www.instagram.com/${username.trim()}/?__a=1`;
   return httpService.get(insta_api);
}


function validateInstagram(id) {
   return httpService.post(`instaaccounts/${id}/validate-instagram`, { id })
}

function uploadInsight(form_data, id) {
   return httpService.post(`instaaccounts/${id}/upload-insights`, { form_data })
}

function addProduct(product_info, id) {
   return httpService.post(`instaaccounts/${id}/product`, product_info)
}
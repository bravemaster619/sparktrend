import httpService from './http.service'
const Axios = require('axios')
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
   return httpService.post("instaaccounts/new", {username})
}

function register_instagram(username) {
   return httpService.post("instaaccounts/new", {username})
}

function getInstaInfo(username) {
   return httpService.get(`instaaccounts/instainfo?username=${username}`)
}


function validateInstagram(id) {
   return httpService.post(`instaaccounts/${id}/validate-instagram`, { id })
}

function uploadInsight(form_data, id) {
   return httpService.post(`instaaccounts/${id}/upload-insights`, form_data)
}

function addProduct(product_info, id) {
   return httpService.post(`instaaccounts/${id}/product`, product_info)
}
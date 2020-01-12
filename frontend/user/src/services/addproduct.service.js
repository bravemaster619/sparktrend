import { config } from '../config';
import  Axios  from 'axios';
import { authHeader } from "../helpers";

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
function newProd(username){
    return Axios.post(
        config.base_url("instaaccount/new"),
        {
            username    :   username
        }
    );
}
function register_instagram(username){
    return Axios.post(
        config.base_url("instaaccounts/new"),
        { username : username } ,
        {
            headers : authHeader()
        }
    );
}
/**
 *
 * @param username
 * @returns {Promise<AxiosResponse<T>>}
 *
 * get instagram user bio info by insta api
 */
function getInstaInfo(username){
    let insta_api = `https://www.instagram.com/${username.trim()}/?__a=1`;
    return Axios.get(insta_api);
}


function validateInstagram(id){
    return Axios.post(
        config.base_url(`instaaccounts/${id}/validate-instagram`), {id : id},
            {
                headers: authHeader()
            });

}
function uploadInsight(form_data, id){

    console.log("auth header");
    console.log(authHeader().Authorization);
    return Axios.post(
        config.base_url(`instaaccounts/${id}/upload-insights`),
                form_data
            ,
            {
                headers: authHeader()
            }
    )
}
function addProduct(product_info, id){
    console.log(product_info);
    return Axios.post(
        config.base_url(`instaaccounts/${id}/product`),
            product_info,
        {
            headers:    authHeader()
        }
    )
}
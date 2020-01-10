import { config } from '../config';
import  Axios  from 'axios';

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
function register_instagram(user){

}
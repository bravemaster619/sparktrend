import config from '../config';
import { axios } from 'axios';

export const authService = {
    login,
    logout,
    register
};

function login(email, password) {
    return axios.post(
        config.base_url('/auth/login'), {
            email   :   email,
            password:   password
        });
}

function logout(){
    return axios.post( config.base_url('/auth/logout') );
}
function register(user_info){
    return axios.post(
        config.base_url('/auth/register'),{
            name    :   user_info.name,
            email   :   user_info.email,
            phone   :   user_info.phone,
            password:   user_info.password
        }
    );
}

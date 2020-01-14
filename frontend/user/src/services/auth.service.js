import { config } from '../config';
import  Axios  from 'axios';
import { authHeader } from "../helpers";

export const authService = {
    getCurrentUser,
    login,
    logout,
    register,
    changePassword
};

function login(email, password) {
    return Axios.post(
        config.base_url('auth/login'), {
            email   :   email,
            password:   password
        });
}

function logout(){
    return Axios.post( config.base_url('auth/logout') );
}
function register(user_info){
    return Axios.post(
        config.base_url('auth/register'),{
            name    :   user_info.name,
            email   :   user_info.email,
            password:   user_info.password,
            country :   user_info.country,
            gender  :   user_info.gender,
            paypal_email: user_info.paypal_email
        }
    );
}
function changePassword({password, new_password}){

    return Axios.post(
        config.base_url("auth/password"),{
            password    :   password,
            new_password:   new_password
        },
        {
            headers :   authHeader()
        }
    );
}
function getCurrentUser() {
   return window.localStorage.getItem("user")
}
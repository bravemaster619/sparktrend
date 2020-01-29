import { authService } from "../services/auth.service";
import { router } from "../router";

window.toastr = require("toastr");

let user = JSON.parse(localStorage.getItem('sparktrend-user'));
/**
 * status : request result
 *
 */

let initialState = user ?
    {
        logged_in: true,
        user    :   user,
        //for request result
        status  :  false,
        msg     :   "",

    }:
    {
        logged_in: false,
        user    :   null,
        //for request result
        status  :   false,
        msg     :   ""
    };

export const auth =  {
    namespaced  :   true,
    state       :   initialState,
    actions      :   {
        login( { dispatch, commit }, { email, password } ){

            commit('loginRequest', { email });
            authService.login(email, password)
                .then(result => {
                    let response = result.data;

                    if(response.status !== 200){
                        commit("loginFailure", "Login information is not correct")
                        return;
                    }
                    if(response.data.token){
                        commit('loginSuccess', response.data);
                        router.push('/');
                    }else{
                        commit('loginFailure', "Error Occured");
                    }
                })
                .catch((error) => {
                    window.console.log(error);
                    let com_status = error.response.data.status || 404;
                    if(com_status === 401){
                        commit("loginFailure", "JWT token invalid or did not provided");
                    }else if(com_status === 422){
                        commit("loginFailure", "Validation failed");
                    }else if(com_status === 404){
                        commit("loginFailure", "Page not found");
                    }else{
                        commit("loginFailure", "Connection error");
                    }
                });
        },
        register({commit}, user_info){
            commit("clearState");
            authService.register(user_info)
                .then(result => {
                    window.console.log(result);
                    let response = result.data;
                    if(response.status === 201){
                        commit('setResult', true);
                        router.push("/login");
                    }
                })
                .catch( (error) => {
                    if(error.response.data.status === 422){
                        commit("setResult", false, "Validation failed");

                    }else{
                        commit("setResult", false, "Register failed");
                    }
                });
        },

        logout({commit}){
            commit('logout');
            authService.logout();
            router.push("/");
        },
        checkAuth({commit}, response){
            window.console.log(response);
            if(response.status === 401){
                commit('logout');
                router.push("/login");
            }
        }
    },
    mutations   :   {
        loginSuccess(state, user_data){
            let data = {
                token           : user_data.token,
                refresh_token   : user_data.refreshToken,
                ... user_data.user
            };
            localStorage.setItem('sparktrend-user', JSON.stringify(data));
            state.status = true;
            state.user = user_data.user;
            state.logged_in = true;
        },
        loginRequest(state){
            state.user = null;
            state.logged_in = false;
            localStorage.removeItem("sparktrend-user");

            state.status = false;
            state.msg = "";
        },
        loginFailure(state, msg) {
            state.logged_in = false;
            state.user = null;
            localStorage.removeItem("sparktrend-user");

            state.status = false;
            state.msg = msg;
        },
        logout(state) {
            state.logged_in = false;
            state.user = null;
            localStorage.removeItem("sparktrend-user");

            state.status = true;
            state.msg = "";
        },
        clearState(state){        //change password state clear
            state.status = false;
            state.msg = "";
        },
        setResult(state, status, msg = ""){
            state.status = status;
            state.msg = msg;
        },
    },
    getters : {
        is_success   : (state) => {
            return state.status;
        },
        error_msg    : (state) => {
            if(state.status || !state.msg) return false;
            return state.msg;
        },
        is_ended    :  (state) => {
            if(state.status) return true;
            if(state.msg) return true;
            return false;
        }
    }
};
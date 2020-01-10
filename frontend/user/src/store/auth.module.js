import { authService } from "../services/auth.service";
import { router } from "../router";


let user = JSON.parse(localStorage.getItem('user'));
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
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        commit('loginSuccess', response.data.user);
                        console.log("test");
                        router.push('/');
                    }else{
                        commit('loginFailure', "Error Occured");
                    }
                })
                .catch((error) => {
                    console.log(error);
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
            commit("registerRequest");
            authService.register(user_info)
                .then(result => {
                    console.log(result);
                    let response = result.data;
                    if(response.status === 201){
                        commit('registerSuccess');
                        router.push("/login");
                    }
                })
                .catch( (error) => {
                    if(error.response.data.status === 422){
                        commit("registerFailed", "Validation failed");
                    }else{
                        commit("registerFailed", "Register failed");
                    }
                });
        },
        logout({commit}){
            commit('logout');
            authService.logout();
            router.push("/login");
        },
        changePassword({commit}, change_info){
            commit("clearState");
            authService.changePassword(change_info)
                .then( ( { data }) => {

                })
        }
    },
    mutations   :   {
        loginSuccess(state, user){
            state.status = true;
            state.user = user;
            state.logged_in = true;
        },
        loginRequest(state){
            state.user = null;
            state.logged_in = false;
            localStorage.removeItem("user");

            state.status = false;
            state.msg = "";
        },
        loginFailure(state, msg) {
            state.logged_in = false;
            state.user = null;
            localStorage.removeItem("user");

            state.status = false;
            state.msg = msg;
        },
        logout(state) {
            state.status = "req_end";
            state.logged_in = false;
            state.user = null;
            localStorage.removeItem("user");
        },

        registerRequest(state){
            state.status = false;
            state.msg = "";
            localStorage.removeItem("user");
        },
        registerFailed(state, msg){
            state.status = false;
            state.msg = msg;
            localStorage.removeItem("user");
        },
        registerSuccess(state){
            state.status = true;
            state.msg = "";
            localStorage.removeItem("user");
        },
        clearState(state){
            state.status = false;
            state.msg = "";
        },
        setResult(state, status, msg = ""){
            state.status = status;
            state.msg = msg;
        }
    }
};
import { authService } from "../services/auth.service";

let user = JSON.parse(localStorage.getItem('user'));
let initialState = user ?
    {
        status  : {
            loggedIn    :   true,
        },
        user    :   user
    }:
    {
        status  :   {},
        user    :   null
    };

export const authAction = {
    namespaced  :   true,
    state       :   initialState,
    action      :   {
        login( { dispatch, commit }, { email, password } ){
            commit('loginRequest', { email });
            authService.login(email, password)
                .then()
        }
    }
};
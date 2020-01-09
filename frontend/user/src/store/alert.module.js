export const alert = {
    namespaced  :   true,
    state       :   {
        type    :   null,
        message :   null
    },
    actions     :   {
        success({commit}, message){
            commit('success', message);
        },
        error({commit}, message){
            commit('error', message);
        },
        clear({commit}, message){
            commit('clear', message);
        }
    },
    mutations   :   {
        success(state, message){
            state.type = 'alert-success';
            state.message = message;
        },
        error(state, message){
            state.type = 'alert-error';
            state.message = message;
        },
        clear(state, message){
            state.type = 'alert-clear';
            state.message = message;
        }
    }
};
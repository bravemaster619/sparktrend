import Vue from "vue";
import VueToastr2 from 'vue-toastr-2';
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

let toastr = require("toastr");
Vue.use(VueToastr2);

export const alert = {
    namespaced  :   true,
    state       :   {
        type    :   null,
        message :   null
    },
    actions     :   {
        success({commit}, message, title = "", timeOut = 3000){
            toastr.success(message, title, {timeOut : timeOut});
        },
        error({commit}, message, title = "", timeOut = 3000){
            toastr.error(message, title, {timeOut : timeOut});
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
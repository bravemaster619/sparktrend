import { auth } from './auth.module';
import { alert } from './alert.module';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    namespaced: true,
    modules: {
        auth,
        alert,
    },
});

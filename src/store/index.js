import Vue from "vue";
import Vuex from "vuex";
import { signinUser, signupUser } from "../api/auth";
import {  getDevices } from "../api/onvif";
import {
    getTokenFromLocalStorage,
    saveTokenToLocalStorage,
} from "../utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: getTokenFromLocalStorage() || "",
        cams: null,
        isLoadingCams: false,
    },
    getters: {
        isLogin(state) {
            return state.token !== "";
        },
        isLoadingCams(state) {
            return state.isLoadingCams;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setCams(state, cams) {
            state.cams = cams;
            state.isLoadingCams = false;
        },
        setLoadingCams(state, isLoading) {
            state.isLoadingCams = isLoading;
        }
    },
    actions: {
        async Signin({ commit }, userData) {
            const { data } = await signinUser(userData);
            commit("setToken", data.token);
            saveTokenToLocalStorage(data.token);
            return data;
        },
        async Signup({ commit }, userData) {
            const { data } = await signupUser(userData);
            commit("setToken", data.token);
            saveTokenToLocalStorage(data.token);
            return data;
        },
        Signout({ commit }) {
            commit("setToken", "");
            saveTokenToLocalStorage("");
        },
        async discoveryCams({ commit }) {
            commit("setLoadingCams", true);
            try {
                const { data } = await getDevices();
                commit("setCams", data);
                return data;
            } catch(error) {
                console.error(error);
                commit("setLoadingCams", false);
            } 
        }
    }
});
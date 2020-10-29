import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { nanoid } from "nanoid";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: []
  },
  getters: {
    categories: state => state.categories,
    products: state => state.products
  },
  mutations: {
    ADD_PRODUCT(state, payload) {
      state.products = [payload, ...state.products];
    },
    UPDATE_PRODUCT(state, payload) {
      state.products = state.products.map(p => {
        if (p.id === payload.id) return payload;
        return p;
      });
    },
    REMOVE_PRODUCT(state, payload) {
      state.products = state.products.filter(p => p.id !== payload);
    },
    ADD_CATEGORY(state, payload) {
      state.categories = [payload, ...state.categories];
    },
    UPDATE_CATEGORY(state, payload) {
      state.categories = state.categories.map(c => {
        if (c.id === payload.id) return payload;
        return c;
      });
    },
    REMOVE_CATEGORY(state, payload) {
      state.categories = state.categories.filter(p => p.id !== payload);
    }
  },
  actions: {
    createProduct({ commit }, data) {
      commit("ADD_PRODUCT", {
        id: nanoid(10),
        ...data,
        createdAt: new Date()
      });
    },
    createCategory({ commit }, data) {
      commit("ADD_CATEGORY", data);
    },
    updateCategory({ commit }, data) {
      commit("UPDATE_CATEGORY", data);
    },
    updateProduct({ commit }, data) {
      commit("UPDATE_PRODUCT", data);
    }
  },
  plugins: [vuexLocal.plugin]
});

/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import { endpoints } from "../config/endpoints";
import { api } from "./../api";

window.api = api;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    instruments: [],
    bucketed: [],
    orders: [],
    wallet: [],
    error: null,
    errorMessage: "",
  },

  mutations: {
    INSTRUMENTS: (state, instruments) => {
      state.instruments = instruments;
    },
    BUCKETED: (state, bucketed) => {
      state.bucketed = bucketed;
    },
    ORDERS: (state, orders) => {
      state.orders = orders;
    },
    WALLET: (state, wallet) => {
      state.wallet = wallet;
    },
    ERROR(state, payload) {
      if (!payload) {
        state.error = false;
        state.errorMessage = "";
      } else {
        state.error = payload.error;
        state.errorMessage = payload.errorMessage;
      }
    },
  },

  getters: {
    summary(state) {
      return state.wallet.reduce((acc, curr) => (acc += curr.walletBalance), 0);
    },
  },

  actions: {
    async INIT({ commit, dispatch }) {
      dispatch("GET_INSTRUMENTS");
      dispatch("GET_BUCKETED");
      dispatch("GET_ORDERS");
      dispatch("GET_WALLET");
    },
    async GET_INSTRUMENTS({ commit }) {
      const response = await api.http.get(endpoints.instruments);
      if (response.statusText === "OK") {
        commit("INSTRUMENTS", response.data);
      }
    },
    async GET_BUCKETED({ commit }) {
      const response = await api.http.get(endpoints.bucketed, {
        params: endpoints.bucketedParams,
      });
      if (response.statusText === "OK") {
        commit("BUCKETED", response.data);
      }
    },
    async GET_ORDERS({ commit }) {
      const response = await api.http.get(endpoints.orders, {
        headers: {
          signature: true,
        },
      });
      if (response.statusText === "OK") {
        commit("ORDERS", response.data);
      }
    },
    async GET_WALLET({ commit }) {
      api.http
        .get(endpoints.wallet, {
          headers: {
            signature: true,
          },
        })
        .then((response) => {
          if (response.statusText === "OK") {
            commit("WALLET", response.data);
          }
        })
        .catch((error) => {
          commit("ERROR", {
            error: true,
            errorMessage: error.response.data.error.message,
          });
        });
    },
    async POST_ORDERS({ store, commit }, order) {
      api.http
        .post(endpoints.orders, order, {
          headers: {
            signature: true,
          },
        })
        .then((response) => {
          if (response.statusText === "OK") {
            commit("ORDERS", store.orders.concat([response.data]));
          }
        })
        .catch((error) => {
          commit("ERROR", {
            error: true,
            errorMessage: error.response.data.error.message,
          });
        });
    },
  },
  modules: {},
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login(_, userData) {
      return axios.post('/auth', userData)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
        });
    },
    logout() {
      return new Promise((resolve) => {
        localStorage.removeItem('accessToken');
        resolve();
      });
    },
    fetchProfile({ commit }) {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        return Promise.reject();
      }

      return axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          commit('setUser', response.data);
        });
    },
  },
});

import axios from 'axios';

const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
const SET_USER = 'SET_USER';

const state = {
  user: null,
  token: null
};

const getters = {

};

const actions = {
  register: async ({ dispatch }, { name, email, password }) => {
    await axios.post('/user/signup', { name, email, password });
    await dispatch('auth/logIn', { email, password });
  },
  
  login: async ({ commit }, { email, password }) => {
    const response = await axios.post('/user/login', { email, password });
    const { token, user } = response.data; 
    commit(SET_USER, user);
    commit(SET_AUTH_TOKEN, token);
    localStorage.setItem('token', token);
  }
};

const mutations = {
  [SET_AUTH_TOKEN]: (state, token) => {
    state.token = token;
  },
  [SET_USER]: (state, user) => {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

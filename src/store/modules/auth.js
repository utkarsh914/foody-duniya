import axios from 'axios';
import { RoleTypes } from '../../constants.js';

const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
const SET_USER = 'SET_USER';
const SET_ROLE = 'SET_ROLE';

const state = {
  role: null,
  user: null,
  token: null
};

const getters = {
  isAuthenticated: ({ token, user }) => !!token && !!user
};

const actions = {
  registerUser: async ({ dispatch }, { name, username, password }) => {
    await axios.post('/user/signup', { name, username, password });
    await dispatch('auth/loginUser', { username, password });
  },
  
  loginUser: async ({ dispatch }, { username, password }) => {
    const response = await axios.post('/user/login', { username, password });
    const { token, user } = response.data; 
    dispatch('setLoginData', { user, token, role: RoleTypes.USER });
  },

  registerAdmin: async ({ dispatch }, { username, password }) => {
    await axios.post('/admin/signup', { username, password });
    await dispatch('auth/loginAdmin', { username, password });
  },
  
  loginAdmin: async ({ dispatch }, { username, password }) => {
    const response = await axios.post('/admin/login', { username, password });
    const { token, user } = response.data;
    dispatch('setLoginData', { user, token, role: RoleTypes.ADMIN });
  },

  setLoginData: ({ commit }, { user, token, role }) => {
    commit(SET_USER, user);
    commit(SET_AUTH_TOKEN, token);
    commit(SET_ROLE, role);
  },

  logout: ({ dispatch }) => {
    dispatch('setLoginData', { user: null, token: null, role: null });
  }
};

const mutations = {
  [SET_AUTH_TOKEN]: (state, token) => {
    state.token = token;
    localStorage.setItem('token', token);
  },
  [SET_USER]: (state, user) => {
    state.user = user;
  },
  [SET_ROLE]: (state, role) => {
    state.role = role;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

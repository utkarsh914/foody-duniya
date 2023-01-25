import axios from 'axios';

const state = {};

const getters = {};

const actions = {
  fetchDishes: async (_, searchQuery) => {
    const response = await axios.get('/user/search-dishes', { params: { name: searchQuery } });
    return response.data.dishes;
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

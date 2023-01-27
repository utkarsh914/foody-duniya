import axios from 'axios';

const state = {};

const getters = {};

const actions = {
  fetchDish: async (_, id) => {
    const response = await axios.get('/dish/search-dish', { params: { id } });
    return response.data.dish;
  },
  fetchDishes: async (_, searchQuery) => {
    const response = await axios.get('/dish/search-dishes', { params: { name: searchQuery } });
    return response.data.dishes;
  },
  createDish: async (_, { name, description, price }) => {
    const response = await axios.post('/dish', { name, description, price });
    return response.data.dish;
  },
  editDish: async (_, { id, name, description, price }) => {
    const response = await axios.patch('/dish', { id, name, description, price });
    return response.data.dish;
  },
  deleteDish: async (_, dishId) => {
    await axios.delete('/dish', { dishId });
    return true;
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

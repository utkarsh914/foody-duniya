const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';

const state = {
  dishes: {}
};

const getters = {
  dishes: state => {
    return Object.values(state.dishes);
  }
};

const actions = {
  addDishToCart: ({ commit }, dish) => {
    commit(ADD_DISH_TO_CART, dish);
  },

  removeDishFromCart: ({ commit }, dish) => {
    commit(REMOVE_DISH_FROM_CART, dish);
  }
};

const mutations = {
  [ADD_DISH_TO_CART]: (state, dish) => {
    state[dish.id] = dish;
  },
  [REMOVE_DISH_FROM_CART]: (state, dishId) => {
    delete state.dishes[dishId];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

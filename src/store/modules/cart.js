const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';

const state = {
  dishesInCart: {}
};

const getters = {
  dishesInCartArray: state => Object.values(state.dishesInCart)
};

const actions = {
  addDishToCart: ({ commit }, dish) => {
    commit(ADD_DISH_TO_CART, dish);
  },

  removeDishFromCart: ({ commit }, dishId) => {
    commit(REMOVE_DISH_FROM_CART, dishId);
  }
};

const mutations = {
  [ADD_DISH_TO_CART]: (state, dish) => {
    const newDishesInCart = {
      ...state.dishesInCart,
      [dish._id]: dish
    };
    state.dishesInCart = newDishesInCart;
  },
  [REMOVE_DISH_FROM_CART]: (state, dishId) => {
    const newDishesInCart = { ...state.dishesInCart };
    delete newDishesInCart[dishId];
    state.dishesInCart = newDishesInCart;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

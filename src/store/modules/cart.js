const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';
const SET_DISH_COUNT = 'SET_DISH_COUNT';

const state = {
  dishesInCart: {},
  dishesInCartCount: {}
};

const getters = {

  dishesInCartArray: state => Object.values(state.dishesInCart),

  dishesInCartCount: state => state.dishesInCartCount
};

const actions = {

  addDishToCart: ({ commit, state }, dish) => {
    const count = (state.dishesInCartCount[dish._id] || 0) + 1;
    commit(ADD_DISH_TO_CART, dish);
    commit(SET_DISH_COUNT, { id: dish._id, count });
  },

  removeDishFromCart: ({ commit, state }, dishId) => {
    const count = state.dishesInCartCount[dishId] - 1;
    if (count === 0)
      commit(REMOVE_DISH_FROM_CART, dishId);
    commit(SET_DISH_COUNT, { id: dishId, count });
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
  },
  [SET_DISH_COUNT]: (state, { id, count }) => {
    const newDishesInCartCount = { ...state.dishesInCartCount };
    newDishesInCartCount[id] = count;
    state.dishesInCartCount = newDishesInCartCount;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

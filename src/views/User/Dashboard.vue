<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-8 card">
        <div v-if="showError" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <form class="login-form" @submit="handleSearchBarSubmit">
          <div class="form-group">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Type to search a dish">
          </div>
        </form>
        <h1 class="mb-2">Cart count: {{ dishesInCartArray.length }}</h1>
        <div v-if="isLoading">
          <h1>Loading...</h1>
        </div>
        <div v-else-if="!dishes || !dishes.length">
          <h1>No dishes found!</h1>
        </div>
        <div v-else v-for="dish in dishes" :key="dish._id" class="food-card p-2 mb-2">
          <b>{{ dish.name }}</b>
          <br>
          <img :src="dish.picture" alt="Dish picture" class="dish-image" />
          <br>
          {{ dish.description }}
          <br>
          Price: INR {{ dish.price }}
          <br>
          <button
            @click="removeDishFromCart(dish._id)"
            :disabled="!dishesInCartCount[dish._id]"
            class="my-1 btn btn-secondary cart-add-remove-btn">
            -
          </button>
          [ {{ dishesInCartCount[dish._id] || 0 }} ]
          <button
            @click="addDishToCart(dish)"
            class="my-1 btn btn-primary cart-add-remove-btn">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'dashboard-page',
  data() {
    return {
      searchQuery: "",
      dishes: [],
      showError: false,
      isLoading: false
    };
  },
  computed: {
    ...mapState('cart', ['dishesInCart']),
    ...mapGetters('cart', ['dishesInCartArray', 'dishesInCartCount']),
    errorMessage() {
      return "Error occured!";
    }
  },
  async beforeMount() {
    this.isLoading = false;
    try {
      const dishes = await this.fetchDishes("");
        this.dishes = dishes;
    }
    catch (err) {
      console.log(err);
      this.dishes = [];
      this.showError = true;
    }
  },
  methods: {
    ...mapActions('dish', ['fetchDishes']),
    ...mapActions('cart', ['addDishToCart', 'removeDishFromCart']),
    async handleSearchBarSubmit(e) {
      e.preventDefault();
      this.isLoading = true;
      this.showError = false;
      try {
        const dishes = await this.fetchDishes(this.searchQuery);
        this.dishes = dishes;
      }
      catch (err) {
        console.log(err);
        this.dishes = [];
        this.showError = true;
      }
      finally {
        this.isLoading = false;
      }
    }
  },
};
</script>

<style scoped>
.food-card {
  border: 1px solid grey;
  border-radius: 5px;
}
.cart-add-remove-btn {
  width: 40px;
}

.dish-image {
  max-height: 100px;
}
</style>
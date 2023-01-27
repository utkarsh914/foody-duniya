<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-6 card">
        <h1 class="mb-2">Cart</h1>
        <div v-if="!dishesInCartArray.length">
          <h1>Cart is empty</h1>
        </div>
        <div v-else v-for="dish in dishesInCartArray" :key="dish._id" class="food-card p-2 mb-2">
          <b>{{ dish.name }}</b>
          <br>
          {{ dish.description }}
          <button v-if="!dishesInCart[dish._id]" @click="addDishToCart(dish)" class="my-1 btn btn-primary">
            Add to cart
          </button>
          <button v-else @click="removeDishFromCart(dish._id)" class="my-1 btn btn-secondary">
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'cart-page',
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
    ...mapGetters('cart', ['dishesInCartArray']),
    errorMessage() {
      return "Error occured!";
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
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.food-card {
  border: 1px solid grey;
  border-radius: 5px;
}
</style>
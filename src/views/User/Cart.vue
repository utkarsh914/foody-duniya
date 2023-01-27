<template>
  <div class="container">
    <div class="row justify-content-center text-left">
      <div class="p-3 mt-6 col-md-6 card">
        <h1 class="mb-3"><b>Cart</b></h1>
        <div v-if="!dishesInCartArray.length">
          <h1>Cart is empty</h1>
        </div>
        <div v-else>
          <div v-for="dish in dishesInCartArray" :key="dish._id" class="food-card p-2 mb-2">
            <p><b>{{ dish.name }}</b></p>
            <p style="text-overflow: ellipsis">{{ dish.description }}</p>
            <div>
              <span class="mr-6">Price: {{ dish.price }}</span>
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
          <p class="my-4"><b>Cart total: INR {{ cartTotal }}</b></p>
          <button @click="checkout" class="my-1 btn btn-block btn-primary">
            Checkout
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
    ...mapGetters('cart', ['dishesInCartArray', 'dishesInCartCount']),
    errorMessage() {
      return "Error occured!";
    },
    cartTotal() {
      let total = 0;
      this.dishesInCartArray.forEach(({ price, _id }) => {
        total += parseInt(price) * this.dishesInCartCount[_id];
      });
      return total;
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
</style>
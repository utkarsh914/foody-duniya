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
        <button @click="redirectToAddNewDish" class="btn btn-primary btn-block mb-2">Add new dish</button>
        <div v-if="isLoading">
          <h1>Loading...</h1>
        </div>
        <div v-else-if="!dishes || !dishes.length">
          <h1>No dishes found!</h1>
        </div>
        <div v-else v-for="dish in dishes" :key="dish._id" class="food-card p-2 mb-2">
          <b>{{ dish.name }}</b>
          <br>
          {{ dish.description }}
          <br>
          Price: INR {{ dish.price }}
          <br>
          <button @click="redirectToEditDishPage(dish)" class="my-1 mr-2 btn btn-primary">
            Edit dish
          </button>
          <button @click="handleDeleteDish(dish._id)" class="my-1 btn btn-secondary">
            Delete dish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
    errorMessage() {
      return "Error occured!";
    }
  },
  async beforeMount() {
    await this.fetchDishesByQuery("");
  },
  methods: {
    ...mapActions('dish', ['fetchDishes', 'deleteDish']),
    async handleSearchBarSubmit(e) {
      e.preventDefault();
      await this.fetchDishesByQuery(this.searchQuery);
    },
    async fetchDishesByQuery(query) {
      this.isLoading = true;
      this.showError = false;
      try {
        const dishes = await this.fetchDishes(query);
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
    },
    async handleDeleteDish(id) {
      try {
        await this.deleteDish(id);
        alert('Deleted successfully');
        await this.fetchDishesByQuery("");
      }
      catch (err) {
        console.log('ERROR', err);
        this.showError = true;
        alert('Could not delete the dish!');
      }
    },
    redirectToEditDishPage(dish) {
      this.$router.push(`edit-dish/${dish._id}`);
    },
    redirectToAddNewDish() {
      this.$router.push({ name: 'create-dish' });
    }
  },
};
</script>

<style scoped>
.food-card {
  border: 1px solid grey;
  border-radius: 5px;
}
</style>
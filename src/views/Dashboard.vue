<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-6 card">
        <div v-if="showError" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <form class="login-form" @submit="handleSearchBarSubmit">
          <div class="form-group">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Type to search a dish">
          </div>
        </form>
        <div v-if="isLoading">
          <h1>Loading...</h1>
        </div>
        <div v-if="!dishes || !dishes.length">
          <h1>No dishes found!</h1>
        </div>
        <div v-for="dish in dishes" :key="dish.id" class="food-card">
          <p>{{ dish.name }}</p>
          <p>{{ dish.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    errorMessage() {
      return "Error occured!";
    }
  },
  methods: {
    ...mapActions('dish', ['fetchDishes']),
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
</style>
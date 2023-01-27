<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-6 card">
        <div v-if="fetchDishFailed">
          <p><b>Some error occured!</b></p>
        </div>
        <div v-else-if="isLoading">
          <p><b>Loading...</b></p>
        </div>
        <form v-else class="login-form">
          <div class="mb-2">
            <b>Edit dish</b>
          </div>
          <div class="form-group">
            <input v-model="name" type="text" class="form-control" placeholder="Enter dish name">
          </div>
          <div class="form-group">
            <textarea v-model="description" class="form-control" name="description" rows="3" placeholder="Enter description for the dish" />
          </div>
          <div class="form-group">
            <input v-model="price" type="number"  class="form-control" placeholder="Enter price in rupees">
          </div>
          <button type="submit" @click="submitForm" class="btn btn-primary btn-block">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'edit-dish-page',
  created() {
    this.id = this.$route.params.id;
    this.handleFetchDish(this.id);
  },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      price: "",
      showError: false,
      isLoading: false,
      fetchDishFailed: false
    };
  },
  computed: {
    errorMessage() {
      return "Error occured!";
    }
  },
  methods: {
    ...mapActions('dish', ['editDish', 'fetchDish']),
    async handleFetchDish(id) {
      try {
        this.isLoading = true;
        const dish = await this.fetchDish(id);
        this.name = dish.name;
        this.price = dish.price;
        this.description = dish.description;
      }
      catch (err) {
        console.log(err);
        this.fetchDishFailed = true;
      }
      finally {
        this.isLoading = false;
      }
    },
    async submitForm(e) {
      e.preventDefault();
      this.showError = false;
      try {
        const { id, name, description, price } = this;
        await this.editDish({ id, name, description, price });
        alert('Edited successfully!');
      }
      catch (err) {
        console.log(err);
        this.showError = true;
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
</style>
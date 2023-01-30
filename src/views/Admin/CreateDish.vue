<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-6 card">
        <form class="login-form">
          <div class="mb-2">
            <b>Create a new dish</b>
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
          <!-- <b-form-file
            v-model="picture"
            :state="Boolean(picture)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file> -->
          <div class="form-group">
            <input type="file" name="picture" class="form-control" v-on:change="handleFileSelect" />
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
  name: 'create-dish-page',
  data() {
    return {
      name: "",
      description: "",
      price: "",
      picture: null,
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
    ...mapActions('dish', ['createDish']),
    handleFileSelect(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.picture = reader.result;
      });
      reader.readAsDataURL(file);
    },
    async submitForm(e) {
      e.preventDefault();
      this.showError = false;
      try {
        const { name, description, price, picture } = this;
        await this.createDish({ name, description, price, picture });
        alert('Created successfully!');
        this.resetFormData();
      }
      catch (err) {
        console.log(err);
        this.showError = true;
      }
    },
    resetFormData() {
      this.name = "";
      this.description = "",
      this.price = ""
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
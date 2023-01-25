<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="p-3 mt-6 col-md-6 card">
        <form class="login-form" @submit="handleSearchBarSubmit">
          <div class="form-group">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Type to search a dish">
          </div>
        </form>
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
      showError: false,
      errorMessage: null
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleSearchBarSubmit(e) {
      e.preventDefault();
      this.showError = false;
      try {
        console.log('Hi from search bar enter');
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
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
</style>
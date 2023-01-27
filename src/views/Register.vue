<template>
  <div class="container">
    <div class="row justify-content-center px-4 py-3 my-6">
      <form class="card col-md-8 p-4">
        <div class="mb-2"><h1>Register</h1></div>
        <div v-if="showError" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <input v-model="name" type="text" class="form-control" placeholder="Enter full name">
        </div>
        <div class="form-group">
          <input v-model="username" type="text" class="form-control" placeholder="Enter username">
        </div>
        <div class="form-group">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
        </div>
        <div class="form-group">
          <label class="text-left">Select role</label>
          <select v-model="role" class="form-control">
            <option v-for="role in roleTypesArray" :key="role">
              {{ role }}
            </option>
          </select>
        </div>
        <button type="submit" @click="submitForm" class="btn btn-primary btn-block">Submit</button>
        <div class="mt-2">
          Existing user?
          <RouterLink to="/login">
            <span class="btn btn-secondary-">Login</span>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { RoleTypes } from '../constants';

export default {
  name: 'register-page',
  data() {
    return {
      role: RoleTypes.USER,
      name: "",
      username: "",
      password: "",
      showError: false,
    };
  },
  computed: {
    errorMessage() {
      return "Error occured!";
    },
    roleTypesArray() {
      return Object.values(RoleTypes);
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'registerAdmin']),
    async submitForm(e) {
      e.preventDefault();
      if (this.role === RoleTypes.USER) await this.handleUserSignUp();
      else await this.handleAdminSignUp();
    },
    async handleUserSignUp() {
      this.showError = false;
      try {
        const { name, username, password } = this;
        await this.registerUser({ name, username, password });
        this.$router.push("/");
      }
      catch (err) {
        console.log(err);
        this.showError = true;
      }
    },
    async handleAdminSignUp() {
      this.showError = false;
      try {
        const { name, username, password } = this;
        await this.registerAdmin({ name, username, password });
        this.$router.push({ name: 'admin-dashboard' });
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
.form-container {
  width: 50%;
  max-width: 90%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 2%;
}
</style>
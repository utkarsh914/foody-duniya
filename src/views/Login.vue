<template>
  <div class="container">
    <div class="row justify-content-center px-4 py-3 my-6">
      <form class="card col-md-8 p-4">
        <div class="mb-2"><b>Login</b></div>
        <div v-if="showError" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <input v-model="username" type="text" class="form-control" placeholder="Enter email">
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
          New user?
          <RouterLink to="/register">
            <span class="btn btn-secondary-">Register</span>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { RoleTypes } from '../constants';
import { mapActions } from 'vuex';

export default {
  name: 'login-page',
  data() {
    return {
      role: RoleTypes.USER,
      username: "",
      password: "",
      showError: false,
      errorMessage: 'Some error occured!'
    };
  },
  computed: {
    roleTypesArray() {
      return Object.values(RoleTypes);
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser', 'loginAdmin']),
    async submitForm(e) {
      e.preventDefault();
      if (this.role === RoleTypes.USER) await this.handleUserLogin();
      else await this.handleAdminLogin();
    },
    async handleUserLogin() {
      this.showError = false;
      try {
        const { username, password } = this;
        await this.loginUser({ username, password });
        this.$router.push("/");
      }
      catch (err) {
        console.log(err);
        this.showError = true;
      }
    },
    async handleAdminLogin() {
      this.showError = false;
      try {
        const { username, password } = this;
        await this.loginAdmin({ username, password });
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
</style>
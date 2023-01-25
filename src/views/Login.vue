<template>
  <div class="container flex justify-content-center">
    <div class="form-container px-4 py-3 my-6">
      <form class="login-form">
        <div class="mb-2"><h1>Login</h1></div>
        <div class="form-group">
          <input v-model="email" type="email" class="form-control" placeholder="Enter email">
        </div>
        <div class="form-group">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
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
import { mapActions } from 'vuex';

export default {
  name: 'login-page',
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submitForm(e) {
      e.preventDefault();
      this.showError = false;
      try {
        const { email, password } = this;
        await this.login({ email, password });
        this.$router.push("/dashboard");
      }
      catch (err) {
        console.log(err);
        this.showError = true;
      }
    },
    moveToRegister() {
      this.$router.push("/register");
    },
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
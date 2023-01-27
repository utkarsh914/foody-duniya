<template>
  <nav v-if="isAuthenticated" class="bg-primary- bg-light text-light">
    <router-link to="/cart" v-if="showCart"><button class="btn btn-secondary mr-3">Go to Cart</button></router-link>
    <router-link to="/logout"><button class="btn btn-secondary">Logout</button></router-link>
  </nav>
  <router-view/>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { RoleTypes } from './constants';

export default {
  name: 'app',
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['role']),
    showCart() {
      return this.role === RoleTypes.USER && this.$route.name !== 'cart';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav {
  padding: 20px;
}
nav a {
  font-weight: bold;
}

</style>

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import '../node_modules/bulma/css/bulma.css'
import '@/assets/styles.css';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4444/';
// axios.defaults.baseURL = 'https://foody-duniya-api.herokuapp.com/';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

createApp(App).use(store).use(router).mount('#app')

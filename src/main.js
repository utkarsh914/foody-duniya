import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import '../node_modules/bulma/css/bulma.css';
import '@/assets/styles.css';

const baseUrl = process.env.NODE_ENV === 'development'
              ? 'http://localhost:4444/' : 'https://foody-duniya-api.herokuapp.com/';
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

createApp(App).use(store).use(router).mount('#app');

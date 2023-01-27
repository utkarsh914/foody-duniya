import { createRouter, createWebHashHistory } from 'vue-router';
import { RoleTypes } from '@/constants';
import store from '@/store';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/User/Dashboard.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import Cart from '../views/User/Cart.vue';
import CreateDish from '../views/Admin/CreateDish.vue';
import EditDish from '../views/Admin/EditDish.vue';
import FourOhFour from '../views/FourOhFour.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
    meta: {
      requireAuth: true,
      roles: [RoleTypes.USER]
    }
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: {
      requireAuth: true,
      roles: [RoleTypes.ADMIN]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      requireAuth: true,
      roles: [RoleTypes.USER]
    }
  },
  {
    path: '/create-dish',
    name: 'create-dish',
    component: CreateDish,
    meta: {
      requireAuth: true,
      roles: [RoleTypes.ADMIN]
    }
  },
  {
    path: '/edit-dish/:id',
    name: 'edit-dish',
    component: EditDish,
    meta: {
      requireAuth: true,
      roles: [RoleTypes.ADMIN]
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: {
      beforeRouteEnter(to, from, next) {
        console.log(store);
        store.dispatch('auth/logout');
        next({ name: 'login' });
      }
    }
  },
  {
    path: "*",
    name: '404',
    component: FourOhFour
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const role = store.state.auth.role;
    if (isAuthenticated && to.meta.roles.includes(role)) next();
    else next({ name: 'login' });
  }
  else next();
});

export default router;

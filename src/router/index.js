import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('accessToken')) {
        next({ name: 'auth' });
      }
      next();
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('accessToken')) {
        next({ name: 'profile' });
      }
      next();
    },
  },
  {
    path: '*',
    name: 'home',
    redirect: () => {
      if (localStorage.getItem('accessToken')) {
        return { name: 'auth' };
      }
      return { name: 'profile' };
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

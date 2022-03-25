import Vue from 'vue';
import VueRouter from 'vue-router';
import Base from '@/views/Layout/Base.vue';
import Main from '@/views/Layout/MainPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/base',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.Base,
  routes,
});

export default router;

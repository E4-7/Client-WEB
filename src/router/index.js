import Vue from 'vue';
import VueRouter from 'vue-router';
import Base from '@/views/Layout/Base.vue';
import Main from '@/views/Layout/MainPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/base',
  },
  {
    path: '/base',
    name: 'BaseMain',
    component: Main,
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('@/views/Layout/Student/VerifyIdentity.vue'),
  },
  {
    path: '/set',
    name: 'Set',
    component: () => import('@/views/Layout/Student/SetStudent.vue'),
  },
  {
    path: '/test',
    name: 'StudentExam',
    component: () => import('@/views/Layout/Student/TestRoom.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Layout/Professor/LoginProfessor.vue'),
  },
  {
    path: '/main',
    name: 'Professor',
    component: () => import('@/views/Layout/Professor/MainManage.vue'),
  },
  {
    path: '/main/:roomId',
    name: 'ExamRoom',
    component: () => import('@/views/Layout/ExamRoom.vue'),
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
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.Base,
  routes,
});

export default router;

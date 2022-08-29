import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import AppView from '@/views/AppView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/app',
    name: 'App',
    component: AppView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

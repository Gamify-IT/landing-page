import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import AppView from '@/views/AppView.vue';
import StartView from '@/views/StartView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/start',
    name: 'Start',
    component: StartView,
  },
  {
    path: '/app',
    name: 'App',
    props: true,
    component: AppView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

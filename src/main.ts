import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { hasToken } from './ts/login-rest-client';

router.beforeEach((to, _, next) => {
  if (hasToken() && (to.name == 'Login' || to.name == 'Register')) {
    next({ name: 'App' });
  } else if (!hasToken() && to.name == 'App') {
    next({ name: 'Login' });
  } else if (to.name == 'Not-Found') {
    next({ name: 'App' });
  } else {
    next();
  }
});

const app = createApp(App);

app.use(BootstrapVue3);
app.use(Toast);
app.use(store).use(router).mount('#app');

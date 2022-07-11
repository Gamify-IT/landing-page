import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { auth } from './ts/login-rest-client';

router.beforeEach((to, from, next) => {
  if (auth.isLoggedIn && (to.name == 'Login' || to.name == 'Register')) {
    console.log('STATUS: user is logged in, redirect to app');
    next({ name: 'App' });
  } else if (!auth.isLoggedIn && to.name == 'App') {
    console.log('STATUS: user ist not logged, redirect to login');
    next({ name: 'Login' });
  } else if (to.name == 'Not-Found') {
    console.log('STATUS: not found');
    next({ name: 'App' });
  } else {
    console.log('STATUS: do nothing', to.name);
    next();
  }
});

async function main() {
  await auth.checkLoginStatusAndRenewToken();
  console.log('login status checked', auth.isLoggedIn);
  console.log('starting app');
  const app = createApp(App);

  app.use(BootstrapVue3);
  app.use(Toast);
  app.use(store).use(router).mount('#app');
}

main();

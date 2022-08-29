import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { auth } from '@/ts/auth';
import { keycloak } from '@/ts/keycloak-rest-client';

router.beforeEach(async (to, _from, next) => {
  await auth.tryRenewAccessToken();
  const isLoggedIn = await auth.tryUpdateUserInfo();

  if (isLoggedIn && to.name == 'Login') {
    console.log('STATUS: user is logged in, redirect to app');
    next({ name: 'App' });
  } else if (!isLoggedIn && to.name == 'App') {
    console.log('STATUS: user is not logged in, redirect to login');
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
  await store.commit('init');
  await keycloak.configure();
  const app = createApp(App);

  app.use(BootstrapVue3);
  app.use(Toast);
  app.use(store).use(router).mount('#app');
}

main();

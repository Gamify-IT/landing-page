import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import router from '@/router/index';
import LoginView from '@/views/LoginView.vue';
import BootstrapVue3, { BButton } from 'bootstrap-vue-3';
import mockAxios from '@/__mocks__/axios';

describe('LoginView.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    router.push('/');
    await router.isReady();
    // wrapper = mount(LoginView, {
    //   global: {
    //     plugins: [BootstrapVue3, router],
    //   },
    // });
    expect(router.currentRoute.value.fullPath).toBe('/');
  });
  test('Login Button', async () => {
    // const loginButton = wrapper.findComponent(BButton);
    // expect(loginButton.text().includes('login'));
  });
});

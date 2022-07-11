import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import config from '@/config';
import mockAxios from 'jest-mock-axios';
import router from '@/router/index';
import LoginView from '@/views/LoginView.vue';
import BootstrapVue3, { BButton } from 'bootstrap-vue-3';
import { login } from '@/types';
import { hasToken } from '@/ts/login-rest-client';

jest.mock('axios');

describe('LoginView.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    router.push('/login');
    await router.isReady();
    wrapper = mount(LoginView, {
      global: {
        plugins: [BootstrapVue3, router],
      },
    });
  });
  test('Submit login', async () => {
    const response = { data: { id: 1, name: 'Username' } };
    mockAxios.post.mockResolvedValueOnce(response);

    const login: login = { username: 'Username', password: 'Password' };

    expect(router.currentRoute.value.fullPath).toBe('/login');

    const submitButton = wrapper.findComponent(BButton);
    const inputName = wrapper.find('#username-input');
    const inputPassword = wrapper.find('#password-input');
    expect(submitButton.text()).toBe('Login');
    expect(inputName.exists()).toBe(true);
    expect(inputPassword.exists()).toBe(true);

    expect(hasToken()).toBe(false);

    inputName.setValue(login.username);
    inputPassword.setValue(login.password);

    submitButton.trigger('click');

    await flushPromises();

    expect(mockAxios.post).toHaveBeenCalledWith(`${config.apiBaseUrl}/login`, login);
    expect(hasToken()).toBe(true);

    expect(router.currentRoute.value.fullPath).toBe('/app');
  });
});

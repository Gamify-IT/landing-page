import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import config from '@/config';
import mockAxios from 'jest-mock-axios';
import router from '@/router/index';
import RegisterView from '@/views/RegisterView.vue';
import BootstrapVue3, { BButton } from 'bootstrap-vue-3';
import type { Register } from '@/types';
import { hasToken } from '@/ts/login-rest-client';

jest.mock('axios');

describe('RegisterView.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    router.push('/register');
    await router.isReady();
    wrapper = mount(RegisterView, {
      global: {
        plugins: [BootstrapVue3, router],
      },
    });
  });
  test('Submit register', async () => {
    const response = { data: { id: 1, name: 'Username' } };
    mockAxios.post.mockResolvedValueOnce(response);

    const register: Register = { username: 'Username', email: 'email@valid.com', password: 'Password' };

    expect(router.currentRoute.value.fullPath).toBe('/register');

    const submitButton = wrapper.findComponent(BButton);
    const inputName = wrapper.find('#username-input');
    const inputPassword = wrapper.find('#password-input');
    const inputEMail = wrapper.find('#email-input');
    expect(submitButton.text()).toBe('Register');
    expect(inputName.exists()).toBe(true);
    expect(inputEMail.exists()).toBe(true);
    expect(inputPassword.exists()).toBe(true);
    expect(hasToken()).toBe(false);

    inputName.setValue(register.username);
    inputEMail.setValue(register.email);
    inputPassword.setValue(register.password);

    submitButton.trigger('click');

    await flushPromises();

    expect(mockAxios.post).toHaveBeenCalledWith(`${config.apiBaseUrl}/register`, register);
    expect(hasToken()).toBe(false);

    // After register the user gets redirected to login page
    expect(router.currentRoute.value.fullPath).toBe('/login');
  });
});

import { VueWrapper } from '@vue/test-utils';
import router from '@/router/index';

describe('LoginView.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    router.push('/');
    await router.isReady();

    expect(router.currentRoute.value.fullPath).toBe('/');
  });
  test('Login Button', async () => {

  });
});

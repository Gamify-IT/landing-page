import { createStore } from 'vuex';
import config from '@/config';

export default createStore({
  state: {
    preferredUsername: '',
    accessToken: '',
    refreshToken: '',
    idToken: '',
  },
  getters: {},
  mutations: {
    init(state) {
      console.log('init vuex');
      state.accessToken = localStorage.getItem(config.auth.localStorageKeys.accessToken) || '';
      state.refreshToken = localStorage.getItem(config.auth.localStorageKeys.refreshToken) || '';
      state.idToken = localStorage.getItem(config.auth.localStorageKeys.idToken) || '';
      state.preferredUsername = localStorage.getItem(config.auth.localStorageKeys.preferredUsername) || '';
    },
    setAccessToken(state, accessToken: { token: string; expiresIn: number }) {
      const d = new Date();
      d.setSeconds(d.getSeconds() + accessToken.expiresIn);
      document.cookie = `${config.auth.cookie.name}=${accessToken.token}; expires=${d.toUTCString()}; ${
        config.auth.cookie.options
      }`;
      localStorage.setItem(config.auth.localStorageKeys.accessToken, accessToken.token);
      state.accessToken = accessToken.token;
    },
    setRefreshToken(state, refreshToken) {
      localStorage.setItem(config.auth.localStorageKeys.refreshToken, refreshToken);
      state.refreshToken = refreshToken;
    },
    setIdToken(state, idToken) {
      localStorage.setItem(config.auth.localStorageKeys.idToken, idToken);
      state.idToken = idToken;
    },
    resetAuth(state) {
      document.cookie = `${config.auth.cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${config.auth.cookie.options}`;
      localStorage.removeItem(config.auth.localStorageKeys.accessToken);
      localStorage.removeItem(config.auth.localStorageKeys.refreshToken);
      localStorage.removeItem(config.auth.localStorageKeys.idToken);
      localStorage.removeItem(config.auth.localStorageKeys.preferredUsername);
      state.accessToken = '';
      state.refreshToken = '';
      state.idToken = '';
      state.preferredUsername = '';
    },
    setPreferredUsername(state, preferredUsername) {
      localStorage.setItem(config.auth.localStorageKeys.preferredUsername, preferredUsername);
      state.preferredUsername = preferredUsername;
    },
  },
  actions: {},
  modules: {},
});

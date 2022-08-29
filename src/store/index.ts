import { createStore } from 'vuex';
import config from '@/config';

const localStorageKeys = {
  preferredUsername: 'username',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  idToken: 'idToken',
  appUrl: 'appUrl',
};

export default createStore({
  state: {
    preferredUsername: '',
    accessToken: '',
    refreshToken: '',
    idToken: '',
    appUrl: '',
  },
  getters: {},
  mutations: {
    init(state) {
      console.log('init vuex');
      state.accessToken = localStorage.getItem(localStorageKeys.accessToken) || '';
      state.refreshToken = localStorage.getItem(localStorageKeys.refreshToken) || '';
      state.idToken = localStorage.getItem(localStorageKeys.idToken) || '';
      state.preferredUsername = localStorage.getItem(localStorageKeys.preferredUsername) || '';
      state.appUrl = localStorage.getItem(localStorageKeys.preferredUsername) || '';
    },
    setAccessToken(state, accessToken: { token: string; expiresIn: number }) {
      const d = new Date();
      d.setSeconds(d.getSeconds() + accessToken.expiresIn);
      document.cookie = `${config.auth.cookie.name}=${accessToken.token}; expires=${d.toUTCString()}; ${
        config.auth.cookie.options
      }`;
      localStorage.setItem(localStorageKeys.accessToken, accessToken.token);
      state.accessToken = accessToken.token;
    },
    setRefreshToken(state, refreshToken) {
      localStorage.setItem(localStorageKeys.refreshToken, refreshToken);
      state.refreshToken = refreshToken;
    },
    setIdToken(state, idToken) {
      localStorage.setItem(localStorageKeys.idToken, idToken);
      state.idToken = idToken;
    },
    resetAuth(state) {
      document.cookie = `${config.auth.cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${config.auth.cookie.options}`;
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);
      localStorage.removeItem(localStorageKeys.idToken);
      localStorage.removeItem(localStorageKeys.preferredUsername);
      state.accessToken = '';
      state.refreshToken = '';
      state.idToken = '';
      state.preferredUsername = '';
    },
    setPreferredUsername(state, preferredUsername) {
      localStorage.setItem(localStorageKeys.preferredUsername, preferredUsername);
      state.preferredUsername = preferredUsername;
    },
    setAppUrl(state, appUrl) {
      localStorage.setItem(localStorageKeys.appUrl, appUrl);
      state.appUrl = appUrl;
    },
    resetAppUrl(state) {
      const appUrl = '';
      localStorage.setItem(localStorageKeys.appUrl, appUrl);
      state.appUrl = appUrl;
    },
  },
  actions: {},
  modules: {},
});

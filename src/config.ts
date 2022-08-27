export default {
  // URL of the RESTful API
  apiBaseUrl: '/login/api/v1',

  auth: {
    cookieName: 'token',
    localStorageKeys: {
      preferredUsername: 'username',
      accessToken: 'token',
      refreshToken: 'refreshToken',
      idToken: 'idToken',
    },
    keycloak: {
      baseUri: 'http://localhost/keycloak',
      realm: 'Gamify-IT',
      clientId: 'game',
    },
  },
};

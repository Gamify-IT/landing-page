export default {
  auth: {
    /**
     * The token is renewed renewSecondsBeforeTimeout before the access token expires.
     */
    renewSecondsBeforeTimeout: 10,
    /**
     * Settings for the cookie containing the access token.
     */
    cookie: {
      /**
       * Name of the cookie that stores the authentication token.
       */
      name: 'token',
      /**
       * Options for the cookie.
       */
      options: 'SameSite=strict; path=/',
    },
    /**
     * Keys for the local storage.
     */
    localStorageKeys: {
      preferredUsername: 'username',
      accessToken: 'token',
      refreshToken: 'refreshToken',
      idToken: 'idToken',
    },
    /**
     * Keycloak configuration.
     */
    keycloak: {
      /**
       * URI to fetch the openid-connect configuration.
       */
      configurationURL: 'http://localhost/keycloak/realms/Gamify-IT/.well-known/openid-configuration',
      /**
       * The Keycloak client id.
       */
      clientId: 'game',
    },
  },
};

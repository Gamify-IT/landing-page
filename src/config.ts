export default {
  auth: {
    /**
     * The routes that can only be viewed by authenticated users.
     * The list contains names of routes from router/index.ts.
     */
    protectedRoutes: ['Start', 'App'],
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
      name: 'access_token',
      /**
       * Options for the cookie.
       */
      options: 'SameSite=strict; path=/',
    },
    /**
     * Keycloak configuration.
     */
    keycloak: {
      /**
       * URI to fetch the openid-connect configuration.
       */
      configurationURL: '/keycloak/realms/Gamify-IT/.well-known/openid-configuration',
      /**
       * The Keycloak client id.
       */
      clientId: 'game',
    },
  },
  overworldBackendBaseUrl: '/overworld/api/v1',
  overworldBaseUrl: '/overworld/',
  lecturerInterfaceBaseUrl: '/lecturer-interface/',
};

import axios from 'axios';

import config from '@/config';
import type { TokenResponse, UserResponse } from '@/types/';
import { keycloakConfiguration } from '@/ts/keycloak-configuration';

/**
 * Client for the Keycloak REST API.
 */
class Keycloak {
  /**
   * The URI for the login with configuration parameters
   * @Throws Error if the configuration is not yet loaded.
   */
  get loginUri() {
    const encodedReturnUri = encodeURIComponent(this.returnUri);

    return `${keycloakConfiguration.openIDConfig.authorization_endpoint}?client_id=${config.auth.keycloak.clientId}&redirect_uri=${encodedReturnUri}&response_type=code&scope=openid`;
  }

  /**
   * The return URI for the Keycloak authentication.
   */
  private get returnUri() {
    return window.location.href.split('?')[0];
  }

  /**
   * Fetch the user information.
   * @param token The access token.
   */
  async fetchUser(token: string): Promise<UserResponse> {
    return (
      await axios.get(keycloakConfiguration.openIDConfig.userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  /**
   * Fetch the access token using an authorization code from Keycloak.
   * @param code The authorization code provided by Keycloak.
   */
  async completeAuthentication(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', config.auth.keycloak.clientId);
    params.append('redirect_uri', this.returnUri);

    return (await axios.post(keycloakConfiguration.openIDConfig.token_endpoint, params)).data;
  }

  /**
   * Fetch the access token using a refresh token.
   * @param refreshToken The refresh token.
   */
  async renewAuthentication(refreshToken: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.auth.keycloak.clientId);

    return (await axios.post(keycloakConfiguration.openIDConfig.token_endpoint, params)).data;
  }

  async logout(refreshToken: string) {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.auth.keycloak.clientId);
    const response = await axios.post(keycloakConfiguration.openIDConfig.end_session_endpoint, params);
    if (response.status < 200 || response.status > 206) {
      throw new Error('Error in logout, status code ' + response.status);
    }
  }
}

/**
 * The Keycloak client singleton.
 */
export const keycloak = new Keycloak();

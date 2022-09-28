import axios from 'axios';

import config from '@/config';
import type { OpenIDConfiguration, TokenResponse, UserResponse } from '@/types/';
import { ref } from 'vue';

/**
 * Client for the Keycloak REST API.
 */
class Keycloak {
  /**
   * The OpenID configuration for our login.
   * DO NOT ACCESS DIRECTLY! Use the {@link openIDConfig} getter.
   * @private
   */
  private _openIdConfig: OpenIDConfiguration | null = null;

  /**
   * Check if the configuration for the login is loaded.
   * @private
   */
  private _isLoading = ref<boolean>(false);

  get isLoading() {
    return this._isLoading;
  }

  /**
   * Check if the configuration for the login is loaded.
   * @private
   */
  private _isConfigured = ref<boolean>(false);

  /**
   * Check if the client is loaded.
   */
  get isConfigured() {
    return this._isConfigured;
  }

  /**
   * Getter for safe access to the OpenID configuration.
   * @throws Error if the configuration is not yet loaded.
   */
  get openIDConfig(): OpenIDConfiguration {
    if (!this._openIdConfig) {
      throw new Error('OpenID configuration not configured');
    }
    return this._openIdConfig;
  }

  /**
   * The URI for the login with configuration parameters
   * @Throws Error if the configuration is not yet loaded.
   */
  get loginUri() {
    const encodedReturnUri = encodeURIComponent(this.returnUri);

    return `${this.openIDConfig.authorization_endpoint}?client_id=${config.auth.keycloak.clientId}&redirect_uri=${encodedReturnUri}&response_type=code&scope=openid`;
  }

  /**
   * The return URI for the Keycloak authentication.
   */
  private get returnUri() {
    return window.location.href.split('?')[0];
  }

  /**
   * Fetch the OpenID configuration.
   * @throws Error if the configuration could not be fetched.
   */
  configure() {
    this._loadOpenIDConfiguration();
  }

  /**
   * Fetch the OpenID configuration.
   * @private
   */
  async _loadOpenIDConfiguration(): Promise<void> {
    this._isLoading.value = true;
    try {
      this._openIdConfig = (await axios.get(config.auth.keycloak.configurationURL)).data;
      this._isConfigured.value = true;
    } catch (e) {
      console.error('Could not fetch OpenID configuration', e);
    }
    this._isLoading.value = false;
  }

  /**
   * Fetch the user information.
   * @param token The access token.
   */
  async fetchUser(token: string): Promise<UserResponse> {
    return (
      await axios.get(this.openIDConfig.userinfo_endpoint, {
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

    return (await axios.post(this.openIDConfig.token_endpoint, params)).data;
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

    return (await axios.post(this.openIDConfig.token_endpoint, params)).data;
  }

  async logout(refreshToken: string) {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.auth.keycloak.clientId);
    const response = await axios.post(this.openIDConfig.end_session_endpoint, params);
    if (response.status < 200 || response.status > 206) {
      throw 'Error in logout, status code ' + response.status;
    }
  }
}

/**
 * The Keycloak client.
 */
export const keycloak = new Keycloak();

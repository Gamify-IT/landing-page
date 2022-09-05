import { TokenResponse } from '@/types';
import store from '@/store';
import { keycloak } from '@/ts/keycloak-rest-client';
import config from '@/config';
import router from '@/router';

/**
 * Authenticates the user with Keycloak.
 */
class Auth {
  /**
   * Timeout for automatic token renewal.
   */
  private timeout: NodeJS.Timeout | null = null;

  /**
   * Apply the authentication result to the store and start automatic token renewal.
   * @param result The authentication result.
   * @private
   */
  private applyAuthenticationResult(result: TokenResponse) {
    store.commit('setAccessToken', { token: result.access_token, expiresIn: result.expires_in });
    store.commit('setRefreshToken', result.refresh_token);
    store.commit('setIdToken', result.id_token);

    const timoutSeconds = result.expires_in - config.auth.renewSecondsBeforeTimeout;
    this.startAutoRenew(timoutSeconds);
  }

  /**
   * Start automatic token renewal.
   * @param renewInSeconds The time in seconds until the token should be renewed.
   * @private
   */
  private startAutoRenew(renewInSeconds: number) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => this.tryRenewAccessToken(), renewInSeconds * 1000);
  }

  /**
   * Try to fetch the user information using the access token.
   * Returns true if the user is authenticated.
   */
  async tryUpdateUserInfo(): Promise<boolean> {
    const token = store.state.accessToken;

    if (!token) {
      return false;
    }

    try {
      const userResult = await keycloak.fetchUser(store.state.accessToken);
      store.commit('setPreferredUsername', userResult.preferred_username);
      store.commit('setUserId', userResult.sub);
      console.log('user authenticated:', userResult);
      return true;
    } catch (e) {
      console.log('could not fetch user info', e);
    }
    return false;
  }

  /**
   * Try to renew the access token.
   */
  async tryRenewAccessToken() {
    if (store.state.refreshToken) {
      try {
        const result = await keycloak.renewAuthentication(store.state.refreshToken);
        this.applyAuthenticationResult(result);
        console.log('access token renewed');
      } catch (e) {
        console.log('could not renew authentication -> resetting outdated auth data', e);
        store.commit('resetAuth');
      }
    }
  }

  /**
   * Try to fetch the new access token.
   * @param code The authorization code provided by Keycloak.
   */
  async tryGetAccessTokenWithCode(code: string | null) {
    if (!store.state.accessToken && code) {
      try {
        const result = await keycloak.completeAuthentication(code);
        this.applyAuthenticationResult(result);
        console.log('new access token received');
      } catch (e) {
        console.log('user not authenticated', e);
      }
    }
  }

  async testLogin() {
    const result = await this.tryUpdateUserInfo();
    if (!result) {
      router.push({ name: 'Login' });
    }
  }
}

/**
 * The singleton instance of the authentication class.
 */
export const auth = new Auth();

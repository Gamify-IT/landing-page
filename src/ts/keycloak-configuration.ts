import { OpenIDConfiguration } from '@/types';
import { ref } from 'vue';
import axios from 'axios';
import config from '@/config';

/**
 * The Keycloak configuration.
 * Before using the configuration, the configuration must be loaded.
 */
class KeycloakConfiguration {
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
  private _isLoading = ref<boolean>(true);

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
   * Promise that resolves when the configuration is complete.
   */
  get configurationComplete() {
    return this._configurationCompletePromise;
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
   * Fetch the OpenID configuration.
   * @throws Error if the configuration could not be fetched.
   */
  startConfiguration() {
    this._loadOpenIDConfiguration();
  }

  /**
   * Fetch the OpenID configuration.
   * @private
   */
  private async _loadOpenIDConfiguration(): Promise<void> {
    this._isLoading.value = true;
    try {
      this._openIdConfig = (await axios.get(config.auth.keycloak.configurationURL)).data;
      this._isConfigured.value = true;
    } catch (e) {
      console.error('Could not fetch OpenID configuration', e);
    }
    this._isLoading.value = false;
    this._configurationCompletePromiseResolve();
  }

  private _configurationCompletePromiseResolve: () => void = () => null;

  /**
   * Promise for waiting until the configuration is loaded.
   * @private
   */
  private _configurationCompletePromise = new Promise<void>((resolve) => {
    this._configurationCompletePromiseResolve = resolve as () => void;
  });
}

/**
 * The Keycloak configuration singleton.
 */
export const keycloakConfiguration = new KeycloakConfiguration();

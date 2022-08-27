import axios from 'axios';

import config from '@/config';
import type { TokenResponse, UserResponse } from '@/types/';

class Keycloak {
  public get returnUri() {
    return window.location.href.split('?')[0];
  }

  public get userUri() {
    return `${config.auth.keycloak.baseUri}/realms/${config.auth.keycloak.realm}/protocol/openid-connect/userinfo`;
  }

  public get loginUri() {
    const encodedReturnUri = encodeURIComponent(this.returnUri);

    return `${config.auth.keycloak.baseUri}/realms/${config.auth.keycloak.realm}/protocol/openid-connect/auth?client_id=${config.auth.keycloak.clientId}&redirect_uri=${encodedReturnUri}&response_type=code&scope=openid`;
  }

  public get tokenUri() {
    return `${config.auth.keycloak.baseUri}/realms/${config.auth.keycloak.realm}/protocol/openid-connect/token`;
  }

  public async fetchUser(token: string): Promise<UserResponse> {
    return (
      await axios.get(this.userUri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  public async completeAuthentication(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', config.auth.keycloak.clientId);
    params.append('redirect_uri', this.returnUri);

    return (await axios.post(this.tokenUri, params)).data;
  }

  public async renewAuthentication(refreshToken: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.auth.keycloak.clientId);

    return (await axios.post(this.tokenUri, params)).data;
  }
}

export const keycloak = new Keycloak();

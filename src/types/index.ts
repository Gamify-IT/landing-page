export interface TokenRequest {
  grant_type: string;
  code: string;
  client_id: string;
  redirect_uri: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface UserResponse {
  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
}

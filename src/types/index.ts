/**
 * Response from the Keycloak server when fetching the openid-connect configuration.
 */
export interface OpenIDConfiguration {
  /**
   * Base URL of the realm.
   */
  issuer: string;
  /**
   * Endpoint serving the login form.
   */
  authorization_endpoint: string;
  /**
   * Endpoint to request a new access token.
   */
  token_endpoint: string;
  /**
   * Endpoint to request user information.
   */
  userinfo_endpoint: string;
  /**
   * Endpoint to log out.
   */
  end_session_endpoint: string;
  /**
   * Endpoint for user registration.
   */
  registration_endpoint: string;
}

/**
 * Response from the Keycloak server when requesting an access token.
 */
export interface TokenResponse {
  /**
   * Access token.
   */
  access_token: string;
  /**
   * Time in seconds until the access token expires.
   */
  expires_in: number;
  /**
   * Time in seconds until the refresh token expires.
   */
  refresh_expires_in: number;
  /**
   * Refresh token.
   */
  refresh_token: string;
  /**
   * Type of the token (e.g. Bearer).
   */
  token_type: string;
  /**
   * ID token.
   */
  id_token: string;
  'not-before-policy': number;
  /**
   * Session state for CSRF protection.
   */
  session_state: string;
  /**
   * Scope of the access token.
   */
  scope: string;
}

/**
 * Response from the Keycloak server when requesting a user information.
 */
export interface UserResponse {
  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  realm_access: {
    roles: string[];
  };
}

/**
 * Colors to style buttons in bootstrap colors
 */
export enum Color {
  PRIMARY = 'bg-primary',
  SECONDARY = 'bg-secondary',
  SUCCESS = 'bg-success',
  INFO = 'bg-info',
  WARNING = 'bg-warning',
  LIGHT = 'bg-light',
}

/**
 * Representation Information for the Button
 */
export type ButtonElement = {
  title: string;
  subtitle: string;
  description: string;
  color: Color;
};

/**
 * Represesntation of a Course from the Overworld Backend
 */
export interface Course {
  id: number;
  courseName: string;
  semester: string;
  description: string;
  active: boolean;
}

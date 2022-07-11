import config from '@/config';
import axios from 'axios';

import type { login, register } from '@/types/';

export const loginUser = async function (login: login) {
  return axios.post(`${config.apiBaseUrl}/login`, login);
};

export const registerUser = async function (register: register) {
  return axios.post(`${config.apiBaseUrl}/register`, register);
};

export const hasToken = function () {
  return localStorage.getItem('loginName') != null;
};

export const setLoginName = function (name: string) {
  localStorage.setItem('loginName', name);
};

export function isValidUsername(username: string) {
  return username.length >= 3;
}

export function isValidEMail(email: string) {
  return email.includes('@');
}

export function isValidPassword(password: string) {
  return password.length >= 5;
}

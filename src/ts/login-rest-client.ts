import axios from 'axios';

import config from '@/config';
import type { Login, Register } from '@/types/';

class Authentication {
  public isLoggedIn = false;

  public async registerUser(register: Register) {
    return axios.post(`${config.apiBaseUrl}/register`, register);
  }

  public async loginUser(login: Login) {
    const result = await axios.post(`${config.apiBaseUrl}/login`, login);
    await this.checkLoginStatusAndRenewToken();
    return result;
  }

  public async checkLoginStatusAndRenewToken() {
    try {
      await axios.post(`${config.apiBaseUrl}/authenticate`);
      this.isLoggedIn = true;
    } catch (_) {
      this.isLoggedIn = false;
    }
  }

  public setLoginName(name: string) {
    localStorage.setItem('loginName', name);
  }

  public isValidUsername(username: string): boolean {
    return username.length >= 3;
  }

  public isValidEMail(email: string): boolean {
    return email.includes('@');
  }

  public isValidPassword(password: string) {
    return password.length >= 4;
  }
}

export const auth = new Authentication();

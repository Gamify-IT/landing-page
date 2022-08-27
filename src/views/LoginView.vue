<script setup lang="ts">
import { ref } from 'vue';

import { keycloak } from '@/ts/keycloak-rest-client';
import store from '@/store';
import { TokenResponse } from '@/types';

const queryParams = ref({} as { [key: string]: string });

function parseQueryParams() {
  // parse query parameters
  const props = window.location.search
    .slice(1)
    .split('&')
    .map((e) => e.split('='));
  const paramMap: { [key: string]: string } = {};

  for (const prop of props) {
    paramMap[prop[0]] = prop[1];
  }

  queryParams.value = paramMap;
}

function applyAuthenticationResult(result: TokenResponse) {
  store.commit('setAccessToken', { token: result.access_token, expiresIn: result.expires_in });
  store.commit('setRefreshToken', result.refresh_token);
  store.commit('setIdToken', result.id_token);
}

async function tryUpdateUserInfo() {
  if (store.state.accessToken) {
    const userResult = await keycloak.fetchUser(store.state.accessToken);
    if (userResult) {
      store.commit('setPreferredUsername', userResult.preferred_username);
      console.log('user authenticated:', userResult);
    }
  }
}

async function tryRenewAccessToken() {
  if (store.state.refreshToken) {
    try {
      const result = await keycloak.renewAuthentication(store.state.refreshToken);
      applyAuthenticationResult(result);
      console.log('access token renewed');
    } catch (e) {
      console.log('could not renew authentication -> resetting outdated auth data', e);
      store.commit('resetAuth');
    }
  }
}

async function tryGetAccessTokenWithCode() {
  if (!store.state.accessToken && queryParams.value.code) {
    try {
      const result = await keycloak.completeAuthentication(queryParams.value.code);
      applyAuthenticationResult(result);
      console.log('new access token received');
    } catch (e) {
      console.log('user not authenticated', e);
    }
  }
}

async function init() {
  parseQueryParams();
  await tryRenewAccessToken();
  await tryGetAccessTokenWithCode();
  await tryUpdateUserInfo();
}

init();
</script>

<template>
  <b-container class="mt-5">
    <b-row class="d-flex justify-content-center">
      <b-col md="6">
        <b-card class="px-5 py-5" id="form">
          <div v-if="store.state.accessToken">
            <h1>Login successful</h1>
            <div>Welcome user "{{ store.state.preferredUsername }}"</div>
          </div>
          <div v-else>
            <h1>Authentication required</h1>
            <div>You need to log in to view this page.</div>
            <a :href="keycloak.loginUri"><b-button type="submit" variant="dark" class="w-100">Go to login</b-button></a>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="css">
.forms-inputs span {
  position: absolute;
  top: -18px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;
}
.forms-inputs input {
  height: 50px;
  border: 2px solid #eee;
}
.forms-inputs input:focus {
  box-shadow: none;
  outline: none;
  border: 2px solid #000;
}
</style>

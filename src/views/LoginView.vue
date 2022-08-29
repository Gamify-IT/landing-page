<script setup lang="ts">
import { keycloak } from '@/ts/keycloak-rest-client';
import store from '@/store';
import { QueryParams } from '@/ts/query';
import { auth } from '@/ts/auth';
import router from '@/router';

async function redirectIfUserIsSignedIn() {
  await auth.tryGetAccessTokenWithCode(QueryParams.get('code'));
  const isLoggedIn = await auth.tryUpdateUserInfo();

  if (isLoggedIn) {
    await router.push({ name: 'App' });
  }
}

redirectIfUserIsSignedIn();
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

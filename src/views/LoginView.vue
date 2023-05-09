<script lang="ts" setup>
import { keycloak } from '@/ts/keycloak-rest-client';
import store from '@/store';
import { QueryParams } from '@/ts/query';
import { auth } from '@/ts/auth';
import router from '@/router';
import { keycloakConfiguration } from '@/ts/keycloak-configuration';

const keycloakIsConfigured = keycloakConfiguration.isConfigured;

async function redirectIfUserIsSignedIn() {
  await auth.tryGetAccessTokenWithCode(QueryParams.get('code'));
  const isLoggedIn = await auth.tryUpdateUserInfo();

  if (isLoggedIn) {
    await router.push({ name: 'Start' });
  }
}

redirectIfUserIsSignedIn();
</script>

<template>
  <b-container class="mt-5">
    <b-row class="d-flex justify-content-center">
      <b-col md="6">
        <b-card id="form" class="px-5 py-5">
          <div v-if="store.state.accessToken">
            <h1>Login successful</h1>
            <div>Welcome user "{{ store.state.preferredUsername }}"</div>
          </div>
          <div v-else-if="keycloakIsConfigured">
            <h1>Authentication required</h1>
            <div>You need to log in to view this page.</div>
            <a :href="keycloak.loginUri">
              <b-button class="w-100" type="submit" variant="dark">Go to login</b-button>
            </a>
          </div>
          <div v-else>
            <h1>Authentication failed</h1>
            <div>Please check your internet connection or try again later.</div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  <div class="text-center">
    <a class="text-body" href="/third-party-license-notice/">Third Party Licenses</a>
    <br />
    <a class="text-body" href="/privacy-policy/">Privacy policy</a>
  </div>
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

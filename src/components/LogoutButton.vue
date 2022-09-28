<script lang="ts" setup>
import store from '@/store';
import { keycloak } from '@/ts/keycloak-rest-client';
import router from '@/router';

async function logout() {
  await keycloak.logout(store.state.refreshToken);
  await router.push({ name: 'Login' });
}
</script>

<template>
  <div id="button-box">
    <b-button variant="danger" @click="logout()">Logout {{ store.state.preferredUsername }}</b-button>
  </div>
</template>

<style scoped>
#button-box {
  margin-right: 0;
  margin-left: auto;
  width: fit-content;
  height: fit-content;
}
</style>

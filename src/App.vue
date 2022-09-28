<script lang="ts" setup>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { keycloakConfiguration } from '@/ts/keycloak-configuration';

const isLoading = keycloakConfiguration.isLoading;
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-center-box">
      <LoadingSpinner />
    </div>
  </div>
  <router-view v-else />
</template>

<style lang="css" scoped>
.loading-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.loading-center-box {
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>

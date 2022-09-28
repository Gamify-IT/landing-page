<script lang="ts" setup>
import { keycloak } from '@/ts/keycloak-rest-client';

const isLoading = keycloak.isLoading;

keycloak.configure();
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-center-box">
      <h1 class="loading-header">Loading</h1>
      <div class="loading-spinner"></div>
    </div>
  </div>
  <router-view v-else />
</template>

<style lang="css">
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

.loading-header {
  text-align: center;
  margin: 0 auto 20px auto;
  color: #444;
}

.loading-spinner {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.loading-spinner:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #aaa;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: loading-spinner 1.2s linear infinite;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

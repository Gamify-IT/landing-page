<script setup lang="ts">
import router from '@/router';
import { loadIframe } from '@/ts/iframeLoader';
import { onMounted, ref } from 'vue';
import store from '@/store';
import { auth } from '@/ts/auth';

auth.testLogin();

const started = ref(false);

async function startApp() {
  const url = store.state.appUrl;
  if (url == undefined || url == '') {
    await router.push({ name: 'Start' });
  } else {
    loadIframe(url);
    started.value = true;
  }
}

onMounted(async () => {
  await startApp();
});
</script>

<template>
  <div>
    <b-button v-if="started === false" class="btn-primary" v-on:click="startApp()"> Start </b-button>
    <div id="iframe-wrapper"></div>
  </div>
</template>

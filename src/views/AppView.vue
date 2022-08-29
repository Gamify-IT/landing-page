<script setup lang="ts">
import '@/load-app-script.js';
import { onMounted, ref } from 'vue';
import store from '@/store';

const started = ref(false);

function startGame() {
  started.value = true;
  // window.microServices.loadService('overworld/');
  console.log('Started microservice');
}

onMounted(() => {
  startGame();
});
</script>

<template>
  <div>
    <h1>Welcome to the game, "{{ store.state.preferredUsername }}"</h1>

    <div id="micro-service-wrapper"></div>
  </div>
</template>

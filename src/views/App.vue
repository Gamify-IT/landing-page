<template>
  <div>
    <b-button v-if="started === false" class="btn-primary" v-on:click="startGame"> Start </b-button>

    <div id="micro-service-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import '@/load-app-script.js';
import { onMounted, ref } from 'vue';

const started = ref(false);

function startGame() {
  started.value = true;
  window.microServices.loadService('overworld/');
  console.log('Started microservice');
}

onMounted(() => {
  startGame();
});
</script>

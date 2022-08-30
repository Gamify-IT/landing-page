<script setup lang="ts">
import { ButtonElement } from '@/types/index';
defineProps<{
  buttonElement: ButtonElement;
}>();
</script>

<template>
  <div id="button-box" :class="buttonElement.color">
    <div class="text-center position-relative top-50 start-50 translate-middle" :title="buttonElement.description">
      <h4>{{ buttonElement.title }}</h4>
      <div>{{ buttonElement.subtitle }}</div>
    </div>
  </div>
</template>

<style scoped>
#button-box {
  border-radius: 20px;
  border-style: solid;
  width: 300px;
  height: 200px;
  margin: 5px;
}

#button-box:hover div :first-child {
  text-decoration: underline;
}
</style>

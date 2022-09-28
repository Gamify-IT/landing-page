<script lang="ts" setup>
defineProps<{
  color: string;
  description: string;
}>();
</script>

<template>
  <div id="button-box" :class="color">
    <div :title="description" class="text-center position-relative top-50 start-50 translate-middle">
      <h4>
        <slot name="title" />
      </h4>
      <div>
        <slot name="subtitle" />
      </div>
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

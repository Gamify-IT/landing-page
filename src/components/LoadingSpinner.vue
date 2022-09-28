<template>
  <div class="loading-spinner"></div>
</template>

<style lang="css" scoped>
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

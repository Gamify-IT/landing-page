<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
  
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#login-form {
  z-index: -100;
}

#micro-service-wrapper {
  z-index: 100;
}
</style>

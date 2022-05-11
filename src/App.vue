<template>
  <div id="app">
    <!-- <div class="main">
      <router-view></router-view>
    </div> -->
    <form
      novalidate
      id="login-form"
      class="md-layout"
      :style="!gameStarted ? '' : 'display: none'"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100" style="display: flex">
              <md-field>
                <label>Login name</label>
                <md-input v-model="loginName"></md-input>
              </md-field>
              <md-button
                class="md-raised md-primary"
                v-on:click="buttonPressed"
              >
                LOGIN
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>

    <!-- <UnityScene ref="unityScene"></UnityScene> -->
    <div id="micro-service-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      gameStarted: false,
      loginName: "",
    };
  },
  methods: {
    buttonPressed() {
      window.localStorage.loginName = this.loginName;
      this.startGame();
    },
    startGame() {
      window.microServices.loadService("http://localhost:1234");
      window.postMessage(JSON.stringify({ loginName: this.loginName }));
      this.gameStarted = true;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

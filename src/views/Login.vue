<template>
    <form novalidate class="md-layout">
      
            <md-card class="md-layout-item md-size-50 md-small-size-100 center-span">
                <md-card-header>
                <div class="md-title">Login</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100" style="display: flex">
                        <md-field>
                            <label>Username</label>
                            <md-input v-model="login.username"></md-input>
                        </md-field>
                        <md-field>
                            <label>Password</label>
                            <md-input type="password" v-model="login.password"></md-input>
                        </md-field>
                        <md-button
                            class="md-raised md-primary"
                            v-on:click="submitLogin"
                        >
                            LOGIN
                        </md-button>
                        </div>
                    </div>
                    <div>
                        Dont Have an Account? Create one <router-link to="/register">HERE</router-link>
                    </div>
                </md-card-content>
            </md-card>
        
    </form>
</template>

<script>
import {loginUser, setToken} from "@/js/login-rest-client.js"
export default {
  name: "LoginPage",
  data() {
    return {
      login: {
          username: "",
          password: ""
      },
    };
  },
  methods: {
    submitLogin() {
        setToken("Logged in")
        this.$router.push("/app")
        localStorage.setItem("loginName", this.login.username)
        loginUser(this.login).then(() => {
            console.log("RESPONSE")
        })
    }
  },
  created: function() {
  }
};
</script>

<style lang="scss">
.center-span {
    text-align: center;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
}
</style>

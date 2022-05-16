<template>
    <form novalidate class="md-layout" @submit.prevent>
      
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
                            type="submit"
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
        loginUser(this.login).then((response) => {
            var token = response.data.token
            var name = response.data.name
            this.$toast.success({
                title: "Successfully logged in", 
                message: "You get rediricted to the game app. Have fun!",
                position: "top-right",
                hideDuration: 10000,
                timeout: 11000
            })
            setToken(token)
            localStorage.setItem("loginName", name)
            this.$router.push({name: "App"})
        }).catch(error => {
            if (error.response) {
                if (error.response.status == 400) {
                    this.$toast.error({
                        title: "Wrong credentials", 
                        message: "Username or password is wrong",
                        position: "top-right",
                        hideDuration: 10000,
                        timeout: 11000
                    })
                } else if (error.response.status == 500) {
                    var message = error.response.data.message
                    this.$toast.error({
                        title: "Server error", 
                        message: message,
                        position: "top-right",
                        hideDuration: 10000,
                        timeout: 11000
                    })
                }
            }
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

<template>
    <form novalidate class="md-layout">
      
            <md-card class="md-layout-item md-size-50 md-small-size-100 center-span">
                <md-card-header>
                    <div class="md-title">Register</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100" style="display: flex">
                        <md-field>
                            <label>Username</label>
                            <md-input v-model="register.username"></md-input>
                        </md-field>
                        <md-field>
                            <label>E-Mail</label>
                            <md-input v-model="register.email"></md-input>
                        </md-field>
                        <md-field>
                            <label>Password</label>
                            <md-input type="password" v-model="register.password"></md-input>
                        </md-field>
                        <md-button
                            class="md-raised md-primary"
                            v-on:click="submitRegister"
                        >
                            REGISTER
                        </md-button>
                        </div>
                    </div>
                <div>
                    Already have an Account? Login <router-link to="/login">HERE</router-link>
                </div>
                </md-card-content>
            </md-card>
        
    </form>
</template>

<script>
import {registerUser} from "@/js/login-rest-client.js"
export default {
  name: "RegisterPage",
  data() {
    return {
      register: {
          username: "",
          email: "",
          password: "",
      },
    };
  },
  methods: {
    submitRegister() {
        registerUser(this.register).then(() => {
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

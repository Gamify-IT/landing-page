<template>
    <form novalidate class="md-layout" @submit.prevent>
      
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
                            <md-input type="email" v-model="register.email"></md-input>
                        </md-field>
                        <md-field>
                            <label>Password</label>
                            <md-input type="password" v-model="register.password"></md-input>
                        </md-field>
                        <md-button
                            class="md-raised md-primary"
                            v-on:click="submitRegister"
                            type="submit"
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
            this.$toast.success({
                title: "Successfully registered", 
                message: "Your user account has been successfully registered. You can now log in.",
                position: "top-right",
                hideDuration: 10000,
                timeout: 11000
            })
            this.$router.push("/login")
        }).catch(error => {
            if (error.response) {
                if (error.response.status == 400) {
                    this.$toast.error({
                        title: "Failure on register", 
                        message: error.response.data.message,
                        position: "top-right",
                        hideDuration: 10000,
                        timeout: 11000
                    })
                }
            }
        })
    },
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
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '@/ts/login-rest-client';

import router from '@/router/index';
import { useToast } from 'vue-toastification';

const toast = useToast();

const login = ref({ username: '', password: '' });

async function submitLogin() {
  if (!auth.isValidPassword(login.value.password) || !auth.isValidUsername(login.value.username)) {
    toast.error(`There are invalid inputs.`);
    return;
  }
  await auth
    .loginUser(login.value)
    .then((response) => {
      let name = response.data.name;
      auth.setLoginName(name);
      router.push('/app');
      toast.success(`Have fun!`);
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 400) {
          toast.error(`Username or password is wrong`);
        } else if (error.response.status == 500) {
          let message = error.response.data.message;
          toast.error(`${message}`);
        } else {
          toast.error(`Something went wrong!`);
        }
      }
    });
}
</script>

<template>
  <b-container class="mt-5">
    <b-row class="d-flex justify-content-center">
      <b-col md="6">
        <b-card class="px-5 py-5" id="form">
          <form @submit.prevent>
            <div class="forms-inputs mb-4">
              <span>Username</span>
              <b-form-input
                id="username-input"
                autocomplete="off"
                type="text"
                v-model="login.username"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !auth.isValidUsername(login.username) && login.username.length > 0,
                }"
                v-on:blur="false"
              />
              <div class="invalid-feedback">Username must be at least 3 character!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>Password</span>
              <b-form-input
                id="password-input"
                autocomplete="off"
                type="password"
                v-model="login.password"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !auth.isValidPassword(login.password) && login.password.length > 0,
                }"
                v-on:blur="false"
              />
              <div class="invalid-feedback">Password must be at least 4 character!</div>
            </div>
            <div class="mb-3">
              <b-button @click="submitLogin" type="submit" variant="dark" class="w-100">Login</b-button>
            </div>
          </form>
          <div>Dont Have an Account? Create one <router-link to="/register">HERE</router-link></div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="css">
.forms-inputs {
  position: relative;
}
.forms-inputs span {
  position: absolute;
  top: -18px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;
}
.forms-inputs input {
  height: 50px;
  border: 2px solid #eee;
}
.forms-inputs input:focus {
  box-shadow: none;
  outline: none;
  border: 2px solid #000;
}
.btn {
  height: 50px;
}
.success-data {
  display: flex;
  flex-direction: column;
}
.bxs-badge-check {
  font-size: 90px;
}
</style>

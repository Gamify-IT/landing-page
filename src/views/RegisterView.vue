<script setup lang="ts">
import { registerUser, isValidUsername, isValidPassword, isValidEMail } from '@/ts/login-rest-client';
import { ref } from 'vue';

import router from '@/router/index';
import { useToast } from 'vue-toastification';

const toast = useToast();

const register = ref({ username: '', password: '', email: '' });

async function submitRegister() {
  if (
    !isValidPassword(register.value.password) ||
    !isValidUsername(register.value.username) ||
    !isValidEMail(register.value.email)
  ) {
    toast.error(`There are invalid inputs.`);
    return;
  }
  await registerUser(register.value)
    .then(() => {
      router.push('/login');
      toast.success(`You get rediricted to the login page.`);
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 400) {
          toast.error(`Failure on register: ${error.response.data.message}`);
        } else if (error.response.status == 500) {
          toast.error(`Failure on register: ${error.response.data.message}`);
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
                v-model="register.username"
                v-bind:class="{ 'form-control': true, 'is-invalid': !isValidUsername(register.username) }"
                v-on:blur="false"
              />
              <div class="invalid-feedback">Username must be at least 3 character!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>E-Mail</span>
              <b-form-input
                id="email-input"
                autocomplete="off"
                type="text"
                v-model="register.email"
                v-bind:class="{ 'form-control': true, 'is-invalid': !isValidEMail(register.email) }"
                v-on:blur="false"
              />
              <div class="invalid-feedback">Email must be valid!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>Password</span>
              <b-form-input
                id="password-input"
                autocomplete="off"
                type="text"
                v-model="register.password"
                v-bind:class="{ 'form-control': true, 'is-invalid': !isValidPassword(register.password) }"
                v-on:blur="false"
              />
              <div class="invalid-feedback">Password must be at least 4 character!</div>
            </div>
            <div class="mb-3">
              <b-button @click="submitRegister" type="submit" variant="dark" class="w-100">Register</b-button>
            </div>
            <div>Already have an Account? Login <router-link to="/login">HERE</router-link></div>
          </form>
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
</style>

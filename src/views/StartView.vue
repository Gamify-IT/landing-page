<script lang="ts" setup>
import ButtonBox from '@/components/ButtonBox.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import { ButtonElement, Color, Course } from '@/types';
import { getActiveCourses } from '@/ts/start';
import config from '@/config';
import { ref } from 'vue';
import store from '@/store';
import router from '@/router';
import { auth } from '@/ts/auth';

const courseColor = Color.PRIMARY;
const setupColor = Color.WARNING;

auth.testLogin();

const courses = ref<Course[]>();
getActiveCourses().then((fetchedCourses) => {
  courses.value = fetchedCourses;
});

const lecturerInterface: ButtonElement = {
  title: 'Lecturer Interface',
  subtitle: 'configure your cources',
  description: '',
  color: setupColor,
};

const keycloakAdminInterface: ButtonElement = {
  title: 'User Management',
  subtitle: 'manage users in Keycloak',
  description: '',
  color: setupColor,
};

function courseToButtonElement(course: Course): ButtonElement {
  return {
    title: course.courseName,
    subtitle: course.semester,
    description: course.description,
    color: courseColor,
  };
}

function selectCourse(id: number) {
  const url = config.overworldBaseUrl + id;
  openSite(url);
}

function openSite(url: string) {
  console.log('open ' + url);
  store.commit('setAppUrl', url);
  router.push({ name: 'App' });
}
</script>

<template>
  <div class="w-75 my-3 mx-auto">
    <LogoutButton />
    <h1 class="display-1">Gamify-IT</h1>

    <div>
      <h2>Play</h2>
      <div class="m-2">
        <div class="d-flex flex-wrap justify-content-start">
          <div v-for="course in courses" v-bind:key="course.id">
            <ButtonBox :button-element="courseToButtonElement(course)" @click="selectCourse(course.id)" />
          </div>
          <div v-if="!courses" class="display-6">Loading...</div>
          <div v-else-if="courses.length === 0" class="display-6">Nothing to show :(</div>
        </div>
      </div>
    </div>

    <div v-if="store.state.roles.includes('lecturer')">
      <h2>Setup</h2>
      <div class="m-2">
        <div class="d-flex flex-wrap justify-content-start">
          <ButtonBox :button-element="lecturerInterface" @click="openSite(config.lecturerInterfaceBaseUrl)" />
          <a :href="config.keycloakAdminUrl" class="link-card-wrapper" target="_blank">
            <ButtonBox :button-element="keycloakAdminInterface" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.link-card-wrapper {
  text-decoration: none;
  color: inherit;
}

.link-card-wrapper:hover {
  text-decoration: none;
  color: inherit;
}

.link-card-wrapper:visited {
  text-decoration: none;
  color: inherit;
}
</style>

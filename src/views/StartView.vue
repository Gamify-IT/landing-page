<script lang="ts" setup>
import ButtonBox from '@/components/ButtonBox.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import { ButtonElement, Color, Course } from '@/types';
import config from '@/config';
import { ref } from 'vue';
import store from '@/store';
import router from '@/router';
import { auth } from '@/ts/auth';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getActiveCourses } from '@/ts/start';

const courseColor = Color.PRIMARY;
const setupColor = Color.INFO;
const placeholderColor = Color.LIGHT;
const warningColor = Color.WARNING;

let courseFetchFailed = ref(false);

auth.testLogin();

const courses = ref<Course[]>();
getActiveCourses()
  .then((fetchedCourses) => {
    courses.value = fetchedCourses;
  })
  .catch((error) => {
    console.error('Error while fetching courses: ', error);
    courseFetchFailed.value = true;
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
        <div v-if="courses" class="d-flex flex-wrap justify-content-start">
          <div v-for="course in courses" v-bind:key="course.id">
            <ButtonBox :color="courseColor" :description="course.description" @click="selectCourse(course.id)">
              <template #title>{{ course.courseName }}</template>
              <template #subtitle>{{ course.semester }}</template>
            </ButtonBox>
          </div>
          <div v-if="courses && courses.length === 0" class="display-6">
            <h4>No courses available</h4>
          </div>
        </div>
        <div v-else-if="courseFetchFailed" class="d-flex flex-wrap justify-content-start">
          <div>
            <ButtonBox :color="warningColor" description="Loading">
              <template #title>Unable to contact server</template>
              <template #subtitle>Please try again later</template>
            </ButtonBox>
          </div>
        </div>
        <div v-else class="d-flex flex-wrap justify-content-start">
          <div v-for="i in 3" v-bind:key="i">
            <ButtonBox :color="placeholderColor" description="Loading">
              <template #subtitle>
                <LoadingSpinner />
              </template>
            </ButtonBox>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.state.roles.includes('lecturer')">
      <h2>Setup</h2>
      <div class="m-2">
        <div class="d-flex flex-wrap justify-content-start">
          <ButtonBox
            :color="lecturerInterface.color"
            :description="lecturerInterface.description"
            @click="openSite(config.lecturerInterfaceBaseUrl)"
          >
            <template #title>{{ lecturerInterface.title }}</template>
            <template #subtitle>{{ lecturerInterface.subtitle }}</template>
          </ButtonBox>
          <a :href="config.keycloakAdminUrl" class="link-card-wrapper" target="_blank">
            <ButtonBox :color="keycloakAdminInterface.color" :description="keycloakAdminInterface.description">
              <template #title>{{ keycloakAdminInterface.title }}</template>
              <template #subtitle>{{ keycloakAdminInterface.subtitle }}</template>
            </ButtonBox>
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

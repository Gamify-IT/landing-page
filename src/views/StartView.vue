<script setup lang="ts">
import ButtonBox from '@/components/ButtonBox.vue';
import { Color, Course, ButtonElement } from '@/types/index';
import { getActiveCourses } from '@/ts/start';
import config from '@/config';
import { ref } from 'vue';
import store from '@/store';
import router from '@/router';

const courseColor = Color.PRIMARY;
const setupColor = Color.WARNING;

var courses = ref<Course[]>();
getActiveCourses().then((fetchedCourses) => {
  courses.value = fetchedCourses;
});

const lecturerInterface: ButtonElement = {
  title: 'Lecturer Interface',
  subtitle: 'configure your cources',
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
  const url = config.overworldBaseUrl + '#' + id;
  openSite(url);
}

function openSite(url: string) {
  console.log('open ' + url);
  store.commit('setAppUrl', url);
  router.push({ name: 'App' });
}
</script>

<template>
  <div class="w-75 m-auto">
    <h1 class="display-1">Gamify-IT</h1>

    <h2>Play</h2>
    <div class="m-2">
      <div class="d-flex flex-wrap justify-content-start">
        <div v-for="course in courses" v-bind:key="course.id">
          <ButtonBox :button-element="courseToButtonElement(course)" @click="selectCourse(course.id)" />
        </div>
        <div v-if="courses == undefined" class="display-6">Loading...</div>
        <div v-else-if="courses.length == 0" class="display-6">Nothing to show :(</div>
      </div>
    </div>

    <h2>Setup</h2>
    <div class="m-2">
      <div class="d-flex flex-wrap justify-content-start">
        <ButtonBox :button-element="lecturerInterface" @click="openSite(config.lecturerInterfaceBaseUrl)" />
      </div>
    </div>
  </div>
</template>

import axios, { AxiosError, AxiosResponse } from 'axios';

import config from '@/config';
import type { Course } from '@/types/index';
import store from '@/store';

/**
 * Fetch the active courses from overworld backend.
 */
export async function getActiveCourses(): Promise<Course[]> {
  const endpoint = config.overworldBackendBaseUrl + '/courses';
  const response: AxiosResponse<Course[]> = await axios.get(endpoint);
  return new Promise((resolve) => {
    const courses = response.data.filter((course) => {
      return course.active;
    });
    resolve(courses);
  });
}

export async function createPlayerIfNotExists() {
  const getEndpoint = config.overworldBackendBaseUrl + '/players/' + store.state.userId;
  return axios.get(getEndpoint).catch((error: AxiosError) => {
    if (error.response?.status == 404) {
      const createEndpoint = config.overworldBackendBaseUrl + '/players';
      const userData = {
        userId: store.state.userId,
        username: store.state.preferredUsername,
      };
      return axios.post(createEndpoint, userData);
    } else {
      throw error;
    }
  });
}

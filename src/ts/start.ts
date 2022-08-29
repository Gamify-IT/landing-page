import axios, { AxiosResponse } from 'axios';

import config from '@/config';
import type { Course } from '@/types/index';

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

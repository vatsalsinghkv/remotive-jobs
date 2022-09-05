import axios from '../services/axios';
import requests from '../services/requests';
import {
  JOBS_LIMIT,
  JOBS_PER_PAGE,
  MIN_JOBS_PER_LOCATION,
} from '../utils/constant';
import { getTotalPages, validateSalary } from '../utils/helper';
import { setTotalPages } from '../../store/pagination';

/**
 * Fetches and returns the list of jobs
 * @returns {Array} - List of jobs
 * @async
 */

export const getAllJobs = async (limit = JOBS_LIMIT) => {
  const res = await axios.get(requests.all(limit));
  return res.data.jobs;
};

export const getJobsCategories = async () => {
  const res = await axios.get(requests.categories());
  const categories = res.data.jobs.map((category) => category.slug);
  return categories;
};

export const getLocations = async (category = 'all') => {
  let jobs = [];

  if (category === 'all') {
    jobs = await getAllJobs();
  } else {
    jobs = await getJobsByCategory(category);
  }

  const locations = [];
  const count = {};

  jobs.forEach((job) => {
    const location = job.candidate_required_location;
    if (!location.trim().length) return;
    count[location] = count[location] ? count[location] + 1 : 1;
    locations.push(location);
  });

  const uniqueLocations = [...new Set(locations)];
  const otherLocations = uniqueLocations.filter(
    (loc) => count[loc] < MIN_JOBS_PER_LOCATION
  );

  return {
    all: uniqueLocations.filter((loc) => !otherLocations.includes(loc)),
    others: otherLocations,
  };
};

/**
 * Fetches and returns job by the given category
 * @param {String} category - Category for the job
 * @returns {Array} jobs- Jobs of particular category
 * @async
 */

export const getJobsByCategory = async (category = '') => {
  const res = await axios.get(requests.categories(category));
  return res.data.jobs;
};

/**
 * Fetches and returns job by the given id
 * @param {String} id - jobId for the job to be Found
 * @returns {Object} - Job
 * @async
 */

export const getJobById = async (id) => {
  const jobs = await getAllJobs();
  const job = jobs.find((job) => job.id.toString() === id);
  return job;
};

export const getSalaryJobs = async () => {
  const jobs = await getAllJobs();
  const salaryJobs = jobs.filter((job) => validateSalary(job.salary));
  return salaryJobs;
};

/**
 * Returns jobs of the given page
 * @param {Number} page - page number
 * @param {Array} jobs - all the jobs of the given
 * @returns {Array} - Jobs of the given page n
 */

export const getJobsPerPage = (page, jobs) => {
  /*
   * if page === 1
   * Then we need to return array of jobs from 0 to 9
   * start: 1 - 1 * jobs per page (10)
   * start: 0 * 10 = 0
   * end: 1 * jobs per page (10)
   * end: 1 * 10 = 10 (10 will be excluded)
   */

  const start = (page - 1) * JOBS_PER_PAGE;
  const end = page * JOBS_PER_PAGE;

  return jobs.slice(start, end);
};

/**
 * Set totalPages in redux store by fetching jobs
 * @param {Object} store - redux store object
 * @return {Array} totalJobs - total number of jobs
 * @async
 */

// enf - export named function
export const loadTotalPages = async (store) => {
  const totalJobs = await getAllJobs();
  store.dispatch(setTotalPages(getTotalPages(totalJobs.length)));
  return totalJobs;
};

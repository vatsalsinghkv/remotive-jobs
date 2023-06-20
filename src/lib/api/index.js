import axios from '../services/axios';
import requests from '../services/requests';
import { JOBS_PER_PAGE, MAX_LOCATIONS } from '../utils/constant';

const filter = ({
  jobs,
  fullTime = false,
  location = 'all',
  otherLocations = [],
}) => {
  return jobs.filter((job) => {
    return (
      (!fullTime || job.job_type === 'full_time') &&
      (location === 'all' ||
        (location === 'others'
          ? otherLocations.includes(job.candidate_required_location)
          : job.candidate_required_location === location))
    );
  });
};

/**
 * Fetches and returns the list of jobs
 * @returns {Array} - List of jobs
 * @async
 */

export const getAllJobs = async (
  query = '',
  fullTime = false,
  location = 'all'
) => {
  const res = await axios.get(requests.all(query));
  const locations = getLocations(res.data.jobs);

  return {
    jobs: filter({
      jobs: res.data.jobs,
      fullTime,
      otherLocations: locations.others,
      location,
    }),
    locations,
  };
};

/**
 * Fetches and returns job by the given category
 * @param {String} category - Category for the job
 * @returns {Array} jobs- Jobs of particular category
 * @async
 */

export const getJobsByCategory = async (
  category = '',
  query = '',
  fullTime = false,
  location = 'all'
) => {
  const res = await axios.get(requests.categories(category, query));
  const locations = getLocations(res.data.jobs);

  return {
    jobs: filter({
      jobs: res.data.jobs,
      fullTime,
      otherLocations: locations.others,
      location,
    }),
    locations,
  };
};

export const getJobsCategories = async () => {
  const res = await axios.get(requests.categories());
  const categories = res.data.jobs.map((category) => category.slug);
  return categories;
};

export const getLocations = (jobs) => {
  const locations = [];
  const count = {};

  jobs.forEach((job) => {
    const location = job.candidate_required_location;
    if (!location.trim().length) return;
    count[location] = count[location] ? count[location] + 1 : 1;
    locations.push(location);
  });

  const uniqueLocations = [...new Set(locations)];

  // Sorting locations with having max jobs
  const sortedUniqueLocations = uniqueLocations.sort(
    (a, b) => count[b] - count[a]
  );

  return {
    all: sortedUniqueLocations.slice(0, MAX_LOCATIONS),
    others: sortedUniqueLocations.slice(MAX_LOCATIONS, -1),
  };
};

/**
 * Fetches and returns job by the given id
 * @param {String} id - jobId for the job to be Found
 * @returns {Object} - Job
 * @async
 */

export const getJobById = async (id) => {
  const { jobs } = await getAllJobs();
  const job = jobs.find((job) => job.id.toString() === id);
  return job;
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

// enf - export named function

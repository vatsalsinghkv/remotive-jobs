import axios from '../services/axios';
import { JOBS_PER_PAGE, TIMEOUT_SEC } from './constant';

/**
 * Returns a unique id
 * @returns {String} Unique id format id123..
 */
export const getId = () => `id${Math.random().toString(16).slice(2)}`;

/**
 * Returns a string by joining a the given sentence with underscores
 * @param {String} text - text to be formatted
 * @returns {String} id - joined with _
 */

export const toId = (text) => text.toLowerCase().replace(' ', '_');

export const trimString = (str, len) => {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};

export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

/**
 * Converts givin timestamp to formatted
 * @param {String} time - timestamp
 * @returns {String} formatted time
 */

export const timeFormatter = (time) => {
  const currentDate = new Date();
  const givenDate = new Date(time);
  const timeDifference = Math.abs(currentDate - givenDate);
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return `${dayDifference} days ago`;
};

/**
 * Make get request to the given URL
 * @param {String} url - URL to which get request should be made
 * @returns {Object | Promise} Resolved promise or rejected promise | object of data returned
 * @async
 */

export const FETCH = async (url) =>
  Promise.race([axios.get(url), timeout(TIMEOUT_SEC)]);

/**
 * Returns a rejected Promise after given seconds
 * @async
 * @param {number} sec - How much time before rejecting promise
 * @returns {Promise} Settled (Rejected) Promise
 */

export const timeout = async function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const err = new Error(
        `Request took too long! Timeout after ${sec} second`
      );
      err.code = 500;
      reject(err);
    }, sec * 1000);
  });
};

/**
 * Returns total pages according to the no of data el
 * @param {Number} length - Number of data
 * @returns {Number} Total pages
 */
export const getTotalPages = (length) => Math.ceil(length / JOBS_PER_PAGE);

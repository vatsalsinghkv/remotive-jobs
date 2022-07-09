/**
 * Returns a unique id
 * @returns {String} Unique id format id123..
 */

export const getId = () => `id${Math.random().toString(16).slice(2)}`;

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

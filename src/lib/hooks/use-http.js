import { useCallback, useState } from 'react';
import { FETCH } from '../utils/helper';
import { FETCH_STATE } from '../utils/constant';

/**
 * useHttp hook handle request management by fetching data and maintaining isLoading and error state
 * @returns {Object} isLoading, error, sendRequest
 */

const useHttp = () => {
  const [fetchState, setFetchState] = useState(FETCH_STATE.DEFAULT);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Sends get request to the given url and calls callback
   * @param {String} url url of the server
   * @param {Function} callback function that needs to be run when data is fetched
   * @async
   */

  const sendRequest = useCallback(async (requestFunction, url) => {
    // setIsLoading(true);
    setFetchState(FETCH_STATE.LOADING);
    setError(null);

    try {
      const res = url ? await FETCH(url) : await requestFunction();
      setData(res.data);
      setFetchState(FETCH_STATE.SUCCESS);
    } catch (err) {
      setFetchState(FETCH_STATE.ERROR);
      setError({ ...err, message: err.message || 'Something went wrong!' });
    }
    setIsLoading(false);
  }, []);

  return { fetchState, data, error, sendRequest };
};

export default useHttp;

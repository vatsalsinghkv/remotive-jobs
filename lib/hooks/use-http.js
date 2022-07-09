import { useCallback, useState } from 'react';
import axios from '../services/axios';
import { timeout } from '../utils/helper';
import { FETCH_STATE, TIMEOUT_SEC } from '../utils/constant';

/**
 * useHttp hook handle request management by fetching data and maintaining isLoading and error state
 * @returns {Object} isLoading, error, sendRequest
 */

const useHttp = () => {
  const [fetchState, setFetchState] = useState(FETCH_STATE.DEFAULT);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Sends get request to the given url and calls callback
   * @param {String} url url of the server
   * @param {Function} callback function that needs to be run when data is fetched
   * @async
   */

  const sendRequest = useCallback(async url => {
    setFetchState(FETCH_STATE.LOADING);
    setError(null);

    try {
      const res = await Promise.race([axios.get(url), timeout(TIMEOUT_SEC)]);
      setData(res.data);
      setFetchState(FETCH_STATE.SUCCESS);
    } catch (err) {
      setFetchState(FETCH_STATE.ERROR);
      setError({ ...err, message: err.message || 'Something went wrong!' });
    }
  }, []);

  return { fetchState, data, error, sendRequest };
};

export default useHttp;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import pagination from './pagination';
import jobs from './jobs';

const combinedReducer = combineReducers({
  pagination,
  jobs,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => {
  return configureStore({
    reducer: masterReducer,
  });
};

const wrapper = createWrapper(makeStore);

export { makeStore, wrapper };

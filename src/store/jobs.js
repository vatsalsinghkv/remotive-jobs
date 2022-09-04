import { createSlice } from '@reduxjs/toolkit';

const filter = ({
  jobs,
  fullTime = false,
  search = '',
  location = 'all',
  otherLocations = [],
}) => {
  return jobs.filter((job) => {
    return (
      (!fullTime || job.job_type === 'full_time') &&
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company_name.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.includes(search.toLowerCase())) &&
      (location === 'all' ||
        (location === 'others'
          ? otherLocations.includes(job.candidate_required_location)
          : job.candidate_required_location === location))
    );
  });
};

const locationFilter = (locations, search = '') => {
  return locations.filter((loc) =>
    loc.toLowerCase().includes(search.toLowerCase())
  );
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    all: [],
    filtered: [],
    categories: {
      all: [],
      selected: 'all',
    },
    fullTime: false,
    search: '',
    locations: {
      default: ['all', 'others'],
      all: [],
      others: [],
      filtered: [],
      selected: 'all',
      search: '',
    },
  },
  reducers: {
    setJobs(state, action) {
      state.filtered = action.payload;
      if (state.all.length === 0) {
        state.all = action.payload;
      }
    },
    setAllJobs(state, action) {
      state.all = action.payload;
    },
    setFullTime(state, action) {
      state.fullTime = action.payload;
      state.filtered = filter({
        jobs: state.all,
        fullTime: action.payload,
        search: state.search,
        location: state.locations.selected,
        otherLocations: state.locations.others,
      });
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.filtered = filter({
        jobs: state.all,
        fullTime: state.fullTime,
        search: action.payload,
        location: state.locations.selected,
        otherLocations: state.locations.others,
      });
    },
    setCategories(state, action) {
      state.categories.all = action.payload;
    },
    setSelectedCategory(state, action) {
      state.categories.selected = action.payload;
    },
    setLocations(state, action) {
      state.locations.all = [...action.payload.all, ...action.payload.others];
      state.locations.others = action.payload.others;

      if (action.payload.others.length) {
        state.locations.default = state.locations.filtered = [
          state.locations.default[0],
          ...action.payload.all,
          state.locations.default.at(-1),
        ];
      } else {
        state.locations.default = state.locations.filtered = [
          state.locations.default[0],
          ...action.payload.all,
        ];
      }
    },
    setLocationSearch(state, action) {
      state.locations.search = action.payload;
      if (!action.payload) {
        state.locations.filtered = state.locations.default;
        return;
      }
      state.locations.filtered = locationFilter(
        state.locations.all,
        action.payload
      );
    },
    setLocation(state, action) {
      state.locations.selected = action.payload;
      state.filtered = filter({
        jobs: state.all,
        fullTime: state.fullTime,
        search: state.search,
        location: state.locations.selected,
        otherLocations: state.locations.others,
      });
    },
  },
});

export const {
  setJobs,
  setAllJobs,
  resetFilteredJobs,
  setFullTime,
  setCategories,
  setSelectedCategory,
  setSearch,
  setLocations,
  setLocation,
  setLocationSearch,
} = jobSlice.actions;

export default jobSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setTotalPages(state, action) {
      state.totalPages = action.payload;

      if (state.totalPages < state.currentPage) {
        state.currentPage = state.totalPages;
      }
    },
    setCurrentPage(state, action) {
      const page = action.payload;

      state.currentPage = page < 1 ? 1 : page;
    },
  },
});

export const { setCurrentPage, setTotalPages } = paginationSlice.actions;

export default paginationSlice.reducer;

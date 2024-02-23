import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { API } from '../../Api';

// Define the async thunk to fetch users from the API
export const fetchcourses = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(API+"all-courses");
  const data = await response.json();
  return data;
});

// Define the slice
const courseReducer = createSlice({
  name: 'courses',
  initialState: { courses: [], status: 'idle', error: null },
  reducers: {
    
  },
  extraReducers: {
    [fetchcourses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchcourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.courses = action.payload
    },
    [fetchcourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    
     
  },
});

export default courseReducer .reducer;

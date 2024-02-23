import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '../Slices/Coursesslice';

const store = configureStore({
  reducer: {
   courses : courseReducer,
  },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../slices/token';

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});

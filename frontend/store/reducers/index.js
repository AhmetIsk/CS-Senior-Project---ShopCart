import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../slices/token';
import userReducer from '../slices/user';

export default configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
});

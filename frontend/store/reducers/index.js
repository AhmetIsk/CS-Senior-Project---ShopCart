import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../slices/token';
import userReducer from '../slices/user';
import idReducer from '../slices/shopListId';

export default configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    id: idReducer,
  },
});

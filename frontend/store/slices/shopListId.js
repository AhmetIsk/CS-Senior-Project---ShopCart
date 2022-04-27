/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const id = createSlice({
  name: 'id',
  initialState: {
    value: null,
  },
  reducers: {
    setId: (state, action) => {
      state.value = action.payload;
    },
    resetId: (state) => {
      state.value = null;
    },
  },
});

export const { setId, resetId } = id.actions;

export const shopListId = (state) => state.id.value;

export default id.reducer;

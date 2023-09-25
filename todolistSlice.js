import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  inputData: '',
  isLoading: true,
};
const todolistSlice = createSlice({
  name: 'todolistSlice',
  initialState,
  reducers: {
    setInputData: (state, action) => {
      state.inputData = action.payload;
    },
  },
});
export const { setInputData } = todolistSlice.actions;
export default todolistSlice.reducer;

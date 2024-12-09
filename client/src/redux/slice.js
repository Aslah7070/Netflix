import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
     email: '',
     islog:"",

     }, // Initial state with email as an empty string
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload; // Explicitly set the email
    },
    isLogin: (state, action) => {
      state.islog = action.payload; // Update email when user logs in
    },
  },
});

export const { setEmail, isLogin } = userSlice.actions;
export default userSlice.reducer;

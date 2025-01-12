import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isLoggedIn: false,
    premiumPrice: null,
    clientSecretKey: '',
    role: '',
    username: '',
    image: '', 
    users:[]
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setSelectedPremium: (state, action) => {
      state.premiumPrice = action.payload;
    },
    setClientSecret: (state, action) => {
      state.clientSecretKey = action.payload;
    },
    setUserData: (state, action) => {
      console.log("slice",action.payload);
      
      const { email, role, username, image } = action.payload;
      console.log("roorleadsfdsf",role);
      console.log("state.role",role);
      console.log("username",email);
      
      state.email = email || state.email;
      state.role = role || state.role;
      state.username = username || state.username;
      state.image = image || state.image;
    },
    logout: (state) => {
      
      state.email = '';
      state.isLoggedIn = false;
      state.premiumPrice = null;
      state.clientSecretKey = '';
      state.role = '';
      state.username = '';
      state.image = '';
    },
    setAllUsers:(state,action)=>{
state.users=action.payload
    }
  },
});

export const {
  setEmail,
  setLoginStatus,
  setSelectedPremium,
  setClientSecret,
  setUserData,
  logout,
  setAllUsers
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


export  const profileSlice=createSlice({
      
    name:"profile",
    initialState:{
        Profiles:[],
        currentProfile:"",
        avatars:[]
    },
    reducers:{
       allProfiles:(state,action)=>{
        state.Profiles=action.payload
       },
       setCurrentProfile:(state,action)=>{
        state.currentProfile=action.payload
       },
       setAvatars:(state,action)=>{
        state.avatars=action.payload
       }
    }
})
export const {allProfiles,setCurrentProfile,setAvatars}=profileSlice.actions
export default profileSlice.reducer
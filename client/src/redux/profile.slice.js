import { createSlice } from "@reduxjs/toolkit";


export  const profileSlice=createSlice({
      
    name:"profile",
    initialState:{
        Profiles:[],
        currentProfile:"",
        avatars:[],
        recivedAccount:"",
        profileurl:""
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
       },
       profileTranferRecivedAccount:(state,action)=>{
        state.recivedAccount=action.payload
       },
       setProfileUrl:(state,action)=>{
         state.profileurl=action.payload
       }
    }
})
export const {allProfiles,setCurrentProfile,setAvatars,profileTranferRecivedAccount,setProfileUrl}=profileSlice.actions
export default profileSlice.reducer
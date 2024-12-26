import { createSlice } from "@reduxjs/toolkit";


export  const profileSlice=createSlice({
      
    name:"profile",
    initialState:{
        Profiles:[]
    },
    reducers:{
       allProfiles:(state,action)=>{
        state.Profiles=action.payload
       }
    }
})
export const {allProfiles}=profileSlice.actions
export default profileSlice.reducer
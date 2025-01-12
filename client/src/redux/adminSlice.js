import { createSlice } from "@reduxjs/toolkit";
const adminSlice = createSlice({
    name: "admin",
    initialState: {
   totlaAmount:null,
   allPayments:[]
    },
    reducers: {
      setAmount:(state,action)=>{
        state.totlaAmount=action.payload
      },
      setAllPayments:(state,action)=>{
        state.allPayments=action.payload
      }
        
    },
  });
  
  export const { setAmount,setAllPayments } = adminSlice.actions;
  export default adminSlice.reducer;
  
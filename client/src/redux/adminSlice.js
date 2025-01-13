import { createSlice } from "@reduxjs/toolkit";
const adminSlice = createSlice({
    name: "admin",
    initialState: {
   totlaAmount:null,
   dailyAmounts:null,
   allPayments:[]
    },
    reducers: {
      setAmount:(state,action)=>{
        state.totlaAmount=action.payload
      },
      setAllPayments:(state,action)=>{
        state.allPayments=action.payload
      },
      setDilyPayments:(state,action)=>{
        state.dailyAmounts=action.payload
      }
        
    },
  });
  
  export const { setAmount,setAllPayments,setDilyPayments } = adminSlice.actions;
  export default adminSlice.reducer;
  
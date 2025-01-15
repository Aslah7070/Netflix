import { createSlice } from "@reduxjs/toolkit";
const adminSlice = createSlice({
    name: "admin",
    initialState: {
   totlaAmount:null,
   dailyAmounts:null,
   monthlyAmount:null,
   primeUsers:[],
   nonPrimeUsers:[],
   allPayments:[],
   movies:[]
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
      },
      setMonthlyPayments:(state,action)=>{
        state.monthlyAmount=action.payload
      },
      setPrimeUses:(state,action)=>{
        state.primeUsers=action.payload
      },
      setNonPrime:(state,action)=>{
        state.nonPrimeUsers=action.payload
      },
      setAdminMovies:(state,action)=>{
        state.movies=action.payload
      },

        
    },
  });
  
  export const { setAmount,setAllPayments,setDilyPayments,setMonthlyPayments,setPrimeUses,setNonPrime,setAdminMovies } = adminSlice.actions;
  export default adminSlice.reducer;
  
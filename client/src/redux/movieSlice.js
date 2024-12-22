import {createSlice} from "@reduxjs/toolkit"


const movieSlice= createSlice({
    name:"movies",
    initialState:{
         movies:[],
         search:"",
         searchVisibility:false
    },
    reducers:{
        setMovies:(state,action)=>{
            state.movies=action.payload
        },
        searchQuery:(state,action)=>{
            state.search=action.payload
        },
        searchVisible:(state,action)=>{
            state.searchVisibility=action.payload
        }
    }
})

export const {setMovies,searchQuery,searchVisible}=movieSlice.actions
export default movieSlice.reducer
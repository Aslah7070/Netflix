  


import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    search: "",
    searchVisibility: false,
    restricted: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    searchQuery: (state, action) => {
      state.search = action.payload;
    },
    searchVisible: (state, action) => {
      state.searchVisibility = action.payload;
    },
    setRestricted: (state, action) => {
    
      if (!state.restricted.includes(action.payload)) {
        console.log("action.payload",action.payload);
        console.log("state.restrictedDdd",typeof state.restricted);
        console.log("state.restricted", JSON.stringify(state.restricted));
        
        state.restricted.push(action.payload);
        // state.restricted=[]
      }
    },
    removeRestricted: (state, action) => {
       
        const moviesToRemove = action.payload;
        console.log("state.restrictedccccccccc",state.restricted);
        
        state.restricted = state.restricted.filter(
          (movie) => moviesToRemove.includes(movie)
        );
      },
      
  },
});

export const { setMovies, searchQuery, searchVisible, setRestricted, removeRestricted } = movieSlice.actions;
export default movieSlice.reducer;

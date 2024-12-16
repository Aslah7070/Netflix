import React, { useEffect } from 'react'
import api from '../../axiosInstance/api'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies } from '../../redux/movieSlice'

const FetchMovies = () => {
const movies=useSelector((state)=>state.movies.movies)
console.log("moovue",movies);

const dispatch=useDispatch()
    useEffect(()=>{
      const display=async()=>{
        const response=await api.get("fetchmovies")
      console.log(response.data.data);
      const movies=response.data.data
      dispatch(setMovies(movies))
      }

      display()
      
      
    },[])
  return (
    <div>
      <h1>hello worldsfadsfdsfjadsfadsjfadfadsjd</h1>
    </div>
  )
}

export default FetchMovies

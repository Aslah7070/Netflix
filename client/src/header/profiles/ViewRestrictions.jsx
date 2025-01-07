

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import api from '../../axiosInstance/api';
import { filterdMovies, removeRestricted, searchQuery, setMovies, setRestricted } from '../../redux/movieSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoMdClose } from "react-icons/io";
import { setCurrentProfile } from '../../redux/profile.slice';

const   ViewRestrictions = () => {
  const [rating, setRating] = useState(3);
  console.log("rating",rating);
  
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [queries, setQueries] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const {profileid}=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ratings = ['U/A7+', 'U/A13+', 'U/A16+', 'U/A18+'];
  const query = useSelector((state) => state.movies.search);
  const restrictedMovies = useSelector((state) => state.movies.restricted);
 const allProfile=useSelector((state)=>state.profile.Profiles)
    console.log("allProfile",allProfile);
    const [selectedProfile,setSelectedProfile]=useState("")
console.log("selectedProfile",selectedProfile);


   useEffect(()=>{
       
          findProfile()
   },[profileid])
 

   useEffect(() => {
    
  
    getCurrentProfile();
  }, []); 

  const getCurrentProfile = async () => {
    try {
      const response = await api.get("/getcurrentprofile");
      console.log("response form", response.data);

      // Ensure response structure matches what you are expecting
      if (response.data.success && response.data.currentProfile) {
        dispatch(setCurrentProfile(response.data.currentProfile));
      } else {
        console.log("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching current profile:", error.response || error.message || error);
    }
  };

   const findProfile=async()=>{
    const response=await api.get(`/fidPprofilebyid/${profileid}`)
    console.log("respons",response.data.pro);
    setSelectedProfile(response.data.pro)
  }
const handleSaving=async()=>{
  console.log("hekkig");
  console.log("ratings[rating]",ratings[rating]);
  
  const response=await api.post("/ratingsortmovies",{Rating:ratings[rating],profileId:selectedProfile._id})

  console.log("responseviesssss",response.data);

if(response.data){
  dispatch(filterdMovies(response.data))

  // navigate("/")
}
  
}

console.log("selectedProfile",selectedProfile);

  

  const handleSliderChange = (value) => {
    setRating(value);
  };
  console.log("restrictedMovies length", restrictedMovies); 
  console.log("restrictedMovies", JSON.stringify(restrictedMovies));  
  

  const handleList = async (id, title) => {
    try {
      const response = await api.post(`/restrictedMovies/${id}`,{profileId:selectedProfile._id});
      if (response.data) {
        setQueries(title); 
        setShowSearchResults(false); 
        console.log("hello",response.data.title);
        
        dispatch(setRestricted(response.data.title));

       findProfile()
       getCurrentProfile();
      }
    } catch (error) {
      if (error.response?.data?.message === "movie is already excist") {
        toast.error("Movie already exists", {
          position: "bottom-center",
          style: {
            backgroundColor: "black",
            color: "white",
          },
          autoClose: 3000,
        });
      }
    }
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setQueries(query);
    if (query) {
      setShowSearchResults(true); 
      const response = await api.get(`/namebasedsearch?q=${query}`);
      setData(response.data.success);
    } else {
      setShowSearchResults(false);
      setData('');
    }
  };

  const handleInputFocus = () => {
    if (queries) {
      setShowSearchResults(true); 
    }
  };

  const handleRemoveRestriction = async (movieID) => {
    try {
      console.log("hsdh");
      
      const response = await api.post("/deleterestrictedmovies", { movieID:movieID,profileId:selectedProfile });
  console.log("deleterestrictedmovies",response);
  
      if (response.data.success) {
        
        console.log("Updated restricted movies:", response.data.balanceMovies);
        dispatch(removeRestricted(response.data.balanceMovies)); 
        findProfile()
        getCurrentProfile();
      } else {
        console.error("Failed to remove movie:", response.data.message);
      }
    } catch (error) {
      console.error("Error while removing restricted movie:", error);
    }
  };
  

  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center">
      <div className="w-3/5 h-5/6 space-y-20">
        {/* Header */}
        <div className="flex py-5 justify-between">
          <h1 className="text-5xl">Viewing Restrictions</h1>
          <img className="w-14" src={selectedProfile.image} alt="hello" />
        </div>
        <p className="text-3xl">Profile Maturity Rating for {}</p>
        <p className="text-2xl">Show titles of all maturity ratings for this profile.</p>

        {/* Slider */}
        <div className="w-full">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            min={0}
            max={ratings.length - 1}
            step={1}
            value={rating}
            onChange={handleSliderChange}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="w-10 h-10 bg-blue-600 p-3 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                {ratings[state.value]}
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`h-4 rounded-full ${
                  state.index === 0 ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          />
          <div className="flex justify-between mt-4">
            {ratings.map((label, index) => (
              <span
                key={index}
                className={`text-xl font-medium mt-4 ${
                  index === rating ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>


        <div className="flex flex-col">
          <h1>Title Restrictions for Aslah</h1>
          <span className="mb-3">Don't show specific titles for this profile regardless of Maturity Rating</span>
          <input
            className="w-3/6 h-12"
            type="text"
            value={queries}
            placeholder="Enter movie name"
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
          />
          {showSearchResults && data && (
            <div className="mt-3 border border-black w-96">
              <table className="table-auto border-collapse border border-gray-500 w-full">
                <tbody>
                  {data.slice(0, 5).map((movie) => (
                    <tr key={movie._id} className="text-gray-700">
                      <td
                        onClick={() => handleList(movie._id, movie.title)}
                        className="border border-black px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {movie.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-col w-3/6 space-y-3">
          {selectedProfile.blockedCollection &&
            selectedProfile.blockedCollection.map((title, index) => (
             <div className='flex justify-between'> 
              <span key={index} className="text-red-700 text-lg">
             {title.title}
           </span>
           <span onClick={()=>handleRemoveRestriction(title._id)}><IoMdClose/></span>
           </div>
            ))}

<div className="flex items-center justify-center space-x-4 ">
          <button
          onClick={handleSaving}
          className="text-2xl w-24 bg-blue-600 text-white border border-black">Save </button>
          <button
          onClick={()=>navigate("/")}
          className="text-2xl w-24 bg-gray-600 text-white border border-black">Cancel </button>
        </div>  
        </div>

 
        
      </div>
    </div>
  );
};

export default ViewRestrictions;

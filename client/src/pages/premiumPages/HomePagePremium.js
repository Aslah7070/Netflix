// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoginStatus } from '../../redux/slice';
// import api from '../../axiosInstance/api';
// import netflixLogo from "../../assets/netflix-logo.png";

// import backgroundImage from "../../assets/netflixHomeimage.jpg"; 
// import MySwiperComponent from './MoviesAndTvShows';
// import SouthIndian from './SouthIndian';

// import IndianMovies from './categories/IndianMovies';
// import { setMovies } from '../../redux/movieSlice';
// import FunMovies from './categories/FunMovies';
// import ActionMovies from './categories/ActionMovies';

// const HomePagePremium = () => {
//   const dispatch = useDispatch();

//   const email = useSelector((state) => state.user.email);
//   const role = useSelector((state) => state.user.role);
//   const amount = useSelector((state) => state.user.premiumPrice);



//   const movies=useSelector((state)=>state.movies.movies)
// console.log("moovueffff",movies);

//     useEffect(()=>{
//       const display=async()=>{
//         const response=await api.get("fetchmovies")
//       console.log(response.data.data);
//       const movies=response.data.data
//       dispatch(setMovies(movies))
//       }

//       display()
      
      
//     },[])

//   const handleLogout = async () => {
//     try {
//       const response = await api.post('/logout');
//       if (response.status === 200) {
//         dispatch(setLoginStatus(false));
//       }
//     } catch (error) {
//       console.error('Error logging out:', error.message);
//     }
//   };

//   return (
//     <div
//       className="relative w-full h-screen bg-cover  bg-center"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//       }}
//     >
//      <div className='w-full h-full '>
     
//        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>


// <div className="relative z-10 flex justify-between px-10 py-5 text-white">
//   <div className="flex space-x-5">
//     <img className="w-20" src={netflixLogo} alt="Netflix Logo" />
//     <p>Home</p>
//     <p>TV Shows</p>
//     <p>Movies</p>
//     <p>New & Popular</p>
//     <p>My List</p>
//     <p>Browse by Language</p>
//   </div>
//   <div className="flex space-x-5">
//     <div>🔍</div>
//     <div>🎥</div> 
//     <div>🔔</div> 
//     <div>👤</div>
//   </div>
// </div>

// {/* Content Section */}
// <div className="relative z-10 text-white px-10 mt-20">
//   <h1 className="text-4xl font-bold">Welcome, {email || 'Guest'}</h1>
//   <p className="text-lg mt-2">
//     {role === 'premium'
//       ? 'Enjoy unlimited streaming of your favorite movies and TV shows!'
//       : 'Upgrade to Premium for the best experience.'}
//   </p>
//   <button
//     onClick={handleLogout}
//     className="mt-5 px-6 py-3 bg-red-600 rounded-md hover:bg-red-700"
//   >
//     Logout
//   </button>
// </div>
//      </div>
//      <div><IndianMovies/></div>
//      <div><FunMovies/></div>
//      <div><ActionMovies/></div>
     
//     </div>
//   );
// };

// export default HomePagePremium;


  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { setLoginStatus } from '../../redux/slice';
  import api from '../../axiosInstance/api';
  import netflixLogo from "../../assets/netflix-logo.png";

  import { setMovies } from '../../redux/movieSlice';
  import IndianMovies from './categories/IndianMovies';
  import FunMovies from './categories/FunMovies';
  import ActionMovies from './categories/ActionMovies';
  import HindiMovies from './categories/HindiMovies';
  import ThamilMovies from './categories/ThamilMovies';
  import { Outlet } from 'react-router-dom';

  const HomePagePremium = () => {
    const dispatch = useDispatch();

    const email = useSelector((state) => state.user.email);
    const role = useSelector((state) => state.user.role);
    const movies = useSelector((state) => state.movies.movies);
    const backgroundVideo = movies.length > 0 ? movies[0].videoUrl : null;

    useEffect(() => {
      const fetchMovies = async () => {
        const response = await api.get("fetchmovies");
        const movies = response.data.data;
        dispatch(setMovies(movies));
      };

      fetchMovies();
    }, [dispatch]);

    const handleLogout = async () => {
      try {
        const response = await api.post('/logout');
        if (response.status === 200) {
          dispatch(setLoginStatus(false));
        }
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };

    const handleCheck=async()=>{
  try {
    const responce=await api.post("/hey")
    console.log("resss",responce)
    
  } catch (error) {
    console.log("error",error);
    
  }
    
    }

    return (
      <div className="relative w-full bg-gray-950  h-auto">
        {/* Video Background */}
        {backgroundVideo && (
          <video
            className="absolute top-0 left-0 w-full h-screen object-none"
            src={backgroundVideo}
            autoPlay
            loop
            muted
          ></video>
        )}

        {/* Overlay */}
        <div className="relative top-0 left-0 w-full  bg-red-500 bg-opacity-50"></div>

        {/* Header and Content */}
        <div className="relative">
          {/* Navigation */}
          <div className="flex justify-between px-10 py-5 text-white">
            <div className="flex space-x-5">
              <img className="w-20" src={netflixLogo} alt="Netflix Logo" />
              <p>Home</p>
              <p>TV Shows</p>
              <p>Movies</p>
              <p>New & Popular</p>
              <p>My List</p>
              <p>Browse by Language</p>
            </div>
            <div className="flex space-x-5">
              <div>🔍</div>
              <div>🎥</div>
              <div>🔔</div>
              <div>👤</div>
            </div>
          </div>

          {/* Greeting Section */}
          <div className="text-white px-10 mt-96">
            <h1 className="text-4xl font-bold">Welcome, {email || 'Guest'}</h1>
            <p className="text-lg mt-2">
              {role === 'premium'
                ? 'Enjoy unlimited streaming of your favorite movies and TV shows!'
                : 'Upgrade to Premium for the best experience.'}
            </p>
            <button
              onClick={handleLogout}
              className="mt-5 px-6 py-3 bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>

            <button className="mt-5 px-10 py-3 bg-white text-black rounded-md hover:bg-red-700 me-5">Play</button>
            <button className="mt-5 px-14 py-3 bg-white text-black rounded-md hover:bg-red-700">More-info</button>
          </div>
        </div>

        {/* Movie Categories */}
        <div className="relative  bg-opacity-90 text-white space-y-8 pt-5">
          <IndianMovies />
        
          <FunMovies />
          <ActionMovies />
          <HindiMovies/>
        
          <ThamilMovies/>


        </div>

      </div>
    );
  };

  export default HomePagePremium;

// import React from 'react';
// import { Route, Routes, useLocation, useParams ,matchPath} from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPages/LoginPage';
// import SignUpPage from './pages/registration/SignUpPage';
// import Registration from './pages/registration/Registration';
// import NavBar from './header/NavBar';
// import VerifyEmail from './pages/registration/VerifyEmail';
// import PlanComponent from './pages/premiumPages/PlanComponent';
// import PremiumComponent from './pages/premiumPages/PremiumComponent';
// import UpgredOnUs from './pages/premiumPages/UpgredOnUs';
// import PaymentPicker from './pages/premiumPages/PaymentPicker';
// import Checkoutpayment from './pages/premiumPages/PaymentStripe';
// import HomePagePremium from './pages/premiumPages/HomePagePremium';
// import { useSelector } from 'react-redux';
// import Success from './pages/premiumPages/Success';
// import MoviesAndTvShows from './pages/premiumPages/MoviesAndTvShows';
// import MySwiperComponent from './pages/premiumPages/MoviesAndTvShows';
// import SouthIndian from './pages/premiumPages/SouthIndian';

// import LoginWithOTP from './pages/LoginPages/LoginWithOTP';
// import TrendingNow from './pages/TrendingNow';
// import ChangePassword from './pages/LoginPages/ChangePassword';
// import ForgotSendMail from './pages/LoginPages/ForgotSendMail';
// import ShowHidePassword from './header/Test';
// import IndianMovies from './pages/premiumPages/categories/IndianMovies';
// import AdminMovieUpload from './pages/admin-part/UploadMovies';
// import MovieUploadForm from './pages/admin-part/UploadMovies';
// import FetchMovies from './pages/premiumPages/FetchMovies';
// import VideoPlayer from './pages/premiumPages/TestingComponent';
// import MoviePlayer from './pages/premiumPages/MoviePlayer';
// import MoviesDetails from './pages/premiumPages/MoviesDetails';
// import ThamilMovies from './pages/premiumPages/categories/ThamilMovies';
// import HindiMovies from './pages/premiumPages/categories/HindiMovies';
// import ActionMovies from './pages/premiumPages/categories/ActionMovies';
// import FunMovies from './pages/premiumPages/categories/FunMovies';


// import UploadEpisods from './pages/admin-part/UploadEpisods';
// import UploadEpisodesForm from './pages/admin-part/UploadEpisods';
// import UploadTVShowForm from './pages/admin-part/UploadTvShows';
// import SearchResults from './pages/premiumPages/categories/SearchResults';

// function App() {
//   const location =useLocation()

//   const role=useSelector((state)=>state.user.role)
//   const email=useSelector((state)=>state.user.email)
//   const active=useSelector((state)=>state.user.isLoggedIn)
//   console.log("appRole",role);
//   console.log("activeeeee",active);
//   console.log("email",email);



  


//   const excludedPaths = [
//     "/",
//     "/:sessionId",
//     "/loginotp",
//     "/login",
//     "/premiumhome",
//     "/sendemail",
//     "/success/",
//     "/details/:movieId",
//     ":movieId",
//     "/movieplayer/:movieId",
//   ];
//   console.log("Current Pathname:", location.pathname);
//   const shouldDisplayNavBar = excludedPaths.every((path) => {
//     const match = matchPath({ path, end: false }, location.pathname);
//     return !match; // Exclude matching paths from showing NavBar
//   });
//   return (
//     <>

  
//       {shouldDisplayNavBar && <NavBar />}

//    {((role==="premium")&&active)?(
   
//     <Routes>
//     <Route path="/" element={<HomePagePremium />}>
//       {/* Nested Routes for Categories */}
    
//       {/* Nested route for movie details */}
//       <Route path=":movieId" element={<MoviesDetails/>} />
      
//       <Route path="funmovies" element={<FunMovies />} />
//       <Route path="actionmovies" element={<ActionMovies />} />
//       <Route path="hindimovies" element={<HindiMovies />} />
//       <Route path="thamilmovies" element={<ThamilMovies />} />

//     </Route>
//     <Route path='/movieplayer/:movieId' element={ <MoviePlayer/>}/>
//     <Route path='/uploadmovies' element={ <MovieUploadForm/>}/>
//     <Route path='/uploadtvshows' element={ <UploadTVShowForm/>}/>
//     <Route path='/uploadepisods' element={ <UploadEpisodesForm/>}/>
//     <Route path='/search' element={ <SearchResults/>}/>
//   </Routes>
//    ):(
 
 
// <Routes>
//  <Route path='/' element={<HomePage/>}/>
// <Route path="/login" element={<LoginPage />}/>
// <Route path='/loginotp' element={<LoginWithOTP/>}/>          
//  <Route path='/signup' element={<SignUpPage/>}/>
//  <Route path='/registration' element={<Registration/>}/>
//  <Route path='/verifyemail' element={<VerifyEmail/>}/>
//  <Route path='/plancomponent' element={<PlanComponent/>}/>  
//  <Route path='/premiumslice' element={<PremiumComponent/>}/>
//  <Route path='/UpgredOnUs' element={<UpgredOnUs/>}/>
//  <Route path='/paymentpicker' element={<PaymentPicker/>}/>
//  <Route path='/paymetStrip' element={<Checkoutpayment/>}/>
//  <Route path='/success' element={<Success/>}/>
//  <Route path='/Trendingnow' element={<TrendingNow/>}/>
//  <Route path='/reset_password/:id/:token' element={<ChangePassword/>}/>
//  <Route path='/sendemail' element={<ForgotSendMail/>}/>


 
 
// </Routes>
//    )
    
//    }
//     </>
//   );
// }

// export default App;



import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './header/NavBar';
import AppRoutes from './AppRoutes';
import { useSelector } from 'react-redux';

function App() {
  const location = useLocation();
  const role = useSelector((state) => state.user.role);
  const active = useSelector((state) => state.user.isLoggedIn);

  const excludedPaths = [
    "/",
    "/:sessionId",
    "/loginotp",
    "/login",
    "/premiumhome",
    "/sendemail",
    "/success/",
    "/details/:movieId",
    ":movieId",
    "/movieplayer/:movieId",
  ];

  const shouldDisplayNavBar = excludedPaths.every((path) => {
    return !new RegExp(path).test(location.pathname);
  });

  return (
    <>
      {shouldDisplayNavBar && <NavBar />}
      <AppRoutes role={role} active={active} />
    </>
  );
}

export default App;




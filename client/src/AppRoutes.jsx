import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPages/LoginPage';
import SignUpPage from './pages/registration/SignUpPage';
import Registration from './pages/registration/Registration';
import VerifyEmail from './pages/registration/VerifyEmail';
import PlanComponent from './pages/premiumPages/PlanComponent';
import PremiumComponent from './pages/premiumPages/PremiumComponent';
import UpgredOnUs from './pages/premiumPages/UpgredOnUs';
import PaymentPicker from './pages/premiumPages/PaymentPicker';
import Checkoutpayment from './pages/premiumPages/PaymentStripe';
import HomePagePremium from './pages/premiumPages/HomePagePremium';
import Success from './pages/premiumPages/Success';
import MoviesAndTvShows from './pages/premiumPages/MoviesAndTvShows';
import LoginWithOTP from './pages/LoginPages/LoginWithOTP';
import TrendingNow from './pages/TrendingNow';
import ChangePassword from './pages/LoginPages/ChangePassword';
import ForgotSendMail from './pages/LoginPages/ForgotSendMail';
import MoviesDetails from './pages/premiumPages/MoviesDetails';
import MoviePlayer from './pages/premiumPages/MoviePlayer';
import ActionMovies from './pages/premiumPages/categories/ActionMovies';
import FunMovies from './pages/premiumPages/categories/FunMovies';
import ThamilMovies from './pages/premiumPages/categories/ThamilMovies';
import HindiMovies from './pages/premiumPages/categories/HindiMovies';
import UploadEpisodesForm from './pages/admin-part/UploadEpisods';
import UploadTVShowForm from './pages/admin-part/UploadTvShows';
import MovieUploadForm from './pages/admin-part/UploadMovies';
import SearchResults from './pages/premiumPages/categories/SearchResults';

function AppRoutes({ role, active }) {
    return (
        <>
    
      
          {/* {shouldDisplayNavBar && <NavBar />} */}
    
       {((role==="premium")&&active)?(
       
        <Routes>
        <Route path="/" element={<HomePagePremium />}>
          {/* Nested Routes for Categories */}
        
          {/* Nested route for movie details */}
          <Route path=":movieId" element={<MoviesDetails/>} />
          
          <Route path="funmovies" element={<FunMovies />} />
          <Route path="actionmovies" element={<ActionMovies />} />
          <Route path="hindimovies" element={<HindiMovies />} />
          <Route path="thamilmovies" element={<ThamilMovies />} />
    
        </Route>
        <Route path='/movieplayer/:movieId' element={ <MoviePlayer/>}/>
        <Route path='/uploadmovies' element={ <MovieUploadForm/>}/>
        <Route path='/uploadtvshows' element={ <UploadTVShowForm/>}/>
        <Route path='/uploadepisods' element={ <UploadEpisodesForm/>}/>
        <Route path='/search' element={ <SearchResults/>}/>
      </Routes>
       ):(
     
     
    <Routes>
     <Route path='/' element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path='/loginotp' element={<LoginWithOTP/>}/>          
     <Route path='/signup' element={<SignUpPage/>}/>
     <Route path='/registration' element={<Registration/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
     <Route path='/plancomponent' element={<PlanComponent/>}/>  
     <Route path='/premiumslice' element={<PremiumComponent/>}/>
     <Route path='/UpgredOnUs' element={<UpgredOnUs/>}/>
     <Route path='/paymentpicker' element={<PaymentPicker/>}/>
     <Route path='/paymetStrip' element={<Checkoutpayment/>}/>
     <Route path='/success' element={<Success/>}/>
     <Route path='/Trendingnow' element={<TrendingNow/>}/>
     <Route path='/reset_password/:id/:token' element={<ChangePassword/>}/>
     <Route path='/sendemail' element={<ForgotSendMail/>}/>
    
    
     
     
    </Routes>
       )
        
       }
        </>
      );
}

export default AppRoutes;

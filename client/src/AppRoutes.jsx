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
import UploadEpisodeForm from './pages/admin-part/UploadEpisods';
import TVShows from './pages/premiumPages/categories/AllTvShows';
import Footer from './pages/premiumPages/Footer';
import ManageProfiles from './header/profiles/ManageProfiles';
import SetProfile from './header/profiles/SetProfile';
import ParentalControll from './header/profiles/ParentalControll';
import Restrictions from './header/profiles/Restrictions';
import ViewRestrictions from './header/profiles/ViewRestrictions';

function AppRoutes({ role, active }) {
    return (
        <>
    
      
    
       {((role==="premium")&&active)?(
       
        <Routes>
        <Route path="/" element={<HomePagePremium />}>
          
          <Route path=":movieId" element={<MoviesDetails/>} />
          
          <Route path="funmovies" element={<FunMovies />} />
          <Route path="actionmovies" element={<ActionMovies />} />
          <Route path="hindimovies" element={<HindiMovies />} />
          <Route path="thamilmovies" element={<ThamilMovies />} />
    
        </Route>
        <Route path='/movieplayer/:movieId' element={ <MoviePlayer/>}/>
        <Route path='/uploadmovies' element={ <MovieUploadForm/>}/>
        <Route path='/uploadtvshows' element={ <UploadTVShowForm/>}/>
        <Route path='/uploadepisods' element={ <UploadEpisodeForm/>}/>
        <Route path='/search' element={ <SearchResults/>}/>
        <Route path='/alltvshows' element={ <TVShows/>}/>
        <Route path='/manageprofile' element={ <ManageProfiles/>}>
        
        <Route path='addprofile' element={<SetProfile/>}/>
        <Route path='parentalprofile' element={<ParentalControll/>}/>
        </Route>
        <Route path='/restrictions/:profileId' element={<Restrictions/>}></Route>
        <Route path='/viewrestrictions' element={<ViewRestrictions/>}></Route>
        
        
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
       <Footer/>
        </>
      );
}

export default AppRoutes;

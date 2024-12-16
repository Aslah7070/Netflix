import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPages/LoginPage';
import SignUpPage from './pages/registration/SignUpPage';
import Registration from './pages/registration/Registration';
import NavBar from './header/NavBar';
import VerifyEmail from './pages/registration/VerifyEmail';
import PlanComponent from './pages/premiumPages/PlanComponent';
import PremiumComponent from './pages/premiumPages/PremiumComponent';
import UpgredOnUs from './pages/premiumPages/UpgredOnUs';
import PaymentPicker from './pages/premiumPages/PaymentPicker';
import Checkoutpayment from './pages/premiumPages/PaymentStripe';
import HomePagePremium from './pages/premiumPages/HomePagePremium';
import { useSelector } from 'react-redux';
import Success from './pages/premiumPages/Success';
import MoviesAndTvShows from './pages/premiumPages/MoviesAndTvShows';
import MySwiperComponent from './pages/premiumPages/MoviesAndTvShows';
import SouthIndian from './pages/premiumPages/SouthIndian';
import MyList from './pages/premiumPages/MyList';
import LoginWithOTP from './pages/LoginPages/LoginWithOTP';
import TrendingNow from './pages/TrendingNow';
import ChangePassword from './pages/LoginPages/ChangePassword';
import ForgotSendMail from './pages/LoginPages/ForgotSendMail';
import ShowHidePassword from './header/Test';
import IndianMovies from './pages/premiumPages/categories/IndianMovies';
import AdminMovieUpload from './pages/admin-part/UploadMovies';
import MovieUploadForm from './pages/admin-part/UploadMovies';
import FetchMovies from './pages/premiumPages/FetchMovies';

function App() {
  const location =useLocation()

  const role=useSelector((state)=>state.user.role)
  const active=useSelector((state)=>state.user.isLoggedIn)
  console.log("appRole",role);
  console.log("activeeeee",active);
  const {sessionId}=useParams()
  console.log("sessionId",sessionId);


  const excludedPaths = ["/", "/:sessionId", "/loginotp", "/login", "/premiumhome","/sendemail"];
  return (
    <>

      {!excludedPaths.includes(location.pathname) && <NavBar />}
     

   {((role==="premium"||sessionId)&&active)?(
    <Routes>
    <Route path='/' element={<HomePagePremium/>}/>
    <Route path='/indianmovies' element={<IndianMovies/>}/>
    <Route path='/fetchmovies' element={<FetchMovies/>}/>
   
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
 <Route path='/uploadmovies' element={ <MovieUploadForm/>}/>

 
 
</Routes>
   )
    
   }
    </>
  );
}

export default App;





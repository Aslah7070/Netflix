import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/registration/SignUpPage';
import Registration from './pages/registration/Registration';
import NavBar from './header/NavBar';
import VerifyEmail from './pages/registration/VerifyEmail';
import PlanComponent from './pages/registration/PlanComponent';
import PremiumComponent from './pages/registration/PremiumComponent';
import UpgredOnUs from './pages/registration/UpgredOnUs';
import PaymentPicker from './pages/registration/PaymentPicker';
import Checkoutpayment from './pages/registration/PaymentStripe';
import HomePagePremium from './pages/premiumPages/HomePagePremium';
import { useSelector } from 'react-redux';
import Success from './pages/registration/Success';
import MoviesAndTvShows from './pages/premiumPages/MoviesAndTvShows';
import MySwiperComponent from './pages/premiumPages/MoviesAndTvShows';
import SouthIndian from './pages/premiumPages/SouthIndian';
import MyList from './pages/premiumPages/MyList';
import LoginWithOTP from './pages/registration/LoginWithOTP';
import TrendingNow from './pages/TrendingNow';

function App() {
  const location =useLocation()

  const role=useSelector((state)=>state.user.role)
  const active=useSelector((state)=>state.user.isLoggedIn)
  console.log("appRole",role);
  console.log("activeeeee",active);
  const {sessionId}=useParams()
  console.log("sessionId",sessionId);
  
  return (
    <>
    {(location.pathname !== "/"&&location.pathname !== "/:sessionId"&&location.pathname!=="/loginotp"  && location.pathname !== "/login"&&location.pathname!=="/premiumhome") && <NavBar />}
    

 
   {((role==="premium"||sessionId)&&active)?(
    <Routes>
    <Route path='/' element={<HomePagePremium/>}/>
    {/* <Route path='/moviestvshows' element={<MySwiperComponent/>}/> */}
    {/* <Route path='/southindian' element={<SouthIndian/>}/> */}
    {/* <Route path='/mylist' element={<MyList/>}/> */}
   
        </Routes>
   ):(
 

<Routes>
 <Route path='/' element={<HomePage/>}/>
 {/* <Route path='/login' element={<LoginPage/>}>

 <Route path='/loginotp' element={<LoginWithOTP/>}/>
 
 </Route> */}

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
 
 
</Routes>
   )
    
   }
    </>
  );
}

export default App;





// // src/App.js
// import React from 'react';
// import { useTranslation } from 'react-i18next'; // Import the translation hook

// const App = () => {
//   const { t, i18n } = useTranslation(); // Access the translation function and i18n instance

//   // Function to change the language
//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang); // Change the language when a button is clicked
//   };

//   return (
//     <div>
//       <header>
//         <h1>{t('welcome')}</h1> {/* Display translated text */}
//         <p>{t('description')}</p> {/* Display translated description */}
        
//         {/* Language Switcher */}
//         <button onClick={() => handleLanguageChange('en')}>English</button>
//         <button onClick={() => handleLanguageChange('es')}>Español</button>
//         <button onClick={() => handleLanguageChange('fr')}>Français</button>
//       </header>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
  const location =useLocation()
  return (
    <>
    {(location.pathname !== "/" && location.pathname !== "/login") && <NavBar />}

 
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/verifyemail' element={<VerifyEmail/>}/>
      <Route path='/plancomponent' element={<PlanComponent/>}/>
      <Route path='/premiumslice' element={<PremiumComponent/>}/>
      <Route path='/UpgredOnUs' element={<UpgredOnUs/>}/>
      <Route path='/paymentpicker' element={<PaymentPicker/>}/>
    </Routes>
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

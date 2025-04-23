

import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './header/NavBar';
import AppRoutes from './AppRoutes';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';


function App() {
  const location = useLocation();
  const role = useSelector((state) => state.user.role);
  const active = useSelector((state) => state.user.isLoggedIn);
  console.log("active",active);
  console.log("role",role);
  

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
        <ToastContainer/>
    </>
  );
}

export default App;




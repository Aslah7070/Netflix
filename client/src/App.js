

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




import React, { useRef, useEffect } from 'react';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import IdeaEditor from "./Pages/IdeaEditor";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";
import Idea from "./Pages/Idea";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoadingBarProvider } from './Contexts/LoadingBarContext';
import { useLoadingBar } from './Hooks/useLoadingBar';
import { AuthContextProvider } from './Contexts/AuthContext';
import { useAuthContext } from './Hooks/useAuthContext';
import CompleteProfile from './Pages/CompleteProfile';

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <AuthContextProvider>
        <LoadingBarProvider>
          <AppContent />
        </LoadingBarProvider>
      </AuthContextProvider>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const noNavAndFooterRoutes = ["/signin", "/signup", "/completeprofile"];
  const shouldShowNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname) && !location.pathname.includes("ideaeditor");

  const noLoadingBar = ["/ideaeditor/p/2", "/ideaeditor/p/2"];

  const loadingBarRef = useLoadingBar();

  const userStatus = useAuthContext();

  useEffect(() => {
      if(!noLoadingBar.includes(location.pathname)) {
        loadingBarRef.current.continuousStart();
        setTimeout(() => {
            loadingBarRef.current.complete();
        }, 500);
      }

  }, [location.pathname]);

  // console.log(userStatus.user ? userStatus.user.profileCompleted : "")

  return (
    <div className="App">
      {shouldShowNavAndFooter && <Navbar />}
      <Routes>
        <Route exact path="/completeprofile" element={userStatus.isAuthenticated ? <CompleteProfile /> : <Navigate to="/" />} />
        <Route element={userStatus.isAuthenticated ? userStatus.user.profileCompleted ? <Outlet /> : <Navigate to="/completeprofile" replace/> : <Outlet />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/signin" element={!userStatus.isAuthenticated ? <SignIn /> : <Navigate to="/"/>} />
          <Route exact path="/signup" element={!userStatus.isAuthenticated ? <SignUp /> : <Navigate to="/"/>} />
          {location.pathname.includes("idea/") && <Route path="*" element={<Idea />} />}
          {location.pathname.includes("ideaeditor") && <Route path="*" element={userStatus.isAuthenticated ? <IdeaEditor /> : <Navigate to="/signin" />} />}
        </Route>
      </Routes>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
library.add(fab, fas, far)
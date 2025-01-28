import React, { useRef, useEffect } from 'react';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import IdeaEditor from "./Pages/IdeaEditor";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Idea from "./Pages/Idea";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoadingBarProvider, useLoadingBar } from './Contexts/LoadingBarContext';
import { AuthContextProvider } from './Contexts/AuthContext';

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

  const noNavAndFooterRoutes = ["/login", "/register"];
  const shouldShowNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname) && !location.pathname.includes("ideaeditor");

  const noLoadingBar = ["/ideaeditor/p/2", "/ideaeditor/p/2"];

  const loadingBarRef = useLoadingBar();

  useEffect(() => {
      if(!noLoadingBar.includes(location.pathname)) {
        loadingBarRef.current.continuousStart();
        setTimeout(() => {
            loadingBarRef.current.complete();
        }, 500);
      }

      // return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="App">
      {shouldShowNavAndFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        {location.pathname.includes("idea/") && <Route path="*" element={<Idea />} />}
        {location.pathname.includes("ideaeditor") && <Route path="*" element={<IdeaEditor />} />}
      </Routes>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
library.add(fab, fas, far)
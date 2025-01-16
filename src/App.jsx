import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import IdeaEditor from "./Pages/IdeaEditor";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Idea from "./Pages/Idea";

import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Routes where Navbar should not be shown
  const noNavAndFooterRoutes = ["/login", "/register"];

  // Check if current route matches the exclusion list
  const shouldShowNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname) && !location.pathname.includes("ideaeditor");

  return (
    <div className="App">
      {shouldShowNavAndFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        {location.pathname.includes("idea/") && <Route path="*" element={<Idea />} />}
        {location.pathname.includes("ideaeditor") && <Route path="*" element={<IdeaEditor />} />}
        {/* <Route exact path="/ideaeditor" element={<IdeaEditor />} /> */}
      </Routes>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
library.add(fab, fas, far)
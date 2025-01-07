import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import IdeaEditor from "./Pages/IdeaEditor";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

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
  const noNavAndFooterRoutes = ["/login", "/register", "/ideaeditor"];

  // Check if current route matches the exclusion list
  const shouldShowNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowNavAndFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/ideaeditor" element={<IdeaEditor />} />
      </Routes>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default App;

import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IdeaEditor from "./Pages/IdeaEditor";

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/ideaeditor" element={<IdeaEditor />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
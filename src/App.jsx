// import Hero from "./Hero";
// import Navbar from "./Navbar";
// import Description from "./Description";
// import Steps from "./Steps";
// import Footer from "./Footer";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Description from "../Components/Description";
import Steps from "../Components/Steps";
import Footer from "../Components/Footer";

const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <Hero />
            <Description />
            <Steps />
            <Footer />
        </div>
    )
}

export default Home;
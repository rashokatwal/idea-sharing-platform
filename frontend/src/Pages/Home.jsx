import Hero from "../Components/Hero";
import Description from "../Components/Description";
import Steps from "../Components/Steps";
// import Footer from "../Components/Footer";

const Home = () => {
    return (
        <div className="Home">
            {sessionStorage.clear('sessionIdea')}
            <Hero />
            <Description />
            <Steps />
        </div>
    )
}

export default Home;
import './css/hero.css';
const Hero = () => {
    return ( 
        <div className="hero-outer">
            <div className="hero-inner">
                <div className="hero-cover">
                    <h1 className="hero-main-headline">
                        Share Ideas,<br /> Spark Connections
                    </h1>
                    <h4 className="hero-sub-headline">
                        Collaborate with thinkers, creators, and doers to bring your ideas to life.
                    </h4>
                    <br />
                    <button className="primary-button">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Hero;
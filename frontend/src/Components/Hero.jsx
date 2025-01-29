import '../Styles/hero.css';
import { Link } from 'react-router-dom';

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
                    <Link to="/signin">
                        <button className="primary-button">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default Hero;
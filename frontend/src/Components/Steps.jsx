import '../Styles/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Steps = () => {
    return (
        <div className="steps-outer">
            <div className="steps-inner">
                <h2 className="steps-title">How It Works</h2>
                <p className="steps-paragraph">
                    Turning ideas into reality has never been easier! Our platform simplifies the process into four actionable steps designed to empower your creativity and foster collaboration. Whether you're an innovator, dreamer, or collaborator, this is the space where your ideas grow and thrive. Here's how:
                </p>
                <div className="steps-grid">
                    <div className="steps-grid-elements odd-element">
                        <img src="/src/Assets/sign-in.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                1. Sign Up
                            </h3>
                            <p className="steps-description-paragraph">
                                Create your account in seconds
                            </p>
                        </div>
                        <div className="arrow">
                            <img src="/src/Assets/arrow-right.png"/>
                        </div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div className="arrow">
                            <img src="/src/Assets/arrow-left.png"/>
                        </div>
                        <img src="/src/Assets/lightbulb.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                2. Share Ideas
                            </h3>
                            <p className="steps-description-paragraph">
                                Post your thoughts and concepts
                            </p>
                        </div>
                    </div>
                    <div className="steps-grid-elements odd-element">
                        <img src="/src/Assets/handshake.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                               3. Collaborate
                            </h3>
                            <p className="steps-description-paragraph">
                                Connect with like minded thinkers
                            </p>
                        </div>
                        <div className="arrow">
                            <img src="/src/Assets/arrow-right.png"/>
                        </div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div></div>
                        <img src="/src/Assets/rocket.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                4. Grow
                            </h3>
                            <p className="steps-description-paragraph">
                                Turn ideas into actionable plans
                            </p>
                        </div>
                    </div>
                </div>
                <div className="call-to-action-section">
                    <h5>
                        HEARD<br />ENOUGH? <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </h5>
                    <h2>
                        Get Started
                    </h2>
                    <Link to='/signin'>
                        <button className='right-arrow'>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Steps;
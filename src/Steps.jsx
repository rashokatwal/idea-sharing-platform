import './Styles/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Steps = () => {
    return (
        <div className="steps-outer">
            <div className="steps-inner">
                <h2 className="steps-title">How It Works</h2>
                <div className="steps-grid">
                    <div className="steps-grid-elements odd-element">
                        <img src="/src/assets/sign-in.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                1. Sign Up
                            </h3>
                            <p className="steps-description-paragraph">
                                Create your account in seconds
                            </p>
                        </div>
                        <div className="arrow">
                            <img src="/src/assets/arrow-right.png"/>
                        </div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div className="arrow">
                            <img src="/src/assets/arrow-left.png"/>
                        </div>
                        <img src="/src/assets/lightbulb.png"/>
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
                        <img src="/src/assets/handshake.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                               3. Collaborate
                            </h3>
                            <p className="steps-description-paragraph">
                                Connect with like minded thinkers
                            </p>
                        </div>
                        <div className="arrow">
                            <img src="/src/assets/arrow-right.png"/>
                        </div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div></div>
                        <img src="/src/assets/rocket.png"/>
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
                        HEARD<br />ENOUGH? <FontAwesomeIcon icon={faArrowRight} />
                    </h5>
                    <h2>
                        Get Started
                    </h2>
                    <button className="right-arrow">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Steps;
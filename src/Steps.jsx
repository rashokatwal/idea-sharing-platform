import './css/steps.css';

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
                                Sign Up
                            </h3>
                            <p className="steps-description-paragraph">
                                Create your account in seconds
                            </p>
                        </div>
                        <div></div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div></div>
                        <img src="/src/assets/lightbulb.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                Share Ideas
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
                                Collaborate
                            </h3>
                            <p className="steps-description-paragraph">
                                Connect with like minded thinkers
                            </p>
                        </div>
                        <div></div>
                    </div>
                    
                    <div className="steps-grid-elements even-element">
                        <div></div>
                        <img src="/src/assets/rocket.png"/>
                        <div className="steps-description">
                            <h3 className="steps-description-title">
                                Grow
                            </h3>
                            <p className="steps-description-paragraph">
                                Turn ideas into actionable plans
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Steps;
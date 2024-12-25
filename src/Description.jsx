import './css/description.css';

const Description = () => {
    return (
        <div className="description-outer">
            <div className="description-inner">
                <h2 className="description-title">Why Choose MindHop?</h2>
                <p className="description-paragraph">
                    Welcome to MindHop, a platform where ideas take shape and innovation begins. Share your thoughts, connect with like-minded individuals, and collaborate to bring your vision to life. Whether you're brainstorming, seeking feedback, or exploring new perspectives, MindHop is your space to create, grow, and inspire. Simple, inclusive, and designed to spark creativity—your next big idea starts here.
                </p>
                <div className="description-cards">
                    <div className="description-card">
                        <h3 className="description-card-title">Connect with Innovators</h3>
                        <p className="description-card-text">
                            MindHop connects you with people from all walks of life, fostering a sense of camaraderie and shared goals.
                        </p>
                    </div>
                    <div className="description-card">
                        <h3 className="description-card-title">Share Your Ideas</h3>
                        <p className="description-card-text">
                            MindHop connects you with people from all walks of life, fostering a sense of camaraderie and shared goals.
                        </p>
                    </div>
                    <div className="description-card">
                        <h3 className="description-card-title">Collaborate Effortlessly</h3>
                        <p className="description-card-text">
                            Discuss your ideas, brainstorm, and explore different perspectives with your team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;
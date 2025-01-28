import '../Styles/description.css';

const Description = () => {
    return (
        <div className="description-outer" id="description">
            <div className="description-inner">
                <h2 className="description-title">A Space for Thinkers and Doers</h2>
                <p className="description-paragraph">
                    Welcome to MindHop, a platform where ideas take shape and innovation begins. Share your thoughts, connect with like-minded individuals, and collaborate to bring your vision to life. Whether you're brainstorming, seeking feedback, or exploring new perspectives, MindHop is your space to create, grow, and inspire. Simple, inclusive, and designed to spark creativity—your next big idea starts here.
                </p>
                <div className="description-cards">
                    <div className="description-card network">
                        <h3 className="description-card-title">Connect with Innovators</h3>
                        <p className="description-card-text">
                            Connect with people from all walks of life, fostering a sense of camaraderie and shared goals.
                        </p>
                    </div>
                    <div className="description-card light-bulb">
                        <h3 className="description-card-title">Share Your Ideas</h3>
                        <p className="description-card-text">
                            Share your ideas, challenges, and aspirations with the world at large.
                        </p>
                    </div>
                    <div className="description-card collaboration">
                        <h3 className="description-card-title">Collaborate Effortlessly</h3>
                        <p className="description-card-text">
                            Discuss your ideas, brainstorm, and explore different perspectives with your team.
                        </p>
                    </div>
                </div>
                <p className="description-paragraph">
                    At MindHop, we believe that every great idea deserves to be shared. Our platform was created to bring thinkers, creators, and visionaries together, fostering a space where collaboration turns thoughts into reality. Whether you're brainstorming your next big project or looking for inspiration, MindHop is here to connect you with like-minded individuals and spark meaningful conversations.
                </p>
                {/* <p className="description-paragraph">
                    We aim to simplify the process of sharing ideas and collaborating with others. With intuitive tools, engaging discussions, and a supportive community, MindHop empowers you to explore innovative possibilities and make a real impact. Together, we can create, innovate, and inspire change.
                </p>
                <br /> */}
                {/* <p className="mission-statement">
                    "Our mission is to provide a platform that bridges creativity and collaboration,<br /> empowering individuals to share and grow their ideas."
                </p> */}
            </div>
        </div>
    )
}

export default Description;
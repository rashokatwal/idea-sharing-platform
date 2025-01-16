import '../Styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return(
        <div className="footer-outer">
            <div className="footer-inner">
                <img src="/src/Assets/logo.png" alt="logo" className="logo" style={{filter: 'invert(1)'}}/>
                <p className="footer-description">A platform for thinkers, creators, and innovators to share ideas, collaborate, and inspire change. Join us and make your vision a reality.</p>
                <div className="social-links">
                    <a href="/"><FontAwesomeIcon icon="fa-brands fa-instagram" /></a>
                    <a href="/"><FontAwesomeIcon icon="fa-brands fa-square-facebook" /></a>
                    <a href="/"><FontAwesomeIcon icon="fa-brands fa-linkedin" /></a>
                    <a href="/"><FontAwesomeIcon icon="fa-brands fa-twitter" /></a>
                </div>
                <div className="other-links">
                    <a href="/">Privacy & Policy</a>
                    <a href="/">FAQs</a>
                </div>
                <p className="copyright">Copyright © 2022 MindHop. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
import './css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faSquareFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return(
        <div className="footer-outer">
            <div className="footer-inner">
                <h2 className="logo">MindHop</h2>
                <p className="footer-description">A platform for thinkers, creators, and innovators to share ideas, collaborate, and inspire change. Join us and make your vision a reality.</p>
                <div className="social-links">
                    <a href="/"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="/"><FontAwesomeIcon icon={faSquareFacebook} /></a>
                    <a href="/"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="/"><FontAwesomeIcon icon={faXTwitter} /></a>
                </div>
                <div className="other-links">
                    <a href="/">Privacy & Policy</a>
                    <a href="/">FAQs</a>
                </div>
                
            </div>
        </div>
    )
}

export default Footer;
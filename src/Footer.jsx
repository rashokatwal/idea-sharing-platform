import './css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return(
        <div className="footer-outer">
            <div className="footer-inner">
                <h2 className="logo">MindHop</h2>
                <p className="footer-description">A platform for thinkers, creators, and innovators to share ideas, collaborate, and inspire change. Join us and make your vision a reality.</p>
                <div className="links">
                    <a href="/"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="/"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="/"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="/"><FontAwesomeIcon icon={faTwitter} /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
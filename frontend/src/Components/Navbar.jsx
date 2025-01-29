import '../Styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return ( 
        <div className="navbar-outer">
            <div className="navbar-inner">
                <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link>
                <div className="searchBar-outer">
                    <input type="text" className="searchBar" placeholder="Search for Ideas"/>
                    <button className="searchButton">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                    </button>
                </div>
                <ul className="navLinks">
                    <li className="initial-list"><Link to="/">Home</Link></li>
                    <li><a  onClick = {(e)=>{
                            e.preventDefault();
                            window.scrollTo({
                                top: document.querySelector("#description").offsetTop - 100,
                                behavior: "smooth",
                            });
                        }}>About</a>
                    </li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li>
                        <Link to="/signin">
                            <button className="primary-button">Sign In</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default Navbar;
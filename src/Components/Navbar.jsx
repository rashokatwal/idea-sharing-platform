import '../Styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import '../Assets/logo.png';
const Navbar = () => {
    return ( 
        <div className="navbar-outer">
            <div className="navbar-inner">
                <img src="/src/Assets/logo.png" alt="logo" className="logo" />
                {/* <h1 className="title">MindHop</h1> */}
                <div className="searchBar-outer">
                    <input type="text" className="searchBar" placeholder="Search for Ideas"/>
                    <button className="searchButton">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
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
                        <button className="primary-button">
                            Sign In
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default Navbar;
import '../Styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSignout } from '../Hooks/useSignout';
import { useAuthContext } from '../Hooks/useAuthContext';
const Navbar = () => {
    const { signout } = useSignout();
    const userStatus = useAuthContext();

    const handleSignout = () => {
        signout();
        window.location.href = '/';
    }

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
                    {!userStatus.isAuthenticated && (
                        <div>
                            <li>
                                <Link to="/signin">
                                    <button className="primary-button">Sign In</button>
                                </Link>
                            </li>
                        </div>
                    )}
                    {userStatus.isAuthenticated && (
                        <div style={{display: 'flex'}}>
                            <li style={{cursor: 'pointer'}}>
                                <FontAwesomeIcon icon="fa-regular fa-bell" />
                            </li>
                            <li style={{marginLeft: '20px'}}>
                                <img className="author-avatar" src='/src/Assets/default_user.png' onClick={handleSignout}/>
                            </li>
                            <li style={{marginLeft: '10px'}}>
                                <Link to="/ideaeditor">
                                    <button className="primary-button">Post Idea</button>
                                </Link>
                            </li>
                        </div>)}
                </ul>
            </div>
        </div>
    );
}
 
export default Navbar;
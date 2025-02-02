import { useState, useEffect, useRef } from 'react';
import '../Styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSignout } from '../Hooks/useSignout';
import { useAuthContext } from '../Hooks/useAuthContext';
const Navbar = () => {
    const { signout } = useSignout();
    const userStatus = useAuthContext();
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

    const dropdownRef = useRef(null);

    const handleSignout = () => {
        signout();
        window.location.href = '/';
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

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
                            <li style={{marginLeft: '20px', position: 'relative'}}>
                                <img className="author-avatar" src='/src/Assets/default_user.png' onClick={() => setIsDropdownOpen(true)}/>
                                <div className="dropdown-navbar" ref={dropdownRef} style={{display: isDropdownOpen ? 'block' : 'none'}}>    
                                    <div className='user-details'>
                                        <img className="author-avatar" src='/src/Assets/default_user.png' style={{height: '40px', width: '40px'}}/>
                                        <div style={{marginLeft: '10px'}}>
                                            <p style={{margin: '0', fontWeight: '600'}}>Rashok Katwal</p>
                                            <p style={{margin: '0', fontSize: '13px'}}>@rashokatwal</p>
                                        </div>
                                    </div>     
                                    <ul className="dropdown-list">
                                        <li className="dropdown-item"><FontAwesomeIcon icon="fa-regular fa-lightbulb" className='icon'/><span className='text'>My Ideas</span></li>
                                        <li className="dropdown-item"><FontAwesomeIcon icon="fa-regular fa-bookmark" className='icon'/><span className='text'>Saved Ideas</span></li>
                                        <li className="dropdown-item"><FontAwesomeIcon icon="fa-regular fa-handshake" className='icon'/><span className='text'>Collaborations</span></li>
                                        <li className="dropdown-item"><FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" className='icon'/><span className='text'>Theme</span></li>
                                        <li className="dropdown-item" onClick={handleSignout}><FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" className='icon'/><span className='text'>Sign Out</span></li>
                                    </ul>
                                </div>
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
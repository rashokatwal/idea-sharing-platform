import { useAuthContext } from "../Hooks/useAuthContext";
import "../Styles/profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMediaIcons } from "../Helpers/constants";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation } from "react-router-dom";
import api from "../Helpers/api";
import { useEffect, useState, useRef } from "react";
import Popup from 'reactjs-popup';

const Profile = () => {
    const location = useLocation();
    const username = location.pathname.split('/').pop();
    const userStatus = useAuthContext();
    const [ user, setUser ] = useState(null);
    const [ editable, setEditable ] = useState(null);
    const [ activeTab, setActiveTab ] = useState("about");
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    
    const dropdownRef = useRef(null);

    const fetchUserDetails = async () => {
        console.log(username);
        await api
         .get(`/user/${username}`)
         .then((response) => {
            console.log(response.data.socialLinks);
            setUser(response.data);
         })
         .catch((error) => console.log(error));
    }

    // useEffect(() => {

    // }, [location.pathname]);

    useEffect(() => {
        if (userStatus.user != null) {
            if (username === userStatus.user?.username) {
                setUser(userStatus.user);
                setEditable(true);
                console.log(userStatus.user);
            }
            else {
                fetchUserDetails();
                setEditable(false);
            }
        }
    }, [userStatus, location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const handleTabSelection = (tab) => {
        console.log("tab");
        setActiveTab(tab);
    }

    return (
        <div className="profile-section-outer">
            <div className="profile-section-inner">
                <div className="left-section">
                    <img className="profile-image" src={ user?.profileImage || '../src/Assets/default_user.png'} alt="Profile Picture" />
                    <div className="user-previous-works">
                        <div className="section-header">
                            <span className="header-text">WORKS</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="previous-works-list">
                            {editable ? <button className="secondary-button" style={{border: "none"}}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Works</button> : <span className="empty-message">Works Not Listed</span>}
                        </div>
                    </div>

                    <div className="user-skills">
                        <div className="section-header">
                            <span className="header-text">SKILLS</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="skills-list">
                            {editable ? <button className="secondary-button" style={{border: "none"}}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Skills</button> : <span className="empty-message">Skills Not Listed</span>}
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="profile-options">
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" size="lg" onClick={() => setIsDropdownOpen(true)}/>
                        <div className="dropdown" ref={dropdownRef} style={{display: isDropdownOpen ? 'block' : 'none'}}>
                            <ul className="dropdown-list">
                                {/* <li className="dropdown-item">Edit Profile</li> */}
                                <EditProfile userDetails={user}/>
                                <li className="dropdown-item">Copy Profile Link</li>
                                <li className="dropdown-item report">Report User</li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="fullname">{user?.fullname || <Skeleton width={"200px"}/>}</h2>
                    <p className="username">{user?.username || <Skeleton width={"100px"}/>}</p>
                    <p className="bio">{user?.bio != "" ? user?.bio || <Skeleton count={3} width={"500px"} /> : ""}</p>
                    <span className="state-country"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> Kathmandu, Nepal</span>
                    <button className="primary-button send-message-button"><FontAwesomeIcon icon="fa-solid fa-message" /> Send Message</button>
                    <div className="profile-tabs">
                        <div className="tabs-header">
                            <div className={`header-elements ${activeTab == "about" ? "active" : ""}`} onClick={() => handleTabSelection("about")}><FontAwesomeIcon icon="fa-solid fa-user" /> About</div>
                            <div className={`header-elements ${activeTab == "ideas" ? "active" : ""}`} onClick={() => handleTabSelection("ideas")}><FontAwesomeIcon icon="fa-solid fa-lightbulb" /> Ideas</div>
                        </div>
                        <span className="header-horizontal-line">
                            <span className="tab-indicator" style={{transform: activeTab == "about" ? "" : "translateX(150%)"}}></span>
                        </span>
                        {/* <div className="tabs-body"> */}
                            <div className="about-tab" style={{display: activeTab == "about" ? "block" : "none"}}>
                                <div className="section-header">
                                    <span className="header-text">CONTACT INFORMATION</span>
                                </div>
                                <div className="about-content">
                                    <span className="field">Email:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user?.email || <Skeleton />}</span>
                                </div>
                                {user?.address == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Address:</span><span className="value">{user?.address || <Skeleton />}</span>
                                    </div>
                                    || <Skeleton width={"100px"}/>
                                }
                                {user?.phoneNumber == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Phone:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user?.phoneNumber || <Skeleton />}</span>
                                    </div>
                                    || <Skeleton width={"100px"}/>
                                }
                                {user?.portfolio == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Website:</span><a href={user?.portfolio} target="_blank" className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user?.portfolio || <Skeleton />}</a>
                                    </div>
                                    || <Skeleton width={"100px"}/>
                                }
                                <div className="section-header">
                                    <span className="header-text">BASIC INFORMATION</span>
                                </div>
                                <div className="about-content">
                                    <span className="field">Birthday:</span><span className="value">{new Date(user?.dob).toDateString() || <Skeleton />}</span>
                                </div>
                                <div className="section-header">
                                    <span className="header-text">SOCIAL LINKS</span>
                                </div>
                                <div className="about-content">
                                    {user ? 
                                        user.socialLinks != null ?
                                            Object.keys(user.socialLinks).map((platform, index) => {
                                                const socialLink = user.socialLinks[platform];
                                                return socialLink == "" ? 
                                                    null : 
                                                    <div key={index} className="social-link">
                                                        <a href={socialLink} target="_blank" style={{cursor: "pointer", color: "var(--accent-color)"}}>
                                                            <FontAwesomeIcon  className="social-link-icon" icon={`fa-brands ${socialMediaIcons[platform]}`} size="lg"/>
                                                        </a>
                                                    </div>
                                            })
                                            : <span className="empty-message">No Social Links</span>
                                        : <Skeleton count={4} height={"25px" }width={"25px"} inline={true} style={{marginRight: "15px"}}/>
                                    }
                                </div>
                            </div>
                            <div className="ideas-tab" style={{display: activeTab == "ideas" ? "block" : "none"}}>
                                <div className="section-header">
                                    <span className="header-text">IDEAS</span>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

const EditProfile = ({userDetails}) => {

    return (
        <Popup trigger={<li className="dropdown-item">Edit Profile</li>}
            modal 
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            <h3 className="header">Edit Profile</h3>
            <div className="edit-profile">
                <p>Full Name</p>
                <input value={userDetails.fullname} type="text" placeholder="Full Name" />
                <p>Email</p>
                <input value={userDetails.email} type="email" placeholder="Email" />
                <p>Bio</p>
                <textarea value={userDetails.bio} style={{height: "150px", marginBottom: "10px"}}></textarea>
                <p>Phone Number</p>
                <input value={userDetails.phoneNumber} type="number" placeholder="Phone Number" />
                <p>Address</p>
                <input value={userDetails.address} type="text" placeholder="Address" />
                <p>Portfolio</p>
                <input value={userDetails.portfolio} type="text" placeholder="Portfolio" />
            </div>
            <div className="bottom-buttons">
                <button className="primary-button">Save</button>
                <button className="secondary-button" style={{border: "none"}}>Close</button>
            </div>
        </Popup>
    )
};
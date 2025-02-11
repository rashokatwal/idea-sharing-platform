import { useAuthContext } from "../Hooks/useAuthContext";
import "../Styles/profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
    const userStatus = useAuthContext();
    const user = userStatus.user;

    return (
        <div className="profile-section-outer">
            <div className="profile-section-inner">
                <div className="left-section">
                    <img className="profile-image" src={user.profileImage || './src/Assets/default_user.png'} alt="Profile Picture" />
                    <div className="user-previous-works">
                        <div className="section-header">
                            <span className="header-text">WORK</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="previous-works-list">

                        </div>
                    </div>

                    <div className="user-skills">
                        <div className="section-header">
                            <span className="header-text">SKILLS</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="skills-list">
                            
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <h2 className="fullname">{user.fullname}</h2>
                    <p className="username">{user.username}</p>
                    <p className="bio">{user.bio}</p>
                    <span className="state-country"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> Kathmandu, Nepal</span>
                    <div className="profile-tabs">
                        <div className="tabs-header">
                            <span className="header-elements"><FontAwesomeIcon icon="fa-solid fa-user" /> About</span>
                            <span className="header-elements"><FontAwesomeIcon icon="fa-solid fa-lightbulb" /> Ideas</span>
                        </div>
                        <span className="header-horizontal-line">
                            <span className="tab-indicator"></span>
                        </span>
                        <div className="tabs-body">
                            <div className="about-tab">
                                <div className="section-header">
                                    <span className="header-text">CONTACT INFORMATION</span>
                                </div>
                                <div className="about-content">
                                    <span className="field">Email:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user.email}</span>
                                </div>
                                {user.address == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Address:</span><span className="value">{user.address}</span>
                                    </div>
                                }
                                {user.phoneNumber == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Phone:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user.phoneNumber}</span>
                                    </div>
                                }
                                {user.portfolio == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Website:</span><a href={user.portfolio} target="_blank" className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user.portfolio}</a>
                                    </div>
                                }
                                <div className="section-header">
                                    <span className="header-text">BASIC INFORMATION</span>
                                </div>
                                <div className="about-content">
                                    <span className="field">Birthday:</span><span className="value">{new Date(user.dob).toDateString()}</span>
                                </div>
                                <div className="section-header">
                                    <span className="header-text">SOCIAL LINKS</span>
                                </div>
                                <div className="about-content">
                                    <p>Date of Birth: {new Date(user.dob).toDateString()}</p>
                                </div>
                            </div>
                            <div className="ideas-tab"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
import { useAuthContext } from "../Hooks/useAuthContext";
import "../Styles/profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMediaIcons } from "../Helpers/constants";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Profile = () => {
    const userStatus = useAuthContext();
    const user = userStatus.user;

    return (
        <div className="profile-section-outer">
            <div className="profile-section-inner">
                <div className="left-section">
                    <img className="profile-image" src={ user ? user.profileImage : './src/Assets/default_user.png'} alt="Profile Picture" />
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
                    <h2 className="fullname">{user ? user.fullname : <Skeleton />}</h2> 
                    <p className="username">{user ? user.username : <Skeleton />}</p>
                    <p className="bio">{user ? user.bio : <Skeleton count={3}/>}</p>
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
                                    <span className="field">Email:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user ? user.email : <Skeleton />}</span>
                                </div>
                                {user ? user.address == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Address:</span><span className="value">{user ? user.address : <Skeleton />}</span>
                                    </div>
                                    : <Skeleton count={2} inline={true} width={"100px"}/>
                                }
                                {user ? user.phoneNumber == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Phone:</span><span className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user ? user.phoneNumber : <Skeleton />}</span>
                                    </div>
                                    : <Skeleton count={2} inline={true} width={"100px"}/>
                                }
                                {user ? user.portfolio == "" ? 
                                    null : 
                                    <div className="about-content">
                                        <span className="field">Website:</span><a href={user.portfolio} target="_blank" className="value" style={{cursor: "pointer", color: "var(--accent-color)"}}>{user ? user.portfolio : <Skeleton />}</a>
                                    </div>
                                    : <Skeleton count={2} inline={true} width={"100px"}/>
                                }
                                <div className="section-header">
                                    <span className="header-text">BASIC INFORMATION</span>
                                </div>
                                <div className="about-content">
                                    <span className="field">Birthday:</span><span className="value">{user ? new Date(user.dob).toDateString() : <Skeleton />}</span>
                                </div>
                                <div className="section-header">
                                    <span className="header-text">SOCIAL LINKS</span>
                                </div>
                                <div className="about-content">
                                    {user ? Object.keys(user.socialLinks).map((platform, index) => {
                                        const socialLink = user.socialLinks[platform];
                                        return socialLink == "" ? 
                                            null : 
                                            <div key={index} className="social-link">
                                                <a href={socialLink} target="_blank" style={{cursor: "pointer", color: "var(--accent-color)"}}>
                                                    <FontAwesomeIcon  className="social-link-icon" icon={`fa-brands ${socialMediaIcons[platform]}`} size="lg"/>
                                                </a>
                                            </div>
                                    })
                                : <Skeleton count={5} height={"15px" }width={"15px"} inline={true}/>}
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
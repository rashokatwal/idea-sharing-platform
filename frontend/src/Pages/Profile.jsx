import { useAuthContext } from "../Hooks/useAuthContext";
import "../Styles/profile.css";

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
                            <span className="header-text">Works</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="previous-works-list">

                        </div>
                    </div>

                    <div className="user-skills">
                        <div className="section-header">
                            <span className="header-text">Skills</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="skills-list">
                            
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <h2 className="user-fullname">{user.fullname}</h2>
                    <p className="user-username">{user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;
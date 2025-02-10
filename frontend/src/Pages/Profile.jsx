import { useAuthContext } from "../Hooks/useAuthContext";


const Profile = () => {
    const userStatus = useAuthContext();
    const user = userStatus.user;

    return (
        <div className="profile-outer">
            <div className="profile-inner">
                <div className="left-section">
                    <img className="profile-image" src={user ? user.profileImage : './src/Assets/default_user.png'} alt="Profile Picture" />
                    <div className="user-basic-details">
                        
                    </div>
                </div>
                <div className="right-section">
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;
import { useAuthContext } from "../Hooks/useAuthContext";


const Profile = () => {
    const userStatus = useAuthContext();
    const user = userStatus.user;

    return (
        <div className="profile-outer">
            <div className="profile-inner">
                <img className="profile-image" src={user.profileImage || './src/Assets/default_user.png'} alt="Profile Picture" />
                <div className="user-basic-details">
                    <h2 className="user-fullname">{user.fullname}</h2>
                    <p className="user-username">@{user.username}</p>
                    <p className="user-bio">{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;
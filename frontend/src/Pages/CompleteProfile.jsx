import '../Styles/completeprofile.css';

const CompleteProfile = () => {
    return (
        <div className="complete-profile-outer">
            <div className="complete-profile-inner">
                <h1 className="header-title">Complete Your Profile</h1>
                <p className="header-subtitle">Please complete your profile information to start using the platform.</p>

                <form className="complete-profile-form">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" required/>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" required/>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="text" id="dob" name="dob" required/>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" required/>
                </form>
            </div>
        </div>
    )
}

export default CompleteProfile;
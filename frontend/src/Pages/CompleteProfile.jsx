import '../Styles/completeprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompleteProfile = () => {
    return (
        <div className="complete-profile-outer">
            <div className="complete-profile-inner">
                <h1 className="header-title">Complete Your Profile</h1>
                <p className="header-subtitle">Please complete your profile information to start using the platform.</p>
                <StepOne />
            </div>
        </div>
    )
}

const StepOne = () => {
    return (
        <div className="step-one steps">
            <h3 className='step-header'>
                Step 1: Set up your profile
            </h3>
            <div className='step-main'>
                <div className='upload-profile-pic'>
                    <FontAwesomeIcon icon="fa-solid fa-plus" size='2x'color='white'/>
                </div>
                <p style={{margin: "30px 0px", fontWeight: '500'}}>Upload Profile Photo</p>
                <input className='user-fullname' type='text' placeholder="John Doe"/>
                <input className='user-username' type='text' placeholder="@johndoe"/>
                <textarea className='user-bio' placeholder='Bio' />
            </div>
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}}>Continue</button>
            </div>
        </div>
    )
}

export default CompleteProfile;
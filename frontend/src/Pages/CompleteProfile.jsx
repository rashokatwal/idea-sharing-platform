import { useState } from 'react';
import '../Styles/completeprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompleteProfile = () => {
    const [ step, setStep ] = useState(1);

    return (
        <div className="complete-profile-outer">
            <div className="complete-profile-inner">
                <h1 className="header-title">Complete Your Profile</h1>
                <p className="header-subtitle">Please complete your profile information to start using the platform.</p>
                {step === 1 && <StepOne setStep={setStep}/>}
                {step === 2 && <StepTwo setStep={setStep} />}
                {step === 3 && <StepThree setStep={setStep} />}
            </div>
        </div>
    )
}

const StepOne = ({ setStep }) => {
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
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => setStep(2)}>Continue</button>
            </div>
        </div>
    )
}

const StepTwo = ({ setStep }) => {
    return (
        <div className="step-two steps">
            <h3 className='step-header'>
                Step 2: Additional Information
            </h3>
            <div className='step-main'>
                <div className="step-two-form steps-forms">
                    <div className='email'>
                        <label>Email</label>
                        <div className='user-email-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-envelope" />
                            <input className='user-email' type='text'/>
                        </div>
                    </div>
                    <div className='phone-number-dob'>
                        <div className='phone-number'>
                            <label>Phone Number</label>
                            <div className='user-phone-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-solid fa-phone" />
                                <input className='user-phone' type='text'/>
                            </div>
                        </div>
                        <div className='dob'>
                            <label>Date of Birth</label>
                            <div className='user-dob-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                                <input className='user-dob' type='text'/>
                            </div>
                        </div>
                    </div>
                    <div className="address">
                        <label>Address</label>
                        <div className='user-address-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                            <input className='user-address' type='text'/>
                        </div>
                    </div>
                    <div className="website">
                        <label>Portfolio or Website</label>
                        <div className='user-website-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-globe" />
                            <input className='user-website' type='text'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => setStep(1)}>Go Back</button>
                <div>
                    <button className='primary-button' style={{fontSize: '16px'}} onClick={() => setStep(3)}>Continue</button>
                    <button className='secondary-button' style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => setStep(3)}>Skip</button>
                </div>
            </div>
        </div>
    )
}

const StepThree = ({ setStep }) => {
    return (
        <div className="step-two steps">
            <h3 className='step-header'>
                Step 3: Social Links
            </h3>
            <div className='step-main'>
                <div className="step-three-form steps-forms">
                    <div className="instagram">
                        <label>Instagram</label>
                        <div className='user-instagram-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            <input className='user-instagram' type='text'/>
                        </div>
                    </div>
                    <div className='linkedin'>
                        <label>LinkedIn</label>
                        <div className='user-linkedin-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                            <input className='user-linkedin' type='text'/>
                        </div>
                    </div>
                    <div className="twitter">
                        <label>X (Twitter)</label>
                        <div className='user-twitter-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                            <input className='user-twitter' type='text'/>
                        </div>
                    </div>
                    <div className="github">
                        <label>Github</label>
                        <div className='user-github-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-brands fa-github" />
                            <input className='user-github' type='text'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => setStep(2)}>Go Back</button>
                <div>
                    <button className='primary-button' style={{fontSize: '16px'}} onClick={() => setStep(3)}>Continue</button>
                    <button className='secondary-button' style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => setStep(3)}>Skip</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile;
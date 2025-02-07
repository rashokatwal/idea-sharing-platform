import { useState, useRef, useContext } from 'react';
import '../Styles/completeprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { AuthContext } from '../Contexts/AuthContext';
// import { LoadingBarContext } from '../Contexts/LoadingBarContext';
import { useLoadingBar } from '../Hooks/useLoadingBar';
import { useAuthContext } from '../Hooks/useAuthContext';
import api from '../Helpers/api';
import { useSignout } from '../Hooks/useSignout';

const CompleteProfile = () => {
    const [ step, setStep ] = useState(1);
    const stepOneRef = useRef(null);
    const stepTwoRef = useRef(null);
    const stepThreeRef = useRef(null);
    const references = [stepOneRef, stepTwoRef, stepThreeRef]
    // console.log(references[1]);
    const nodeRef = references[step - 1];
    const {signout} = useSignout();
    // let email = useContext(AuthContext).user.email;
    // const [ userDetails, setUserDetails ] = useState({
    //     profilePhoto: '',
    //     fullname: '',
    //     username: '',
    //     bio: '',
    //     email: email,
    //     phoneNumber: '',
    //     dob: '',
    //     address: '',
    //     portfolio: '',
    //     socialLinks: {
    //         instagram: '',
    //         twitter: '',
    //         linkedin: '',
    //         github: ''
    //     }
    // });
    const sessionUserDetails = JSON.parse(localStorage.getItem("user")) || null;
    const steps = [<StepOne setStep={setStep} sessionUserDetails={sessionUserDetails} />, <StepTwo setStep={setStep} sessionUserDetails={sessionUserDetails}/>, <StepThree setStep={setStep} sessionUserDetails={sessionUserDetails} />]
    // const [ slideDirection, setSlideDirection ] = useState("slide");

    // const nextStep = (step) => {
    //     setSlideDirection("forward");
    //     setStep(step);
    // };

    // const prevStep = (step) => {
    //     setSlideDirection("backward");
    //     setStep(step);
    // };

    const handleSignout = async () => {
        signout();
        window.location.href = '/';
    }

    return (
        <div className="complete-profile-outer">
            <div className="complete-profile-inner">
                <div className="header">
                    <div className="header-texts">
                        <h1 className="header-title">Complete Your Profile</h1>
                        <p className="header-subtitle">
                            Please complete your profile information to start using the platform.
                        </p>
                        <p style={{fontSize: '15px', opacity: '0.5'}}>(Following information will be shown on your profile.)</p>
                    </div>
                    <div className="header-button" onClick={() => handleSignout()}>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" size='lg'/>
                        <span>Sign Out</span>
                    </div>
                </div>
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        key={step}
                        timeout={3000}
                        nodeRef={nodeRef}
                        addEndListener={(done) => {
                            nodeRef.current.addEventListener("transitionend", done, false);
                        }}
                        classNames="slide"
                    >
                        <div ref={nodeRef}>
                            {/* {step === 1 && <StepOne setStep={setStep}/>}
                            {step === 2 && <StepTwo setStep={setStep} />}
                            {step === 3 && <StepThree setStep={setStep} />} */}
                            {steps[step - 1]}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                {/* <div className='next-prev-buttons'>
                    <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => prevStep()}>Go Back</button>
                    <div>
                        <button className='primary-button' style={{fontSize: '16px'}} onClick={() => nextStep()}>Continue</button>
                        <button className='secondary-button' style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => nextStep()}>Skip</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

const StepOne = ({ setStep, sessionUserDetails }) => {
    const userStatus = useAuthContext();
    const userDetails = userStatus.user;
    // console.log(userDetails);
    const loadingBarRef = useLoadingBar();
    const imageInputRef = useRef(null);
    const { dispatch } = useAuthContext();
    const [ image, setImage ] = useState('');
    const [ error, setError ] = useState('');
    const [ fullname, setFullname ] = useState({
        value: userDetails.fullname,
        valid:  userDetails.fullname.trim().length > 0,
        outline: "solid 2px rgba(0, 0, 0, 0.2)",
    })
    const [ username, setUsername ] = useState({
        value:  userDetails.username,
        valid: userDetails.username.trim().length > 0,
        outline: "solid 2px rgba(0, 0, 0, 0.2)",
    })
    // const [ bio, setBio ] = useState({
    //     value: sessionUserDetails ? sessionUserDetails.bio : "",
    //     valid: sessionUserDetails ? sessionUserDetails.bio.trim().length > 0 : false,
    //     outline: "none",
    // })
    const [ bio, setBio ] = useState(userDetails.bio);
    const [ valid, setValid ] = useState(fullname.valid && username.valid);

    const handleFullname = (value) => {
        // const updatedDetails = { ...ideaDetails, title: value };
        // setIdeaDetails(updatedDetails);
        const isFullnameValid = value.trim().length > 0;
        setFullname({
            value: value,
            valid: isFullnameValid,
            outline: isFullnameValid ? "solid 2px rgba(0, 0, 0, 0.2)" : "red solid 2px",
        });

        const isValid = isFullnameValid && username.valid;
        setValid(isValid);
    };

    const handleUsername = (value) => {
        // const updatedDetails = { ...ideaDetails, title: value };
        // setIdeaDetails(updatedDetails);
        const isUsernameValid = value.trim().length > 0;
        setUsername({
            value: value,
            valid: isUsernameValid,
            outline: isUsernameValid ? "solid 2px rgba(0, 0, 0, 0.2)" : "red solid 2px",
        });

        const isValid = isUsernameValid && fullname.valid;
        setValid(isValid);
    };

    const handleBio = (value) => {
        // const updatedDetails = { ...ideaDetails, title: value };
        // setIdeaDetails(updatedDetails);
        // const isBioValid = value.trim().length > 0;
        // setBio({
        //     value: value,
        //     valid: isBioValid,
        //     outline: isBioValid ? "none" : "red solid 2px",
        // });
        setBio(value);

        // const isValid = isBioValid && fullname.valid && username.valid;
        // setValid(isValid);
    };

    const handleDivClick = () => {
        imageInputRef.current.click();
    }

    const handlePictureUpload = (file) => {
        console.log(file);
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
    }

    // const handleDescription = (value) => {
    //     // const updatedDetails = { ...ideaDetails, description: value };
    //     // setIdeaDetails(updatedDetails);
    //     const isDescriptionValid = value.trim().length > 0;
    //     setDescriptionChars({
    //         value: value,
    //         valid: isDescriptionValid,
    //         outline: isDescriptionValid ? "none" : "red solid 2px",
    //     });

    //     const isValid = fullname.valid && username.valid && isDescriptionValid;
    //     setValid(isValid);
    // };

    const checkForChanges = () => {
        return image == userDetails.profileImage && fullname.value == userDetails.fullname && username.value == userDetails.username && bio == userDetails.bio ? false : true;
    }

    const handleStepOneSubmission = async() => {
        console.log("clidked");
        const isFullnameValid = fullname.value.trim().length > 0;
        const isUsernameValid = (username.value.trim().length > 0);
        // const isBioValid = bio.value.trim().length > 0;

        setFullname({...fullname, valid: isFullnameValid, outline: isFullnameValid ? "solid 2px rgba(0, 0, 0, 0.2)" : "red solid 2px" });
        setUsername({...username, valid: isUsernameValid, outline: isUsernameValid ? "solid 2px rgba(0, 0, 0, 0.2)" : "red solid 2px" });
        // setBio({...bio, valid: isBioValid, outline: isBioValid ? "none" : "red solid 2px" });
        setValid(isFullnameValid && isUsernameValid);
        valid ? await saveData() : null;
    }

    const saveData = async() => {
        // console.log("saved")
        loadingBarRef.current.continuousStart();
        if(checkForChanges()) {
            await api.patch(`/auth/updateUserDetails/${userDetails._id}`,
                {profileImage: image, fullname: fullname.value, username: username.value, bio: bio.value }
            )
            .then((response) => {
                sessionUserDetails = {...sessionUserDetails, ...response.data.updatedUserDetails};
                // console.log(response.data.updatedUserDetails);
                localStorage.setItem("user", JSON.stringify(sessionUserDetails));
                dispatch({type: "UPDATE_USER", payload: response.data.updatedUserDetails});
                // navigate('/ideaeditor/p/2');
                setTimeout(() =>{
                    loadingBarRef.current.complete();
                }, 1000);
                setStep(2);
            })
            .catch((error) => {
                // console.log(error.response.data);
                setError(error.response.data);
                loadingBarRef.current.complete();
            });
        } 
        else {
            loadingBarRef.current.complete();
            setStep(2);
        }
        // else {
            // if(checkForChanges()) {
            //     await api.patch(`/auth/updateUserDetails/${userStatus.user.userId}`,
            //         { fullname: fullname.value, username: username.value, bio: bio.value }
            //     )
            //     .then((response) => {
            //         let ideaDetails = response.data;
            //         ideaDetails.title = titleChars.value;
            //         ideaDetails.category = categoryChars.value;
            //         ideaDetails.description = descriptionChars.value;
            //         sessionStorage.setItem("sessionIdea", JSON.stringify(ideaDetails));
            //         // navigate('/ideaeditor/p/2');
            //         setStep(2);
            //         loadingBarRef.current.complete();
            //     })
            //     .catch((error) => console.log(error))
            // }
            // else{
                // navigate('/ideaeditor/p/2');
                // loadingBarRef.current.continuousStart();
                // setStep(2);
                // setTimeout(() =>{
                //     loadingBarRef.current.complete();
                // }, 500)
            // }
        // }
    }

    // const handleStepOneSubmission = () => {
    //     setStep(2);
    // }

    return (
        <div className="step-one steps">
            <h3 className='step-header'>
                Step 1: Set up your profile
            </h3>
            <div className='step-main'>
                <div className='image-section' style={{flex: '1 1'}}>
                    <img src="/src/Assets/complete-profile.png" alt="Profile Pic" style={{maxWidth: '100%'}}/>
                </div>
                <div className="form-section"  style={{flex: '1 1'}}>
                    <div className='upload-profile-pic' style={{background: image ? `url(${image})` : 'var(--accent-color)'}} onClick={() => handleDivClick()}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" size='2x'color='white'className='picture-add-icon'/>
                        <input ref={imageInputRef} type="file" className="input-pp" accept="image/*" onChange={(e) => handlePictureUpload(e.target.files[0])}/>
                    </div>
                    <p style={{margin: "20px 0px", fontWeight: '500', fontSize: '15px'}}>Upload Profile Photo</p>
                    <input className='user-fullname' value={fullname.value} type='text' placeholder="John Doe" style={{borderBottom: fullname.outline}} onChange={(e) => handleFullname(e.target.value)}/>
                    <input className='user-username' value={username.value} type='text' placeholder="@johndoe" style={{borderBottom: username.outline}} onChange={(e) => handleUsername(e.target.value)}/>
                    <p className="error" style={{padding: error ? '10px' : '0px'}}>{error}</p>
                    <textarea className='user-bio' value={bio} placeholder='Bio' style={{width: "100%", outline: bio.outline}} onChange={(e) => handleBio(e.target.value)}/>
                </div>
            </div>
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => handleStepOneSubmission()}>Continue</button>
            </div>
        </div>
    )
}

const StepTwo = ({ setStep, sessionUserDetails }) => {
    const userDetails = useAuthContext().user;
    // const userDetails = userStatus.user;
    const loadingBarRef = useLoadingBar();
    const { dispatch } = useAuthContext();
    // const [ email, setEmail ] = useState(userDetails.email);
    // const [ phoneNumber, setPhoneNumber ] = useState(userDetails.phoneNumber);
    // const [ dob, setDob ] = useState(userDetails.dob);
    // const [ address, setAddress ] = useState(userDetails.address);
    // const [ portfolio, setPortfolio ] = useState(userDetails.portfolio);
    const [ error, setError ] = useState("");
    const date = new Date(userDetails.dob);
    const dob = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log(dob);
    const [ userFormData, setUserFormData ] = useState({
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        dob: dob,
        address: userDetails.address,
        portfolio: userDetails.portfolio,
    })

    const handleFormChange = (field, value) => {
        // switch (field) {
        //     case "email":
        //         setEmail(value);
        //         break;
        //     case "phoneNumber":
        //         setPhoneNumber(value);
        //         break;
        //     case "dob":
        //         setDob(value);
        //         break;
        //     case "address":
        //         setAddress(value);
        //         break;
        //     case "portfolio":
        //         setPortfolio(value);
        //         break;
        //     default:
        //         break;
        // }
        setUserFormData({...userFormData, [field]: value });
    }

    const checkForChanges = () => {
        console.log(userFormData.dob);
        return userFormData.email == userDetails.email && userFormData.phoneNumber == userDetails.phoneNumber && userFormData.dob == dob && userFormData.address == userDetails.address && userFormData.portfolio == userDetails.portfolio ? false : true;
    }

    const handleStepTwoSubmission = async () => {
        loadingBarRef.current.continuousStart();
        if(checkForChanges()) {
            await api.patch(`/auth/updateUserDetails/${userDetails._id}`,
                userFormData
            )
            .then((response) => {
                sessionUserDetails = {...sessionUserDetails, ...response.data.updatedUserDetails};
                localStorage.setItem("user", JSON.stringify(sessionUserDetails));
                dispatch({type: "UPDATE_USER", payload: response.data.updatedUserDetails});
                setTimeout(() =>{
                    loadingBarRef.current.complete();
                }, 1000);
                setStep(3);
            })
            .catch((error) => {
                // console.log(error);
                setError(error.response.data);
                loadingBarRef.current.complete();
            });
        } 
        else {
            loadingBarRef.current.complete();
            setStep(3);
        }
    }

    return (
        <div className="step-two steps">
            <h3 className='step-header'>
                Step 2: Additional Information
            </h3>
            <div className='step-main'>
                <div className='image-section' style={{flex: '1 1'}}>
                    <img src="/src/Assets/complete-profile-step-2.png" alt="Profile Pic" style={{maxWidth: '100%'}}/>
                </div>
                <div className="form-section"  style={{flex: '1 1'}}>
                <div className="step-two-form steps-forms">
                    <div className='email'>
                        <label>Email</label>
                        <div className='user-email-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-envelope" />
                            <input className='user-email' value={userFormData.email} type='email' onChange={(e) => handleFormChange("email", e.target.value)}/>
                        </div>
                    </div>
                    <div className='phone-number-dob'>
                        <div className='phone-number'>
                            <label>Phone Number</label>
                            <div className='user-phone-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-solid fa-phone" />
                                <input className='user-phone' value={userFormData.phoneNumber} type='number' onChange={(e) => handleFormChange("phoneNumber", e.target.value)}/>
                            </div>
                        </div>
                        <div className='dob'>
                            <label>Date of Birth</label>
                            <div className='user-dob-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                                <input className='user-dob' value={userFormData.dob} type='date' onChange={(e) => handleFormChange("dob", e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="address">
                        <label>Address</label>
                        <div className='user-address-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                            <input className='user-address' value={userFormData.address} type='text' onChange={(e) => handleFormChange("address", e.target.value)}/>
                        </div>
                    </div>
                    <div className="website">
                        <label>Portfolio or Website</label>
                        <div className='user-website-outer input-wrapper'>
                            <FontAwesomeIcon icon="fa-solid fa-globe" />
                            <input className='user-website' value={userFormData.portfolio} type='text' onChange={(e) => handleFormChange("portfolio", e.target.value)}/>
                        </div>
                    </div>
                    <p className="error" style={{padding: error ? '10px' : '0px'}}>{error}</p>
                </div>
                </div>
            </div>
            {/* <div className='step-main'>
                
            </div> */}
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => setStep(1)}>Go Back</button>
                <div>
                    <button className='primary-button' style={{fontSize: '16px'}} onClick={() => handleStepTwoSubmission()}>Continue</button>
                    <button className='secondary-button' style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => setStep(3)}>Skip</button>
                </div>
            </div>
        </div>
    )
}

const StepThree = ({ setStep, sessionUserDetails }) => {
    const userDetails = useAuthContext().user;
    const loadingBarRef = useLoadingBar();
    const { dispatch } = useAuthContext();
    const [ socialLinks, setSocialLinks ] = useState({
        instagram: userDetails.socialLinks.instagram,
        linkedin: userDetails.socialLinks.linkedin,
        twitter: userDetails.socialLinks.twitter,
        github: userDetails.socialLinks.github,
    });

    const handleSocialLinksChange = (platform, value) => {
        setSocialLinks({...socialLinks, [platform]: value });
    }

    const checkForChanges = () => {
        // console.log(socialLinks.instagram == userDetails.socialLinks.instagram && socialLinks.linkedin == userDetails.socialLinks.linkedin && socialLinks.github == userDetails.socialLinks.github && socialLinks.twitter == userDetails.socialLinks.twitter)
        return socialLinks.instagram == userDetails.socialLinks.instagram && socialLinks.linkedin == userDetails.socialLinks.linkedin && socialLinks.github == userDetails.socialLinks.github && socialLinks.twitter == userDetails.socialLinks.twitter ? false : true;
    }

    const handleStepThreeSubmission = async () => {
        loadingBarRef.current.continuousStart();
        if(checkForChanges()) {
            await api.patch(`/auth/updateUserDetails/${userDetails._id}`,
                {socialLinks: socialLinks}
            )
            .then((response) => {
                sessionUserDetails = {...sessionUserDetails, ...response.data.updatedUserDetails};
                localStorage.setItem("user", JSON.stringify(sessionUserDetails));
                dispatch({type: "UPDATE_USER", payload: response.data.updatedUserDetails});
                setTimeout(() =>{
                    loadingBarRef.current.complete();
                }, 1000);
                // setStep(3);
            })
            .catch((error) => {
                // console.log(error);
                console.log(error);
                loadingBarRef.current.complete();
            });
        } 
        else {
            loadingBarRef.current.complete();
            // setStep(3);
        }
    }

    return (
        <div className="step-two steps">
            <h3 className='step-header'>
                Step 3: Social Links
            </h3>
            <div className='step-main'>
                <div className='image-section' style={{flex: '1 1'}}>
                    <img src="/src/Assets/complete-profile-step-3.png" alt="Profile Pic" style={{maxWidth: '100%', borderRadius: '20px'}}/>
                </div>
                <div className="form-section"  style={{flex: '1 1'}}>
                    <div className="step-three-form steps-forms">
                        <div className="instagram">
                            <label>Instagram</label>
                            <div className='user-instagram-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-brands fa-instagram" />
                                <input className='user-instagram' value={socialLinks.instagram} onChange={(e) => handleSocialLinksChange("instagram", e.target.value)} type='text'/>
                            </div>
                        </div>
                        <div className='linkedin'>
                            <label>LinkedIn</label>
                            <div className='user-linkedin-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                                <input className='user-linkedin' value={socialLinks.linkedin} onChange={(e) => handleSocialLinksChange("linkedin", e.target.value)} type='text'/>
                            </div>
                        </div>
                        <div className="twitter">
                            <label>X (Twitter)</label>
                            <div className='user-twitter-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                                <input className='user-twitter' value={socialLinks.twitter} onChange={(e) => handleSocialLinksChange("twitter", e.target.value)} type='text'/>
                            </div>
                        </div>
                        <div className="github">
                            <label>Github</label>
                            <div className='user-github-outer input-wrapper'>
                                <FontAwesomeIcon icon="fa-brands fa-github" />
                                <input className='user-github' value={socialLinks.github} onChange={(e) => handleSocialLinksChange("github", e.target.value)} type='text'/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='next-prev-buttons'>
                <button className='primary-button' style={{marginLeft: '-20px', fontSize: '16px'}} onClick={() => setStep(2)}>Go Back</button>
                <div>
                    <button className='primary-button' style={{fontSize: '16px'}} onClick={() => handleStepThreeSubmission()}>Continue</button>
                    <button className='secondary-button' style={{marginLeft: '10px', fontSize: '16px'}} onClick={() => setStep(3)}>Skip</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile;
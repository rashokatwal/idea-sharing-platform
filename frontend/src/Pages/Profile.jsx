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
import authUserRequest from '../Helpers/authRequestHandler'
import { useLoadingBar } from "../Hooks/useLoadingBar";
import Dropdown from "../Components/Dropdown";
import { useImageUpload } from "../Hooks/useImageUpload";
import { useUpdateUser } from "../Hooks/useUpdateUser";

const Profile = () => {
    const location = useLocation();
    const username = location.pathname.split('/').pop();
    const userStatus = useAuthContext();
    const [ user, setUser ] = useState(null);
    const [ editable, setEditable ] = useState(null);
    const [ activeTab, setActiveTab ] = useState("about");
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const loadingBarRef = useLoadingBar();
    const {dispatch} = useAuthContext();
    const {uploadImage} = useImageUpload();
    const {updateUser} = useUpdateUser()
    
    const dropdownRef = useRef(null);

    const changeImageRef = useRef(null);

    const fetchUserDetails = async () => {
        await api
         .get(`/user/${username}`)
         .then((response) => {
            setUser(response.data);
         })
         .catch((error) => console.log(error));
    }

    useEffect(() => {
        // if (userStatus.user != null) {
            if (username === userStatus.user?.username) {
                setUser(userStatus.user);
                setEditable(true);
            }
            else {
                fetchUserDetails();
                setEditable(false);
            }
        // }
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

    const handleDivClick = () => {
        changeImageRef.current.click();
    }

    const handleImageUpload = async (file) => {
        loadingBarRef.current.continuousStart();
        const res = await uploadImage(file, user._id);
        await updateUser("profileImage", res.data.secure_url);
        loadingBarRef.current.complete();
    }

    const handleWorkDelete = async (_id) => {
        loadingBarRef.current.continuousStart();
        let userWorks = user?.works;
        let updatedUserWorks = userWorks.filter((work) => {
            if (work._id != _id) {
                return work;
            }
        })

        await updateUser("works", updatedUserWorks);
        loadingBarRef.current.complete();
    }

    const handleSkillDelete = async (_id) => {
        loadingBarRef.current.continuousStart();
        let userSkills = user?.skills;
        let updatedUserSkills = userSkills.filter((skill) => {
            if (skill._id != _id) {
                return skill;
            }
        })

        await updateUser("skills", updatedUserSkills);
        loadingBarRef.current.complete();
    }

    const handleSocialLinkDelete = async (platform) => {
        loadingBarRef.current.continuousStart();
        let userSocialLinks = user?.socialLinks;
        delete userSocialLinks[platform];

        await updateUser("socialLinks", userSocialLinks);
        loadingBarRef.current.complete();
    }

    const getUserPosts = async () => {
        await authUserRequest
         .get(`/posts/${user.username}`)
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => console.log(error));
    }

    return (
        <div className="profile-section-outer">
            <div className="profile-section-inner">
                <div className="left-section">
                    <img className="profile-image" src={ user?.profileImage || '../src/Assets/default_user.png'} alt="Profile Picture" />
                    {editable && <div className="secondary-button" style={{border: "none", margin: "auto"}} onClick={handleDivClick}><FontAwesomeIcon icon="fa-regular fa-image"/> {user?.profileImage ? "Change" : "Upload"} Image <input ref={changeImageRef} type="file" style={{display: "none"}} onChange={(e) => handleImageUpload(e.target.files[0])}/></div>}
                    <div className="user-previous-works">
                        <div className="section-header">
                            <span className="header-text">WORKS</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="previous-works-list" style={{display: user?.works.length == 0 ? "flex" : "block"}}>
                            {user?.works.length > 0 ? 
                                    user?.works.map((work, index) => (
                                        <div key={index} className="work-item">
                                            <div>
                                                <h4 className="title">{work.title}</h4>
                                                <p className="description">{work.description}</p>
                                                <a className="link" href={work.link}>{work.link}</a>
                                            </div>
                                            {editable && <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{color: "rgb(248, 82, 82)", cursor: "pointer"}} onClick={() => handleWorkDelete(work._id)}/>}
                                        </div>
                                    )) :
                                    editable ? 
                                        <AddWork user={user} /> :
                                        <span className="empty-message">Works Not Listed</span>
                            }
                            {editable && user?.works.length > 0 && <div style={{position: "sticky", bottom: "0px", width: "100%", background: "var(--background-color)", paddingTop: "10px"}}>
                               <AddWork user={user}/>
                            </div>}
                        </div>
                    </div>

                    <div className="user-skills">
                        <div className="section-header">
                            <span className="header-text">SKILLS</span><span className="header-horizontal-line"></span>
                        </div>
                        <div className="skills-list" style={{display: user?.skills.length > 0 ? "block" : "flex"}}>
                            {user?.skills.length > 0 ? 
                                        user?.skills.map((skill, index) => (
                                            <div key={index} className="skill-item">
                                                <div>
                                                    <h4 className="name">{skill.name}</h4>
                                                    <p className="experience">{skill.experience}</p>
                                                </div>
                                                {editable && <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{color: "rgb(248, 82, 82)", cursor: "pointer"}} onClick={() => handleSkillDelete(skill._id)}/>}
                                            </div>
                                        )) :
                                        editable ? 
                                            <AddSkill user={user} /> :
                                            <span className="empty-message">Skills Not Listed</span>
                                }
                            {editable && user?.skills.length > 0 && <div style={{position: "sticky", bottom: "0px", width: "100%", background: "var(--background-color)", paddingTop: "10px"}}>
                                <AddSkill user={user}/>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="profile-options">
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" size="lg" onClick={() => setIsDropdownOpen(true)}/>
                        <div className="dropdown" ref={dropdownRef} style={{display: isDropdownOpen ? 'block' : 'none'}}>
                            <ul className="dropdown-list">
                                {editable && <EditProfile user={user} loadingBar={loadingBarRef}/>}
                                <li className="dropdown-item">Copy Profile Link</li>
                                <li className="dropdown-item report">Report User</li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="fullname">{user?.fullname || <Skeleton width={"200px"}/>}</h2>
                    <p className="username">{user?.username || <Skeleton width={"100px"}/>}</p>
                    <p className="bio">{user?.bio != "" ? user?.bio || <Skeleton count={3} width={"500px"} /> : ""}</p>
                    <span className="state-country"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> Kathmandu, Nepal</span>
                    {!editable && <button className="primary-button send-message-button"><FontAwesomeIcon icon="fa-solid fa-message" /> Send Message</button>}
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
                                <div className="about-content" style={{alignItems: "center"}}>
                                    {user ? 
                                        user.socialLinks != null ?
                                            Object.keys(user.socialLinks).map((platform, index) => {
                                                const socialLink = user.socialLinks[platform];
                                                return socialLink == "" ? 
                                                    null : 
                                                    <div key={index} className="social-link">
                                                        {editable && <FontAwesomeIcon icon="fa-solid fa-circle-xmark" className="remove-link-button" style={{color: "rgb(248, 82, 82)", cursor: "pointer"}} onClick={() => handleSocialLinkDelete(platform)}/>}
                                                        <a href={socialLink} target="_blank" style={{cursor: "pointer", color: "var(--accent-color)"}}>
                                                            <FontAwesomeIcon  className="social-link-icon" icon={`fa-brands ${socialMediaIcons[platform]}`} />
                                                        </a>
                                                    </div>
                                            })
                                            : editable ? <AddSocialLink user={user}/> : <span className="empty-message">No Social Links</span>
                                        : <Skeleton count={4} height={"25px" }width={"25px"} inline={true} style={{marginRight: "15px"}}/>
                                    }
                                    {editable && <AddSocialLink user={user}/>}
                                </div>
                            </div>
                            <div className="ideas-tab" style={{display: activeTab == "ideas" ? "block" : "none"}}>
                                <div className="section-header">
                                    <span className="header-text">IDEAS</span>
                                </div>
                                <div className="user-ideas-list">
                                    {
                                        user?.postedIdeas?.map((idea, index) => {
                                            return (
                                                <div key={index} className="idea-card">
                                                    <h5>{idea.title}</h5>
                                                    <p>{idea.description}</p>
                                                    <div className="idea-actions">
                                                        <button className="primary-button edit-button"><FontAwesomeIcon icon="fa-solid fa-edit" /> Edit</button>
                                                        <button className="primary-button delete-button"><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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

const EditProfile = ({user, loadingBar}) => {
    const [ userDetails, setUserDetails ] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        bio: user?.bio || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
        portfolio: user?.portfolio || "",
    })

    const [ emailError, setEmailError ] = useState("");

    const [ phoneError, setPhoneError ] = useState("");

    const {dispatch} = useAuthContext();

    const handleChanges = (field, value) => {
        setUserDetails({...userDetails, [field]: value });
    }

    const updateUserDetails = async (close) => {
        loadingBar.current.continuousStart();
        await authUserRequest.patch(`/auth/updateUserDetails/${user._id}`,
                        userDetails
                    )
                    .then((response) => {
                        let updatedUserDetails = {...user, ...response.data.updatedUserDetails}
                        localStorage.setItem("user", JSON.stringify(updatedUserDetails));
                        dispatch({type: "UPDATE_USER", payload: updatedUserDetails});
                        setEmailError("");
                        setPhoneError("");
                        loadingBar.current.complete();
                        close();
                    })
                    .catch((error) => {
                        if (error.response.data.includes('email')) {
                            setEmailError(error.response.data);
                        }
                        else if (error.response.data.includes('phone')) {
                            setPhoneError(error.response.data);
                        }
                        loadingBar.current.complete();
                    });
    }

    return (
        <Popup trigger={<li className="dropdown-item" onClick={() => {setEmailError("");setPhoneError("");}}>Edit Profile</li>}
            modal 
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            {(close) => (
                <div>
                    <h3 className="header">Edit Profile</h3>
                    <div className="edit-profile popup-form">
                        <p>Full Name</p>
                        <input value={userDetails?.fullname} type="text" placeholder="Full Name" onChange={(e) => handleChanges("fullname", e.target.value)}/>
                        <p>Email</p>
                        <input value={userDetails?.email} type="email" placeholder="Email" onChange={(e) => handleChanges("email", e.target.value)}/>
                        <p className="error" style={{padding: emailError ? '10px' : '0px'}}>{emailError}</p>
                        <p>Bio</p>
                        <textarea value={userDetails?.bio} style={{height: "150px", marginBottom: "10px"}} onChange={(e) => handleChanges("bio", e.target.value)}></textarea>
                        <p>Phone Number</p>
                        <input value={userDetails?.phoneNumber} type="number" placeholder="Phone Number" onChange={(e) => handleChanges("phoneNumber", e.target.value)}/>
                        <p className="error" style={{padding: phoneError ? '10px' : '0px'}}>{phoneError}</p>
                        <p>Address</p>
                        <input value={userDetails?.address} type="text" placeholder="Address" onChange={(e) => handleChanges("address", e.target.value)}/>
                        <p>Portfolio</p>
                        <input value={userDetails?.portfolio} type="text" placeholder="Portfolio" onChange={(e) => handleChanges("portfolio", e.target.value)}/>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" onClick={() => updateUserDetails(close)}>Save</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
};

const AddWork = ({user}) => {
    const [ work, setWork ] = useState({
        title: '',
        description: '',
        link: ''
    })

    const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

    let userWorks = user.works;

    const {updateUser} = useUpdateUser();

    const handleWorkChange = (field, value) => {
        setWork({...work, [field]: value });
        if(field == "title" && value != "") {
            if(work.description.trim().length > 0) {
                setIsButtonDisabled(false);
            }
            else {
                setIsButtonDisabled(true);
            }
        }
        else if(field == "description" && value != "") {
            if(work.title.trim().length > 0) {
                setIsButtonDisabled(false);
            }
            else {
                setIsButtonDisabled(true);
            }
        }
        else if(field != "link" && value == "") {
            setIsButtonDisabled(true);
        }
    }

    const addWork = async (close) => {
        userWorks.push(work);
        await updateUser("works", userWorks);
        setWork({title: "", description: "", link: ""});
        close();
    }

    return (
        <Popup trigger={<button className="secondary-button" style={{border: "none"}}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Work</button>}
            modal
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            {(close) => (
                <div>
                    <h3 className="header">Add Work</h3>
                    <div className="add-work popup-form">
                        <p>Title</p>
                        <input type="text" value={work.title} placeholder="e.g. My AI Chatbot Project" onChange={(e) => handleWorkChange("title", e.target.value)}/>
                        <p>Description (One Short Line)</p>
                        <input type="text" value={work.description} placeholder="e.g. Built an AI-powered chatbot using GPT-4" onChange={(e) => handleWorkChange("description", e.target.value)}/>
                        <p>Link (If any)</p>
                        <input type="text" value={work.link} placeholder="e.g. https://github.com/myproject" onChange={(e) => handleWorkChange("link", e.target.value)}/>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" onClick={() => addWork(close)} disabled={isButtonDisabled}>Add</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}


const AddSkill = ({user}) => {
    let userSkills = user.skills;
    const [ skill, setSkill ] = useState({
        name: '',
        experience: ''
    })
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

    const {updateUser} = useUpdateUser();

    const handleSkillChange = (field, value) => {
        setSkill({...skill, [field]: value });
        if(field == "name" && value != "") {
            if(skill.experience.trim().length > 0) {
                setIsButtonDisabled(false);
            }
            else {
                setIsButtonDisabled(true);
            }
        }
        else if(field == "experience" && value != "") {
            if(skill.name.trim().length > 0) {
                setIsButtonDisabled(false);
            }
            else {
                setIsButtonDisabled(true);
            }
        }
        else {
            setIsButtonDisabled(true);
        }
    }

    const addSkill = async (close) => {
        userSkills.push(skill);
        await updateUser("skills", userSkills);
        setSkill({name: "", experience: ""});
        close();
    }

    return (
        <Popup trigger={<button className="secondary-button" style={{border: "none"}}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Skill</button>}
            modal
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            {(close) => (
                <div>
                    <h3 className="header">Add Skill</h3>
                    <div className="add-work popup-form">
                        <p>Skill Name</p>
                        <input type="text" value={skill.name} placeholder="e.g. Python" onChange={(e) => handleSkillChange("name", e.target.value)}/>
                        <p>Experience</p>
                        <input type="text" value={skill.experience} placeholder="e.g. 3+ Years" onChange={(e) => handleSkillChange("experience", e.target.value)}/>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" onClick={() => addSkill(close)} disabled={isButtonDisabled}>Add</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

const AddSocialLink = ({user}) => {
    const {updateUser} = useUpdateUser();
    let userSocialLinks = user.socialLinks;
    const [ socialLink, setSocialLink ] = useState({platform: "", link: ""});
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(socialLink.platform.trim().length == 0 && socialLink.link.trim().length == 0)
    const dropdownPlatfroms = ["Facebook", "Instagram", "Linkedin", "Github", "Discord", "Youtube", "Twitter"];

    const handleLink = (value) => {
        setSocialLink({...socialLink, link: value});
        if(value.trim().length > 0 && socialLink.platform.trim().length > 0) {
            setIsButtonDisabled(false);
        }
        else {
            setIsButtonDisabled(true);
        }
    }

    const handleChange = (value) => {
        setSocialLink({...socialLink, platform: value});
        if(value.trim().length > 0 && socialLink.link.trim().length > 0) {
            setIsButtonDisabled(false);
        }
        else {
            setIsButtonDisabled(true);
        }
    }
    const filteredDropdownPlatforms = dropdownPlatfroms.filter((platform) => {
        if (userSocialLinks[platform.toLowerCase()] == undefined) {
            return platform
        }
    })

    const addSocialLink = async (close) => {
        userSocialLinks = {...userSocialLinks, [socialLink.platform.toLowerCase()]: socialLink.link}

        await updateUser("socialLinks", userSocialLinks);
        setSocialLink({platform: "", link: ""});
        close();
    }

    return (
        <Popup trigger={<button className="secondary-button" style={{border: "none"}}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Link</button>}
            modal
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            {(close) => (
                <div>
                    <h3 className="header">Add Social Link</h3>
                    <div className="add-work popup-form">
                        <p>PlatForm</p>
                        <Dropdown listStyle={{maxHeight: "150px"}} placeholder={ "e.g. LinkedIn" } suggestions={ filteredDropdownPlatforms } onChange={handleChange} clearButton={false}/>
                        <p>Link</p>
                        <input type="text" value={socialLink.link} placeholder="e.g. https://www.linkedin.com/in/" onChange={(e) => handleLink(e.target.value)}/>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" onClick={() => addSocialLink(close)} disabled={isButtonDisabled}>Add</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
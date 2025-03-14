import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import IdeaPreview from "./IdeaPreview";
import { useNavigate } from "react-router-dom";
import { useLoadingBar } from '../Hooks/useLoadingBar';
// import axios from "axios";
// import api from "../Helpers/api";
import authUserRequest from "../Helpers/authRequestHandler";
import Popup from "reactjs-popup";
import Dropdown from "./Dropdown";
import toast from "react-hot-toast";

const PageThree = ({ changePages }) => {
    const navigate = useNavigate();
    const loadingBarRef = useLoadingBar();
    const sessionIdea = JSON.parse(sessionStorage.getItem("sessionIdea")) || null;
    // const { updatedDate, updatedTime } = ideaDetails;

    // useEffect(() => {
    //     if (!sessionIdea) {
    //         navigate(-1);
    //     }
    // }, [sessionIdea, navigate]);

    const postIdea = async(ideaStatus) => {
        loadingBarRef.current.continuousStart();
        const toastId = toast.loading("Posting Your Idea...");
        await authUserRequest.patch(`http://localhost:3000/idea/${sessionIdea._id}?requestType='postIdea'`,
            {"status": ideaStatus}
        )
        .then((response) => {
            // console.log(response.data);
            loadingBarRef.current.complete();
            toast.success("Idea Posted Successfully!", {id: toastId});
            sessionStorage.removeItem("sessionIdea")
            navigate(`/idea/${response.data._id}`, {replace: true});
        })
        .catch((error) => {
            console.error(error);
            loadingBarRef.current.complete();
            toast.error("Failed to Post Idea!", {id: toastId});
        });
    }

    const editIdea = () => {
        // navigate('/ideaeditor/p/1', {replace: true})
        loadingBarRef.current.continuousStart();
        changePages(1);
        setTimeout(() =>{
            loadingBarRef.current.complete();
        }, 500)
    }

    return (
        <div className="page-three">
            <ScrollToTop />
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Review and Share
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Look over your idea, make any changes, and submit to inspire others.
                </p>
                <IdeaPreview ideaDetails={sessionIdea} previewType={"author"} isIdeaLiked={null} setIdeaDetails={null} />
            </div>

            <div className="idea-buttons">
                {/* <button className="post-button primary-button" onClick={postIdea}><FontAwesomeIcon icon="fa-solid fa-paper-plane" style={{marginRight: "10px"}}/>  Post Idea</button> */}
                <PostPreview postIdea={postIdea}/>
                <button className="save-as-draft-button primary-button"><FontAwesomeIcon icon="fa-solid fa-floppy-disk" style={{marginRight: "10px"}}/>  Save Draft</button>
                <button className="edit-button primary-button" onClick={editIdea}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{marginRight: "10px"}}/>  Edit Details</button>
                <button className="delete-button primary-button"><FontAwesomeIcon icon="fa-solid fa-trash" style={{marginRight: "10px"}}/>  Delete</button>
            </div>
        </div>
    )
}

export default PageThree;

const PostPreview = ({postIdea}) => {

    const [ selectedIdeaStatus, setSelectedIdeaStatus ] = useState("Completed");
    const [bgColor, setBgColor] = useState("#4CAF50");
    const handleChange = (value) => {
        setSelectedIdeaStatus(value);
        switch (value) {
            case "Completed":
                setBgColor("#4CAF50");
                break;
            case "In Progress":
                setBgColor("#008080");
                break;
            case "Open for Collaboration":
                setBgColor("#2196F3");
                break;
            default:
                break;
        }
    }

    const handleIdeaPost = () => {
        postIdea(selectedIdeaStatus);
    }

    return (
        <Popup trigger={<button className="post-button primary-button" ><FontAwesomeIcon icon="fa-solid fa-paper-plane" style={{marginRight: "10px"}}/>  Post Idea</button>} 
            modal
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out" }}
        >
            {(close) => (
                <div>
                    <h3 className="header">Select Idea Status</h3>
                    <div className="select-idea-status popup-form">
                        {/* <p>PlatForm</p> */}
                        {/* <Dropdown listStyle={{maxHeight: "150px"}} placeholder={ "e.g. Completed" } suggestions={ ["Open for Collaboration", "Completed"] } onChange={handleChange} clearButton={false}/> */}
                        <div className="idea-status-options">
                            <div className={"option " + (selectedIdeaStatus == "Completed" ? "active" : "")} style={{border: "2px solid #4CAF50", background: selectedIdeaStatus == "Completed" ? bgColor : ""}} onClick={() => handleChange("Completed")}>
                                <FontAwesomeIcon icon="fa-solid fa-flag-checkered" />
                                <h4>Completed</h4>
                                <p>This idea has been fully developed and executed. No further changes or collaborations are needed.</p>
                            </div>
                            <div className={"option " + (selectedIdeaStatus == "In Progress" ? "active" : "")} style={{border: "2px solid #008080 ", background: selectedIdeaStatus == "In Progress" ? bgColor : ""}} onClick={() => handleChange("In Progress")}>
                                <FontAwesomeIcon icon="fa-solid fa-hourglass-half" />
                                <h4>In Progress</h4>
                                <p>Currently working on this idea. Updates and progress will be shared as it develops.</p>
                            </div>
                            <div className={"option " + (selectedIdeaStatus == "Open for Collaboration" ? "active" : "")} style={{border: "2px solid #2196F3", background: selectedIdeaStatus == "Open for Collaboration" ? bgColor : ""}} onClick={() => handleChange("Open for Collaboration")}>
                                <FontAwesomeIcon icon="fa-solid fa-handshake-simple" />
                                <h4>Open for Collaboration</h4>
                                <p>Looking for teammates, feedback, or contributors to help develop this idea.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" onClick={() => handleIdeaPost()} >Post</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
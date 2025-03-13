import React, { useEffect } from "react";
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

    const postIdea = async() => {
        loadingBarRef.current.continuousStart();
        await authUserRequest.patch(`http://localhost:3000/idea/${sessionIdea._id}?requestType='postIdea'`,
            {"status": "Completed"}
        )
        .then((response) => {
            // console.log(response.data);
            loadingBarRef.current.complete();
            sessionStorage.getItem("sessionIdea")
            navigate('/', {replace: true});
        })
        .catch((error) => console.log(error));
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
                <PostPreview />
                <button className="save-as-draft-button primary-button"><FontAwesomeIcon icon="fa-solid fa-floppy-disk" style={{marginRight: "10px"}}/>  Save Draft</button>
                <button className="edit-button primary-button" onClick={editIdea}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{marginRight: "10px"}}/>  Edit Details</button>
                <button className="delete-button primary-button"><FontAwesomeIcon icon="fa-solid fa-trash" style={{marginRight: "10px"}}/>  Delete</button>
            </div>
        </div>
    )
}

export default PageThree;

const PostPreview = () => {
    const handleChange = (value) => {
        console.log(value);
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
                            <div className="option" style={{backgroundColor: "#4CAF50"}}>
                                <FontAwesomeIcon icon="fa-solid fa-flag-checkered" />
                                <h3>Completed</h3>
                                <p>This idea has been fully developed and executed. No further changes or collaborations are needed.</p>
                            </div>
                            <div className="option" style={{backgroundColor: "#FF9800"}}>
                                <FontAwesomeIcon icon="fa-solid fa-hourglass-half" />
                                <h3>In Progress</h3>
                                <p>Currently working on this idea. Updates and progress will be shared as it develops.</p>
                            </div>
                            <div className="option" style={{backgroundColor: "#2196F3"}}>
                                <FontAwesomeIcon icon="fa-solid fa-handshake-simple" />
                                <h3>Open For Collaboration</h3>
                                <p>Looking for teammates, feedback, or contributors to help develop this idea.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-buttons">
                        <button className="primary-button" >Post</button>
                        <button className="secondary-button" style={{border: "none"}} onClick={close}>Close</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
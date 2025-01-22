import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import IdeaPreview from "./IdeaPreview";
// import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useLoadingBar } from '../Contexts/LoadingBarContext';
import axios from "axios";

const PageThree = ({ ideaDetails, setIdeaDetails }) => {
    const navigate = useNavigate();
    const loadingBarRef = useLoadingBar();
    const ideaId = localStorage.getItem("ideaId");
    const { updatedDate, updatedTime } = ideaDetails;

    useEffect(() => {
        if (!ideaId) {
            navigate(-1);
        }
    }, [ideaId, navigate]);

    const postIdea = async() => {
        loadingBarRef.current.continuousStart();
        await axios.patch(`http://localhost:3000/idea/${ideaId}`,
            {"status": "Completed", "updatedDate": updatedDate, "updatedTime": updatedTime}
        )
        .then((response) => {
            // navigate('/ideaeditor/p/3');
            loadingBarRef.current.complete();
        })
        .catch((error) => console.log(error));
    }

    const editIdea = () => {
        navigate('/ideaeditor/p/1', {replace: true})
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
                <IdeaPreview ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails}/>
            </div>

            <div className="idea-buttons">
                <button className="post-button primary-button" onClick={postIdea}><FontAwesomeIcon icon="fa-solid fa-paper-plane" style={{marginRight: "10px"}}/>  Post Idea</button>
                <button className="save-as-draft-button primary-button"><FontAwesomeIcon icon="fa-solid fa-floppy-disk" style={{marginRight: "10px"}}/>  Save Draft</button>
                <button className="edit-button primary-button" onClick={editIdea}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{marginRight: "10px"}}/>  Edit Details</button>
                <button className="delete-button primary-button"><FontAwesomeIcon icon="fa-solid fa-trash" style={{marginRight: "10px"}}/>  Delete</button>
            </div>
        </div>
    )
}

export default PageThree;
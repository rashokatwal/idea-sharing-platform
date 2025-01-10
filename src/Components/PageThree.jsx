import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "./ScrollToTop";
import IdeaPreview from "./IdeaPreview";
import { Link, useLocation } from "react-router-dom";

const PageThree = ({ ideaDetails, setIdeaDetails }) => {

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
                <button className="post-button primary-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "10px"}}/>  Post Idea</button>
                <button className="save-as-draft-button primary-button"><FontAwesomeIcon icon={faFloppyDisk} style={{marginRight: "10px"}}/>  Save Draft</button>
                <Link to="/ideaeditor/p/1" className="edit-button primary-button"><FontAwesomeIcon icon={faPenToSquare} style={{marginRight: "10px"}}/>  Edit Details</Link>
                <button className="delete-button primary-button"><FontAwesomeIcon icon={faTrash} style={{marginRight: "10px"}}/>  Delete</button>
            </div>
        </div>
    )
}

export default PageThree;
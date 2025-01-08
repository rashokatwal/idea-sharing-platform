import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "./ScrollToTop";

const PageThree = ({ ideaDetails, setIdeasDetails, prevPage }) => {

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
            </div>

            <div className="idea-buttons">
                <button type="submit" className="post-button primary-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "10px"}}/>  Post Idea</button>
                <button type="submit" className="save-as-draft-button primary-button"><FontAwesomeIcon icon={faFloppyDisk} style={{marginRight: "10px"}}/>  Save Draft</button>
            </div>
        </div>
    )
}

export default PageThree;
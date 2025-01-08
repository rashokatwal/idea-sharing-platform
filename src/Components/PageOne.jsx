import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "./ScrollToTop";

const PageOne = ({ ideaDetails, setIdeasDetails, nextPage }) => {
    const handletitle = (value) => {
        setIdeasDetails({...ideaDetails, title: value });
    };

    const handlecategory = (value) => {
        setIdeasDetails({...ideaDetails, category: value });
    };

    const handleDescription = (value) => {
        setIdeasDetails({...ideaDetails, description: value });
    };

    return (
        <div className="page-one">
            <ScrollToTop />
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Define Your Idea
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Give your idea a name, choose a category, and craft a concise description to set the stage.
                </p>
            </div>

            <p>Title</p>
            <input type="text" className="idea-title" value={ideaDetails.title} placeholder="Give your idea a captivating title" onChange={(e) => handletitle(e.target.value)}/>
            <p>Category</p>
            <Autocomplete suggestions={ categories } placeholder={"Select a category"} className="idea-category" value={ideaDetails.category} onChange={handlecategory}/>
            <p>Description</p>
            <textarea className="idea-description" placeholder="Summarize your idea in a few sentences..." value={ideaDetails.description} onChange={(e) => handleDescription(e.target.value)}/>
            {/* <span>(Max 50 words)</span> */}
            <div className="next-prev-buttons">
                <button className="primary-button" onClick={() => nextPage(2)}>Continue <FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    )
}

export default PageOne;